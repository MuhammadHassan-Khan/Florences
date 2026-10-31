import { useSearchParams } from "react-router-dom";

import EnquiryForm from "@/components/enquiry/EnquiryForm";
import Page from "@/components/ui/Page";
import { getTemplateMeta } from "@/templates/registry";

/**
 * Enquiry handoff page (PRODUCT_SPEC §7–8).
 *
 * Arriving from a template demo carries `?template=<id>`; the id is
 * resolved through the registry so unknown ids degrade to a notice
 * instead of a broken preselection.
 */
export default function EnquiryPage() {
  const [searchParams] = useSearchParams();
  const requested = searchParams.get("template") ?? "";
  const meta = getTemplateMeta(requested);

  return (
    <Page eyebrow="Enquiry" title="Request your invitation">
      {meta ? (
        <p>
          You are enquiring about the <strong>{meta.title}</strong> template.{" "}
          <a href={meta.route}>Back to the demo</a>
        </p>
      ) : null}
      <EnquiryForm initialTemplateId={meta ? meta.id : requested} />
    </Page>
  );
}
