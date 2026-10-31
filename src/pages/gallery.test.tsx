import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import GalleryPage from "@/pages/GalleryPage";
import { getTemplateStatus, listTemplates } from "@/templates/registry";

function renderGallery() {
  return render(
    <MemoryRouter>
      <GalleryPage />
    </MemoryRouter>,
  );
}

describe("gallery page", () => {
  it("renders five template cards from the single registry source", () => {
    renderGallery();
    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(5);

    for (const meta of listTemplates()) {
      expect(
        screen.getByRole("heading", { level: 2, name: meta.title }),
      ).toBeInTheDocument();
    }
  });

  it("links every card to its stable demo route", () => {
    renderGallery();
    for (const meta of listTemplates()) {
      const link = screen.getByRole("link", { name: new RegExp(meta.title, "i") });
      expect(link).toHaveAttribute("href", meta.route);
    }
  });

  it("never claims a template is live when no render component exists", () => {
    renderGallery();
    for (const meta of listTemplates()) {
      const link = screen.getByRole("link", { name: new RegExp(meta.title, "i") });
      const expected = getTemplateStatus(meta.id) === "available" ? "Live demo" : "In preparation";
      expect(within(link).getByText(expected)).toBeInTheDocument();
    }
  });
});
