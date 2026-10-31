import { LegalPage } from '@/pages/LegalPage';

export function TermsPage() {
  return (
    <LegalPage
      title="Terms & conditions"
      documentTitle="Terms & Conditions | Hassan Khan — AI Education"
      draftNote="Draft terms for review — replace with a reviewed version before publishing. These terms reflect the site exactly as it operates today, including the demo storefront."
    >
      <h2 className="text-lg font-semibold text-bone">Educational content</h2>
      <p>
        This site provides general education about artificial intelligence tools and workflows.
        Content is for learning purposes and is not legal, financial, or professional advice.
        Outcomes depend on your own effort and circumstances — no specific results are promised or
        implied.
      </p>

      <h2 className="text-lg font-semibold text-bone">Workshops and registrations</h2>
      <p>
        Workshop dates, times, formats, and venues shown on this site are not confirmed until stated
        otherwise; they appear as “To be announced” while being finalised. Registering expresses
        your interest — a place is confirmed only when the session details are shared with you.
        Launch workshops are free to register for unless clearly stated otherwise at the time of
        confirmation.
      </p>

      <h2 className="text-lg font-semibold text-bone">Digital products (demo storefront)</h2>
      <p>
        All products currently shown are <strong className="text-bone">examples</strong>{' '}
        demonstrating the storefront interface. They are not offers for sale, prices are labelled as
        example prices, and no payment is taken through this site. Real products, real prices, and
        checkout terms will be published here before anything is offered for sale.
      </p>

      <h2 className="text-lg font-semibold text-bone">Intellectual property</h2>
      <p>
        Site content, text, and original design belong to {`Hassan Khan`}. Course materials and
        products, when published, may be used for your own purposes as stated on each product —
        redistribution or resale requires written permission.
      </p>

      <h2 className="text-lg font-semibold text-bone">External links</h2>
      <p>
        Links to external services (video hosts, payment providers, professional profiles) are
        provided for convenience when configured. Their content and policies are outside this site's
        control.
      </p>

      <h2 className="text-lg font-semibold text-bone">Liability</h2>
      <p>
        The site and its content are provided “as is”, without warranties of any kind. To the extent
        permitted by law, the founder is not liable for losses arising from use of the site or its
        educational content.
      </p>

      <h2 className="text-lg font-semibold text-bone">Contact</h2>
      <p>
        Questions about these terms can be sent through the registration form on the home page until
        direct contact details are published.
      </p>
    </LegalPage>
  );
}
