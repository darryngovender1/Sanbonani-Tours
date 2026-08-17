import LegalPage, { LegalSection } from '../components/LegalPage'
import { usePageMeta, JsonLd, SITE_URL } from '../lib/seo'

export default function TermsPage() {
  usePageMeta({
    title: 'Terms & Conditions | Sanbonani Tours',
    description:
      'Booking, payment, cancellation and liability terms for tours and transport services provided by Sanbonani Tours, Tinley Manor, KwaZulu-Natal.',
    path: '/terms',
  })

  return (
    <LegalPage label="Legal" title="Terms & Conditions" updated="17 August 2026">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Terms & Conditions', item: `${SITE_URL}/terms` },
          ],
        }}
      />

      <LegalSection heading="1. About these terms">
        <p>
          These terms apply to all tours, excursions and transport services provided
          by Sanbonani Tours (&ldquo;we&rdquo;, &ldquo;us&rdquo;), based at 73
          Oceanview, Tinley Manor, KwaZulu-Natal. By confirming a booking you accept
          these terms on behalf of everyone in your party.
        </p>
      </LegalSection>

      <LegalSection heading="2. Bookings and payment">
        <p>
          A booking is confirmed once we have received your deposit and sent you a
          written confirmation. The balance is payable before the date of the tour,
          by the deadline stated on your quote. Prices are quoted in South African
          Rand and include what is listed in your itinerary; anything not listed is
          excluded.
        </p>
      </LegalSection>

      <LegalSection heading="3. Cancellations by you">
        <p>— More than 14 days before the tour: full refund of the deposit.</p>
        <p>— Between 7 and 14 days before the tour: 50% of the deposit is refunded.</p>
        <p>— Within 7 days of the tour: the deposit is non-refundable.</p>
        <p>
          Where possible we will offer to reschedule instead of cancelling — ask us
          first. Refunds are processed to the original payment method within 10
          business days.
        </p>
      </LegalSection>

      <LegalSection heading="4. Cancellations and changes by us">
        <p>
          If we must cancel a tour (for example due to severe weather, unsafe
          conditions or circumstances beyond our control), you may choose a full
          refund or an alternative date. We may adjust itineraries where conditions
          require it — for example reserve gate times or road closures — and will
          always aim to preserve the substance of the experience.
        </p>
      </LegalSection>

      <LegalSection heading="5. Third-party attractions and reserves">
        <p>
          Many excursions include venues operated independently of us (game
          reserves, restaurants, casinos, activity providers). Their own rules,
          indemnities and entry conditions apply, and their fees — where not
          included in your quote — are payable by you. We are not responsible for
          closures, changes or service levels at third-party venues, but will
          always help you find an alternative.
        </p>
      </LegalSection>

      <LegalSection heading="6. Wildlife and activities disclaimer">
        <p>
          Game viewing takes place in wild, unfenced environments. Wildlife
          sightings cannot be guaranteed, and all activities are undertaken at your
          own risk. You must follow the guide&apos;s safety instructions at all
          times, remain in the vehicle where instructed, and supervise children in
          your party.
        </p>
      </LegalSection>

      <LegalSection heading="7. Travel insurance and medical">
        <p>
          We strongly recommend comprehensive travel insurance, including medical
          cover. Some northern KZN reserves are low-risk malaria areas — please
          consult your doctor or a travel clinic before travelling, particularly for
          young children, pregnant travellers and guests with medical conditions.
        </p>
      </LegalSection>

      <LegalSection heading="8. Liability">
        <p>
          To the extent permitted by South African law, we are not liable for loss,
          damage, injury or delay arising from events beyond our reasonable control,
          from third-party operators, or from failure to follow safety
          instructions. Nothing in these terms excludes liability that cannot be
          excluded by law.
        </p>
      </LegalSection>

      <LegalSection heading="9. Conduct">
        <p>
          We reserve the right to refuse service or end a tour early, without
          refund, where a guest&apos;s behaviour is unsafe, unlawful or abusive
          toward our staff, other guests, wildlife or communities.
        </p>
      </LegalSection>

      <LegalSection heading="10. Governing law">
        <p>
          These terms are governed by the laws of the Republic of South Africa. Any
          disputes fall under the jurisdiction of the South African courts.
        </p>
      </LegalSection>

      <LegalSection heading="11. Questions">
        <p>
          Anything unclear? Contact us at info@sanbonanitours.co.za or
          +27 68 816 3622 before booking — we are happy to walk you through it.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
