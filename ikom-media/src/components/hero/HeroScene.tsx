import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type Props = {
  /** Simplified scene for small screens: fewer objects, no transmission, lower DPR */
  lite: boolean;
  /** Pause rendering (e.g. when hero is off-screen) */
  paused: boolean;
  onReady: () => void;
};

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Generated studio environment for realistic metal/glass reflections — no HDR download. */
function StudioEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

function FloatingShape({
  children,
  position,
  speed = 1,
  amplitude = 0.12,
  spin = 0.2,
  offset = 0,
}: {
  children: ReactNode;
  position: [number, number, number];
  speed?: number;
  amplitude?: number;
  spin?: number;
  offset?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }, delta) => {
    const g = ref.current;
    if (!g) return;
    const t = clock.elapsedTime * speed + offset;
    g.position.y = position[1] + Math.sin(t) * amplitude;
    g.rotation.x += delta * spin * 0.6;
    g.rotation.y += delta * spin;
  });
  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
}

function Sculpture({ lite }: { lite: boolean }) {
  const root = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const start = useRef<number | null>(null);
  const { viewport } = useThree();

  const coreGeo = useMemo(() => new THREE.IcosahedronGeometry(1.15, 0), []);
  const innerGeo = useMemo(() => new THREE.IcosahedronGeometry(0.62, 1), []);

  useFrame((state, delta) => {
    const g = root.current;
    if (!g) return;
    // Entrance: scale + settle over ~1.6s
    if (start.current === null) start.current = state.clock.elapsedTime;
    const p = Math.min((state.clock.elapsedTime - start.current) / 1.6, 1);
    const s = 0.6 + 0.4 * easeOut(p);
    g.scale.setScalar(s * (lite ? 0.85 : 1));

    // Subtle pointer parallax (state.pointer is -1..1)
    const tx = state.pointer.y * 0.18;
    const ty = state.pointer.x * 0.28;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, tx, 3, delta);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, ty, 3, delta);

    if (core.current) {
      core.current.rotation.y += delta * 0.18;
      core.current.rotation.x += delta * 0.07;
    }
    if (ring.current) ring.current.rotation.z += delta * 0.12;
    if (ring2.current) ring2.current.rotation.z -= delta * 0.08;
  });

  // Keep the sculpture comfortably inside narrow viewports
  const fit = Math.min(1, viewport.width / 5.2);

  return (
    <group ref={root} scale={0.6}>
      <group scale={fit} position={[lite ? 0 : 0.35, 0, 0]}>
        {/* Faceted metallic core */}
        <mesh ref={core} geometry={coreGeo}>
          <meshPhysicalMaterial
            color="#343BFF"
            metalness={0.75}
            roughness={0.22}
            clearcoat={1}
            clearcoatRoughness={0.12}
            flatShading
            envMapIntensity={1.1}
          />
        </mesh>
        {/* Glowing inner form visible through the facets' edges */}
        <mesh geometry={innerGeo} scale={1.25}>
          <meshBasicMaterial color="#5D72FF" wireframe transparent opacity={0.28} />
        </mesh>

        {/* Brushed-metal orbit rings */}
        <mesh ref={ring} rotation={[Math.PI / 2.4, 0.2, 0]}>
          <torusGeometry args={[2.05, 0.028, 16, 160]} />
          <meshStandardMaterial color="#d7dcf0" metalness={1} roughness={0.25} />
        </mesh>
        {!lite && (
          <mesh ref={ring2} rotation={[Math.PI / 1.75, -0.3, 0.3]}>
            <torusGeometry args={[2.2, 0.012, 12, 160]} />
            <meshStandardMaterial color="#5D72FF" metalness={0.9} roughness={0.3} emissive="#343BFF" emissiveIntensity={0.4} />
          </mesh>
        )}

        {/* Glass-like satellites */}
        <FloatingShape position={[1.95, 1.05, 0.4]} speed={0.8} spin={0.35} offset={1}>
          <mesh>
            <octahedronGeometry args={[0.32, 0]} />
            {lite ? (
              <meshPhysicalMaterial color="#c9d1ff" metalness={0.1} roughness={0.05} transparent opacity={0.55} clearcoat={1} />
            ) : (
              <meshPhysicalMaterial color="#ffffff" transmission={1} thickness={0.6} roughness={0.08} ior={1.45} clearcoat={1} attenuationColor="#5D72FF" attenuationDistance={1.2} />
            )}
          </mesh>
        </FloatingShape>
        <FloatingShape position={[-2.05, -0.85, 0.2]} speed={0.65} spin={0.25} offset={2.4}>
          <mesh>
            <sphereGeometry args={[0.26, 48, 48]} />
            <meshPhysicalMaterial color="#e6e9f5" metalness={1} roughness={0.12} />
          </mesh>
        </FloatingShape>
        {!lite && (
          <>
            <FloatingShape position={[-1.55, 1.35, -0.6]} speed={0.9} spin={0.4} offset={4}>
              <mesh>
                <boxGeometry args={[0.36, 0.36, 0.36]} />
                <meshPhysicalMaterial color="#ffffff" transmission={1} thickness={0.5} roughness={0.12} ior={1.4} clearcoat={1} attenuationColor="#343BFF" attenuationDistance={0.9} />
              </mesh>
            </FloatingShape>
            <FloatingShape position={[1.5, -1.35, 0.7]} speed={0.75} spin={0.3} offset={5.5}>
              <mesh>
                <torusGeometry args={[0.2, 0.075, 24, 64]} />
                <meshStandardMaterial color="#5D72FF" metalness={0.85} roughness={0.2} />
              </mesh>
            </FloatingShape>
          </>
        )}
      </group>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.15} />
      {/* Key */}
      <directionalLight position={[3, 4, 5]} intensity={1.2} color="#ffffff" />
      {/* Blue rim lights from behind */}
      <directionalLight position={[-4, 2, -4]} intensity={3} color="#343BFF" />
      <directionalLight position={[4, -1, -3]} intensity={2} color="#5D72FF" />
      <pointLight position={[0, -2.5, 2]} intensity={6} distance={8} color="#5D72FF" />
    </>
  );
}

function FirstFrame({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (!done.current) {
      done.current = true;
      // Wait one more frame so the fallback crossfades onto a painted canvas
      requestAnimationFrame(onReady);
    }
  });
  return null;
}

export default function HeroScene({ lite, paused, onReady }: Props) {
  return (
    <Canvas
      frameloop={paused ? "never" : "always"}
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 38 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <StudioEnvironment />
      <Lights />
      <Sculpture lite={lite} />
      <FirstFrame onReady={onReady} />
    </Canvas>
  );
}
