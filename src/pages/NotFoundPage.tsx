import { Link } from "react-router-dom";

import Page from "@/components/ui/Page";

export default function NotFoundPage() {
  return (
    <Page eyebrow="404" title="Page not found">
      <p>The page you&apos;re looking for doesn&apos;t exist or may have moved.</p>
      <p>
        <Link to="/">Back to the gallery</Link>
      </p>
    </Page>
  );
}
