import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { routes } from "@/app/router";
import { elegantDemoData } from "@/data/demoElegantData";
import { floralDemoData } from "@/data/demoFloralData";
import { minimalDemoData } from "@/data/demoMinimalData";
import { royalDemoData } from "@/data/demoRoyalData";
import { demoWeddingData, type WeddingDemoData } from "@/data/demoWeddingData";
import { getTemplateRenderer } from "@/templates/registry";

type Case = { id: string; data: WeddingDemoData };

const cases: Case[] = [
  { id: "luxury-cinematic", data: demoWeddingData },
  { id: "floral-romance", data: floralDemoData },
  { id: "minimal-modern", data: minimalDemoData },
  { id: "royal-heritage", data: royalDemoData },
  { id: "elegant-classic", data: elegantDemoData },
];

function renderDemo(id: string) {
  const router = createMemoryRouter(routes, { initialEntries: [`/templates/${id}`] });
  return render(<RouterProvider router={router} />);
}

describe("all five template demos", () => {
  it("registers a renderer for every published template", () => {
    for (const { id } of cases) {
      expect(getTemplateRenderer(id), `missing renderer for ${id}`).not.toBeNull();
    }
  });

  it.each(cases.map((c) => [c.id, c.data] as const))(
    "%s: renders sample content with one h1, a countdown, events and media",
    (id, data) => {
      renderDemo(id);
      const article = screen.getByRole("article", { name: /invitation demo/i });
      const scope = within(article);

      // Exactly one primary heading, carrying the sample couple's names.
      const h1s = scope.getAllByRole("heading", { level: 1 });
      expect(h1s).toHaveLength(1);
      expect(h1s[0].textContent).toContain(data.couple.partnerOne);
      expect(h1s[0].textContent).toContain(data.couple.partnerTwo);

      // Demo data stays visibly labelled and every section is labelled.
      expect(scope.getAllByText(data.demoNotice).length).toBeGreaterThanOrEqual(2);
      expect(scope.getAllByRole("region").length).toBeGreaterThanOrEqual(4);

      // Live countdown target comes from the sample data.
      expect(scope.getByRole("timer")).toBeInTheDocument();

      // Every celebration is shown with a map action.
      for (const event of data.events) {
        expect(scope.getAllByText(event.title).length).toBeGreaterThan(0);
        expect(scope.getAllByText(event.timeLabel).length).toBeGreaterThan(0);
      }
      expect(scope.getAllByRole("link", { name: /view on map/i })).toHaveLength(
        data.events.length,
      );

      // Four reserved-dimension gallery plates with descriptive alt text.
      const images = article.querySelectorAll("img");
      expect(images).toHaveLength(4);
      for (const image of images) {
        expect(image.getAttribute("alt")).toBeTruthy();
        expect(image.getAttribute("width")).toBe("800");
        expect(image.getAttribute("height")).toBe("600");
        expect(image.getAttribute("loading")).toBe("lazy");
      }

      // Music exists, starts paused, and the enquiry handoff preselects.
      expect(scope.getByRole("button", { name: /ambience/i })).toHaveAttribute(
        "aria-pressed",
        "false",
      );
      expect(scope.getByRole("link", { name: /enquire about/i })).toHaveAttribute(
        "href",
        `/enquire?template=${id}`,
      );
    },
  );

  it.each(cases.map((c) => [c.id, c.data] as const))(
    "%s: temporary name edits update every name location without mutating sample data",
    async (id, data) => {
      const user = userEvent.setup();
      const sampleBefore = structuredClone(data);
      renderDemo(id);
      const article = screen.getByRole("article", { name: /invitation demo/i });

      await user.type(screen.getByLabelText("Partner one"), "Noor");
      await user.type(screen.getByLabelText("Partner two"), "Zayn");

      const h1 = within(article).getByRole("heading", { level: 1 });
      expect(h1.textContent).toContain("Noor");
      expect(h1.textContent).toContain("Zayn");

      // The sample names are gone from every rendered locationâ€¦
      expect(
        within(article).queryByText(new RegExp(`\\b${data.couple.partnerOne}\\b`)),
      ).not.toBeInTheDocument();
      expect(
        within(article).queryByText(new RegExp(`\\b${data.couple.partnerTwo}\\b`)),
      ).not.toBeInTheDocument();
      // â€¦and the untouched sample data object is identical.
      expect(data).toEqual(sampleBefore);

      // Reset returns the demo to the sample couple.
      await user.click(screen.getByRole("button", { name: /reset to sample/i }));
      expect(
        within(article).getByRole("heading", { level: 1 }).textContent,
      ).toContain(data.couple.partnerOne);
    },
  );
});
