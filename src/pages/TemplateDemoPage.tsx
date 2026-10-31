import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import DemoNameEditor from "@/components/invitation/DemoNameEditor";
import Page from "@/components/ui/Page";
import { getTemplateMeta, getTemplateRenderer } from "@/templates/registry";
import type { CoupleNames } from "@/templates/types";

import styles from "./TemplateDemoPage.module.css";

/**
 * Demo route for a single template.
 * - unknown id        → friendly fallback (never crashes)
 * - metadata only     → honest "in preparation" state (never claims a
 *                       finished demo that does not exist)
 * - registry renderer → live template with temporary name overrides
 */
export default function TemplateDemoPage() {
  const { templateId } = useParams();
  const meta = getTemplateMeta(templateId);
  const Renderer = getTemplateRenderer(templateId);

  // Temporary personalization — local to this demo session, never persisted.
  const [names, setNames] = useState<CoupleNames>({ partnerOne: "", partnerTwo: "" });

  if (!meta) {
    return (
      <Page eyebrow="Template demo" title="Template not found">
        <p>
          We couldn&apos;t find the template you&apos;re looking for. It may have been
          renamed, or the link may be out of date.
        </p>
        <p>
          <Link to="/">Back to the gallery</Link>
        </p>
      </Page>
    );
  }

  if (!Renderer) {
    return (
      <Page eyebrow={meta.styleLabel} title={meta.title}>
        <p className={styles.preparationDescription}>{meta.description}</p>
        <p className={styles.preparationNote}>
          This invitation demo is being prepared. In the meantime you can explore the
          gallery or enquire about this style — your selection will be carried over.
        </p>
        <p className={styles.actions}>
          <Link to="/">Back to the gallery</Link>
          <Link className={styles.enquireLink} to={`/enquire?template=${meta.id}`}>
            Enquire about this style
          </Link>
        </p>
      </Page>
    );
  }

  return (
    <div className={styles.demoWrap}>
      <DemoNameEditor value={names} onChange={setNames} />
      {/* Registry renderers are stable, module-level component references —
          the rule cannot distinguish a registry lookup from a component
          literally created during render. */}
      {/* eslint-disable-next-line react-hooks/static-components */}
      <Renderer meta={meta} names={names} onNamesChange={setNames} />
    </div>
  );
}
