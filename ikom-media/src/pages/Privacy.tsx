import { Link } from "react-router";
import { PageHero } from "../components/PageHero";
import { CONTACT, CONTACT_ENDPOINT, GA_ID } from "../data/site";
import { getRouteMeta } from "../data/routes";

/**
 * Describes what THIS website actually does. Update it whenever data handling changes
 * (new form provider, analytics, CRM, etc.). Have it reviewed by a qualified professional before launch.
 */
const LAST_UPDATED = "October 2026";

export default function Privacy() {
  return (
    <>
      <PageHero title="Privacy Policy" intro={`Last updated: ${LAST_UPDATED}`} crumbs={getRouteMeta("/privacy-policy").crumbs} />
      <section className="pb-24">
        <div className="container-site">
          <div className="prose-ikom max-w-3xl text-[1.0625rem] leading-relaxed">
            <p>
              This policy explains what information IKom Media ("we", "us") collects through this website, how we use it
              and the choices you have. If you have questions, email us at{" "}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
            </p>

            <h2>Information you give us</h2>
            <p>When you use our contact form, we ask for:</p>
            <ul>
              <li>your full name, email address and phone number;</li>
              <li>optionally, your business name and estimated budget;</li>
              <li>the service you're interested in, your project description and your preferred contact method.</li>
            </ul>
            {CONTACT_ENDPOINT ? (
              <p>
                When you submit the form, these details are sent securely to our server and delivered to our team by
                email so we can respond to you.
              </p>
            ) : (
              <p>
                The form does not store your details on this website. When you choose "Send via WhatsApp" or "Send via
                email", your details are placed into a pre-filled message in WhatsApp or your email app, and are only
                sent to us if you choose to send that message. WhatsApp and your email provider handle that message
                under their own privacy policies.
              </p>
            )}
            <p>
              If you call, message or email us directly, we receive the information you choose to share in that
              conversation.
            </p>

            <h2>How we use your information</h2>
            <ul>
              <li>to respond to your enquiry and arrange a consultation;</li>
              <li>to prepare proposals or quotes you've asked for;</li>
              <li>to deliver services if you become a client.</li>
            </ul>
            <p>
              We do not sell your personal information, and we do not use your enquiry details for unrelated marketing
              without your permission.
            </p>

            <h2>Analytics and cookies</h2>
            {GA_ID ? (
              <p>
                With your consent, we use Google Analytics to understand how visitors use this website, such as which
                pages are viewed and which buttons are clicked. Analytics only loads after you choose "Accept analytics"
                in the cookie notice, and IP anonymisation is requested. We do not send your name, email, phone number
                or message to Google Analytics. You can change your choice by clearing this site's data in your browser.
              </p>
            ) : (
              <p>This website does not currently use analytics or advertising cookies.</p>
            )}
            <p>
              We store a small number of preferences in your browser's local storage, such as whether you've chosen to
              reduce animations and your cookie choice. These stay on your device and are not used to identify you.
            </p>

            <h2>Third-party links and services</h2>
            <p>
              This site links to WhatsApp and lets you open your own email app. When you use these, the relevant
              provider's privacy policy applies.
            </p>

            <h2>How long we keep information</h2>
            <p>
              We keep enquiry information only for as long as needed to respond to you and for reasonable record-keeping.
              If you become a client, we keep information needed to deliver our services and meet our legal obligations.
            </p>

            <h2>Your choices</h2>
            <p>
              You can ask us to access, correct or delete the personal information we hold about you by emailing{" "}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. We'll respond within a reasonable time.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this policy when our website or practices change. The date at the top shows when it was last
              updated.
            </p>

            <h2>Contact</h2>
            <p>
              IKom Media
              <br />
              Email: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              <br />
              Phone: {CONTACT.phones.map((p, i) => (
                <span key={p.raw}>
                  {i > 0 && " / "}
                  <a href={`tel:${p.raw}`}>{p.label}</a>
                </span>
              ))}
            </p>
            <p>
              <Link to="/contact">Go to the contact page</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
