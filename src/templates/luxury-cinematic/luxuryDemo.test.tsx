import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { routes } from "@/app/router";
import { demoWeddingData } from "@/data/demoWeddingData";
import { getTemplateStatus } from "@/templates/registry";

function renderDemo() {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/templates/luxury-cinematic"],
  });
  return render(<RouterProvider router={router} />);
}

describe("luxury cinematic live demo", () => {
  it("is reported as available because its renderer is registered", () => {
    expect(getTemplateStatus("luxury-cinematic")).toBe("available");
  });

  it("renders the full invitation from sample content", () => {
    renderDemo();

    // Sample couple in the hero (the only h1 on a live demo route).
    expect(
      screen.getByRole("heading", { level: 1, name: /aisha/i }),
    ).toBeInTheDocument();

    // Demo data stays visibly labelled (hero and closing).
    expect(screen.getAllByText(/sample invitation/i).length).toBeGreaterThanOrEqual(1);

    // Invitation wording, date and a live countdown.
    expect(screen.getByText(demoWeddingData.inviteLead)).toBeInTheDocument();
    expect(screen.getByRole("timer")).toBeInTheDocument();

    // All three sample celebrations with map actions.
    for (const event of demoWeddingData.events) {
      expect(
        screen.getByRole("heading", { level: 3, name: event.title }),
      ).toBeInTheDocument();
    }
    expect(screen.getAllByRole("link", { name: /view on map/i })).toHaveLength(
      demoWeddingData.events.length,
    );

    // Music control starts paused and only plays on explicit user action.
    expect(
      screen.getByRole("button", { name: /play demo ambience/i }),
    ).toHaveAttribute("aria-pressed", "false");

    // Enquiry handoff preselects this template.
    const enquire = screen.getByRole("link", { name: /enquire about/i });
    expect(enquire).toHaveAttribute("href", "/enquire?template=luxury-cinematic");
  });

  it("updates every displayed name for a temporary edit without mutating sample data", async () => {
    const user = userEvent.setup();
    const sampleBefore = structuredClone(demoWeddingData);
    renderDemo();

    await user.type(screen.getByLabelText("Partner one"), "Noor");
    await user.type(screen.getByLabelText("Partner two"), "Zayn");

    // Names update everywhere they are displayed: hero, invitation and closing.
    expect(
      screen.getByRole("heading", { level: 1, name: /noor/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/noor/i).length).toBeGreaterThanOrEqual(3);
    expect(screen.queryByText(/aisha/i)).not.toBeInTheDocument();

    // The temporary-preview notice stays visible.
    expect(screen.getByText(/changes are not saved/i)).toBeInTheDocument();

    // Sample content is never mutated by an edit.
    expect(demoWeddingData).toEqual(sampleBefore);
    expect(demoWeddingData.couple).toEqual({ partnerOne: "Aisha", partnerTwo: "Bilal" });
  });

  it("restores the sample names with the reset action", async () => {
    const user = userEvent.setup();
    renderDemo();

    await user.type(screen.getByLabelText("Partner one"), "Noor");
    expect(screen.getByRole("heading", { level: 1, name: /noor/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /reset to sample/i }));
    expect(
      screen.getByRole("heading", { level: 1, name: /aisha/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/noor/i)).not.toBeInTheDocument();
  });

  it("keeps a blank override falling back to the sample name", async () => {
    const user = userEvent.setup();
    renderDemo();

    await user.type(screen.getByLabelText("Partner one"), "Noor");
    await user.clear(screen.getByLabelText("Partner one"));

    // Blank field falls back to the sample name; untouched field keeps it.
    expect(
      screen.getByRole("heading", { level: 1, name: /aisha/i }),
    ).toBeInTheDocument();
    expect(demoWeddingData.couple.partnerOne).toBe("Aisha");
  });
});
