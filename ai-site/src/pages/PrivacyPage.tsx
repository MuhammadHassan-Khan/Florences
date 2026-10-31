import { LegalPage } from '@/pages/LegalPage';

export function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      documentTitle="Privacy Policy | Hassan Khan — AI Education"
      draftNote="Draft policy for review — replace with a reviewed version before publishing. It describes the site exactly as it is built today: no analytics, no cookies, and no data stored unless a form endpoint is configured."
    >
      <h2 className="text-lg font-semibold text-bone">What this site collects</h2>
      <p>
        The workshop registration form asks for your full name, email address, WhatsApp number,
        current role, AI experience level, area of interest, an optional message, and your consent
        to receive workshop updates.
      </p>
      <p>
        When a form endpoint is configured, submitting the form sends those details to that endpoint
        so registrations can be managed. Until then, the form validates your input and explicitly
        tells you that <strong className="text-bone">nothing was sent</strong> — no details leave
        your browser.
      </p>

      <h2 className="text-lg font-semibold text-bone">What this site does not collect</h2>
      <p>
        There are no analytics tools, advertising pixels, session recorders, or tracking cookies on
        this site. Nothing is sold, shared, or used for advertising.
      </p>

      <h2 className="text-lg font-semibold text-bone">Cart storage</h2>
      <p>
        The shopping cart is stored in your own browser (localStorage) so it survives a page reload.
        It never leaves your device, and “Clear cart” removes it.
      </p>

      <h2 className="text-lg font-semibold text-bone">How your details are used</h2>
      <p>
        Registration details are used only to communicate about workshops and training you asked
        about, and to share relevant updates when you have consented. You can opt out at any time
        once direct contact details are published on the contact page.
      </p>

      <h2 className="text-lg font-semibold text-bone">Data location and retention</h2>
      <p>
        Form submissions are stored with whichever form service is configured (see README.md for the
        current setup). Retention lasts only as long as needed for workshop communication; removal
        requests can be made through the contact details published on this site.
      </p>

      <h2 className="text-lg font-semibold text-bone">Changes to this policy</h2>
      <p>
        This page will be updated whenever the site gains new functionality (for example, real
        payments or direct contact methods) so it always matches how the site actually behaves.
      </p>
    </LegalPage>
  );
}
