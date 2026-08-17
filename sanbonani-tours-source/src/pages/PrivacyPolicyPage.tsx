import LegalPage, { LegalSection } from '../components/LegalPage'
import { usePageMeta, JsonLd, SITE_URL } from '../lib/seo'

export default function PrivacyPolicyPage() {
  usePageMeta({
    title: 'Privacy Policy | Sanbonani Tours',
    description:
      'How Sanbonani Tours collects, uses and protects your personal information, in line with the Protection of Personal Information Act (POPIA).',
    path: '/privacy-policy',
  })

  return (
    <LegalPage label="Legal" title="Privacy Policy" updated="17 August 2026">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: `${SITE_URL}/privacy-policy` },
          ],
        }}
      />

      <LegalSection heading="1. Who we are">
        <p>
          Sanbonani Tours is a tour operator based at 73 Oceanview, Tinley Manor,
          KwaZulu-Natal, South Africa. You can reach us at
          info@sanbonanitours.co.za or +27 68 816 3622.
        </p>
        <p>
          This policy explains how we handle personal information in accordance with
          the Protection of Personal Information Act, 2013 (POPIA).
        </p>
      </LegalSection>

      <LegalSection heading="2. What we collect">
        <p>When you send us an enquiry through this website, we collect:</p>
        <p>— Your name</p>
        <p>— Your email address</p>
        <p>— The contents of your message (travel dates, party size and anything else you choose to tell us)</p>
        <p>
          If you book with us, we may additionally need your phone number and, where
          required by a reserve or attraction, the names and ages of travellers.
        </p>
      </LegalSection>

      <LegalSection heading="3. Why we collect it">
        <p>We use your information only to:</p>
        <p>— Respond to your enquiry and prepare a quote or itinerary</p>
        <p>— Make and manage bookings on your behalf</p>
        <p>— Meet legal or venue requirements (for example, gate registrations at game reserves)</p>
        <p>We do not use your details for marketing unless you explicitly ask us to keep in touch.</p>
      </LegalSection>

      <LegalSection heading="4. Who we share it with">
        <p>
          We never sell your information. We share it only where necessary to deliver
          your booking — for example with game reserves, attractions or accommodation
          providers — and with the service that delivers our website enquiry emails
          (EmailJS), which processes your message on our behalf.
        </p>
      </LegalSection>

      <LegalSection heading="5. How long we keep it">
        <p>
          Enquiry details are kept for up to 24 months so we can reference earlier
          conversations when you return. Booking records are retained as required by
          South African tax and company law. You may ask us to delete your
          information at any time (see below).
        </p>
      </LegalSection>

      <LegalSection heading="6. How we protect it">
        <p>
          Access to personal information is limited to the people handling your
          booking. Our website uses HTTPS, and our email processing provider applies
          its own industry-standard safeguards.
        </p>
      </LegalSection>

      <LegalSection heading="7. Your rights under POPIA">
        <p>You have the right to:</p>
        <p>— Ask what personal information we hold about you</p>
        <p>— Request correction or deletion of your information</p>
        <p>— Object to us processing your information</p>
        <p>
          To exercise any of these rights, email info@sanbonanitours.co.za. If you
          believe we have mishandled your information, you may also lodge a complaint
          with the Information Regulator (South Africa) at
          complaints.IR@inforegulator.org.za.
        </p>
      </LegalSection>

      <LegalSection heading="8. Cookies">
        <p>
          This website does not use tracking cookies or analytics cookies. No
          advertising or profiling cookies are set.
        </p>
      </LegalSection>

      <LegalSection heading="9. Changes to this policy">
        <p>
          If we change this policy, the updated version will be posted on this page
          with a new &ldquo;last updated&rdquo; date.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
