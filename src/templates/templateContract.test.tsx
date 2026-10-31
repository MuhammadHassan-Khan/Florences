import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { getTemplateMeta, getTemplateRenderer, listTemplates } from "@/templates/registry";

/**
 * Template contract (ARCHITECTURE.md §6): renderers are typed components
 * that receive their registry metadata, temporary name overrides and a
 * change handler. Registering a renderer must not require hard-coding the
 * template's id or title anywhere in the template module.
 */
describe("template render contract", () => {
  const registered = listTemplates().filter((meta) => getTemplateRenderer(meta.id));

  it("has at least one registered renderer (the first live template)", () => {
    expect(registered.length).toBeGreaterThan(0);
  });

  it.each(registered.map((meta) => [meta.id, meta] as const))(
    "renders %s from registry metadata alone",
    (_id, meta) => {
      const Renderer = getTemplateRenderer(meta.id);
      if (!Renderer) throw new Error(`No renderer registered for ${meta.id}`);

      render(
        <MemoryRouter>
          <Renderer
            meta={meta}
            names={{ partnerOne: "", partnerTwo: "" }}
            onNamesChange={vi.fn()}
          />
        </MemoryRouter>,
      );

      // One primary heading per live demo route.
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

      // The article is labelled from metadata, not a hard-coded string.
      expect(
        screen.getByRole("article", { name: new RegExp(meta.title, "i") }),
      ).toBeInTheDocument();

      // Enquiry handoff preselects the id coming from the same metadata.
      expect(
        screen.getByRole("link", { name: /enquire about/i }),
      ).toHaveAttribute("href", `/enquire?template=${meta.id}`);

      // Metadata lookup agrees with what was rendered.
      expect(getTemplateMeta(meta.id)).toEqual(meta);
    },
  );
});
