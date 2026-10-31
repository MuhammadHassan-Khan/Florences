import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { routes } from "@/app/router";

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  return render(<RouterProvider router={router} />);
}

describe("app routes", () => {
  it("renders the gallery landing page at /", () => {
    renderAt("/");
    expect(
      screen.getByRole("heading", { level: 1, name: /digital wedding invitations/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
  });

  it("renders a template route for a known template id", () => {
    renderAt("/templates/royal-heritage");
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.queryByText(/page not found/i)).not.toBeInTheDocument();
  });

  it("shows a friendly fallback for unknown template ids", () => {
    renderAt("/templates/not-a-real-template");
    expect(
      screen.getByRole("heading", { level: 1, name: /template not found/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to the gallery/i }),
    ).toBeInTheDocument();
  });

  it("shows the enquiry page at /enquire", () => {
    renderAt("/enquire");
    expect(
      screen.getByRole("heading", { level: 1, name: /request your invitation/i }),
    ).toBeInTheDocument();
  });

  it("shows the not-found page for unknown paths", () => {
    renderAt("/definitely-missing");
    expect(
      screen.getByRole("heading", { level: 1, name: /page not found/i }),
    ).toBeInTheDocument();
  });
});
