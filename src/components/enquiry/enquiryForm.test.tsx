import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import EnquiryForm from "@/components/enquiry/EnquiryForm";
import { routes } from "@/app/router";
import { WHATSAPP_NUMBER_PLACEHOLDER, isPlaceholderWhatsAppNumber } from "@/config/site";

import { MemoryRouter } from "react-router-dom";

function renderForm(initialTemplateId = "") {
  // EnquiryForm renders a <Link>, so it needs a router context.
  return render(
    <MemoryRouter initialEntries={["/enquire"]}>
      <EnquiryForm initialTemplateId={initialTemplateId} />
    </MemoryRouter>,
  );
}

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  return render(<RouterProvider router={router} />);
}

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/your name/i), "Ayesha Khan");
  await user.type(screen.getByLabelText(/whatsapp \/ phone number/i), "+92 300 1234567");
  const template = screen.getByLabelText(/^template/i);
  await user.selectOptions(template, "royal-heritage");
  await user.type(screen.getByLabelText(/requirements \/ message/i), "Gold please");
}

describe("EnquiryForm — validation", () => {
  it("shows inline errors for every required field and keeps values", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole("button", { name: /prepare whatsapp message/i }));

    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a whatsapp or phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/please choose a template/i)).toBeInTheDocument();
    // Values the visitor typed must survive — type then re-submit.
    await user.type(screen.getByLabelText(/your name/i), "Sara");
    await user.click(screen.getByRole("button", { name: /prepare whatsapp message/i }));
    expect(screen.getByLabelText(/your name/i)).toHaveValue("Sara");
    // And it must be explicit that nothing was sent.
    expect(screen.getByText(/nothing has been sent/i)).toBeInTheDocument();
  });

  it("rejects a phone number with letters", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/your name/i), "Sara");
    await user.type(screen.getByLabelText(/whatsapp \/ phone number/i), "call me maybe");
    await user.selectOptions(screen.getByLabelText(/^template/i), "luxury-cinematic");
    await user.click(screen.getByRole("button", { name: /prepare whatsapp message/i }));

    expect(
      await screen.findByText(/please enter a valid phone number/i),
    ).toBeInTheDocument();
  });

  it("rejects a phone number that is too short", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/your name/i), "Sara");
    await user.type(screen.getByLabelText(/whatsapp \/ phone number/i), "123");
    await user.selectOptions(screen.getByLabelText(/^template/i), "luxury-cinematic");
    await user.click(screen.getByRole("button", { name: /prepare whatsapp message/i }));

    expect(
      await screen.findByText(/please enter a valid phone number/i),
    ).toBeInTheDocument();
  });

  it("marks invalid fields with aria-invalid for assistive tech", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole("button", { name: /prepare whatsapp message/i }));
    const nameInput = screen.getByLabelText(/your name/i);
    expect(nameInput).toHaveAttribute("aria-invalid", "true");
    expect(nameInput).toHaveFocus();
  });

  it("clears a field error as soon as the visitor edits that field", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole("button", { name: /prepare whatsapp message/i }));
    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();
    await user.type(screen.getByLabelText(/your name/i), "A");
    expect(screen.queryByText(/please enter your name/i)).not.toBeInTheDocument();
  });
});

describe("EnquiryForm — template preselection", () => {
  it("preselects the template passed from a demo", () => {
    renderForm("floral-romance");
    expect(screen.getByLabelText(/^template/i)).toHaveValue("floral-romance");
  });

  it("ignores unknown template ids and explains why", () => {
    renderForm("not-a-real-template");
    expect(screen.getByLabelText(/^template/i)).toHaveValue("");
    expect(screen.getByRole("status")).toHaveTextContent(/unknown template/i);
  });
});

describe("EnquiryForm — WhatsApp handoff", () => {
  it("prepares a labelled message with the selected template", async () => {
    const user = userEvent.setup();
    renderForm();

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /prepare whatsapp message/i }));

    const handoff = await screen.findByRole("heading", {
      name: /your message is ready|demo build/i,
    });
    const section = handoff.closest("section")!;
    const preview = within(section).getByText(/assalam-o-alaikum/i).parentElement!;
    expect(preview).toHaveTextContent("Template: Royal Heritage (royal-heritage)");
    expect(preview).toHaveTextContent("Name: Ayesha Khan");
    expect(preview).toHaveTextContent("My WhatsApp number: 923001234567");
    expect(preview).toHaveTextContent("Gold please");
  });

  it("encodes special characters and non-English text in the link", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/your name/i), "عائشہ & Bilal");
    await user.type(screen.getByLabelText(/whatsapp \/ phone number/i), "923001234567");
    await user.selectOptions(screen.getByLabelText(/^template/i), "floral-romance");
    await user.type(screen.getByLabelText(/requirements \/ message/i), "شکریہ! 100%");
    await user.click(screen.getByRole("button", { name: /prepare whatsapp message/i }));

    const handoff = await screen.findByRole("heading", {
      name: /your message is ready|demo build/i,
    });
    const section = handoff.closest("section")!;
    const preview = within(section).getByText(/assalam-o-alaikum/i).parentElement!;
    expect(preview).toHaveTextContent("Name: عائشہ & Bilal");
    expect(preview).toHaveTextContent("شکریہ! 100%");

    // If the business number is configured, a real wa.me link must exist
    // and its query must decode back to the exact message.
    if (!isPlaceholderWhatsAppNumber()) {
      const link = within(section).getByRole("link", { name: /open whatsapp/i });
      const href = link.getAttribute("href")!;
      expect(href).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
      const encoded = href.split("?text=")[1];
      expect(decodeURIComponent(encoded)).toContain("Template: Floral Romance");
    }
  });

  it("includes wedding date and event types when chosen", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/your name/i), "Sara");
    await user.type(screen.getByLabelText(/whatsapp \/ phone number/i), "923001234567");
    await user.selectOptions(screen.getByLabelText(/^template/i), "elegant-classic");
    await user.type(screen.getByLabelText(/wedding date/i), "2026-12-05");
    await user.click(screen.getByLabelText("Barat"));
    await user.click(screen.getByLabelText("Walima"));
    await user.click(screen.getByRole("button", { name: /prepare whatsapp message/i }));

    const handoff = await screen.findByRole("heading", {
      name: /your message is ready|demo build/i,
    });
    const section = handoff.closest("section")!;
    const preview = within(section).getByText(/assalam-o-alaikum/i).parentElement!;
    expect(preview).toHaveTextContent("Wedding date: 5 Dec 2026");
    expect(preview).toHaveTextContent("Events: Barat, Walima");
  });

  it("never claims the enquiry was sent", async () => {
    const user = userEvent.setup();
    renderForm();

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /prepare whatsapp message/i }));
    await screen.findByRole("heading", { name: /your message is ready|demo build/i });

    expect(screen.queryByText(/your enquiry was sent/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/message sent/i)).not.toBeInTheDocument();
  });

  it("lets the visitor return to editing after preparing a message", async () => {
    const user = userEvent.setup();
    renderForm();

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /prepare whatsapp message/i }));
    await screen.findByRole("heading", { name: /your message is ready|demo build/i });

    await user.click(screen.getByRole("button", { name: /edit my details/i }));
    expect(screen.queryByRole("heading", { name: /your message is ready|demo build/i })).not.toBeInTheDocument();
    // Values are preserved for editing.
    expect(screen.getByLabelText(/your name/i)).toHaveValue("Ayesha Khan");
  });
});

describe("EnquiryPage — route integration", () => {
  it("shows the enquiry heading and carries ?template= into the form", () => {
    renderAt("/enquire?template=royal-heritage");
    expect(
      screen.getByRole("heading", { level: 1, name: /request your invitation/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/^template/i)).toHaveValue("royal-heritage");
    expect(screen.getByText(/you are enquiring about the/i)).toHaveTextContent(
      "Royal Heritage",
    );
  });

  it("renders without a template query parameter", () => {
    renderAt("/enquire");
    expect(screen.getByLabelText(/^template/i)).toHaveValue("");
    expect(screen.queryByText(/you are enquiring about the/i)).not.toBeInTheDocument();
  });
});

describe("WhatsApp configuration", () => {
  it("is still the documented placeholder", () => {
    // If a real number is ever configured, update the README and remove
    // this assertion deliberately — do not delete it silently.
    expect(WHATSAPP_NUMBER_PLACEHOLDER).toBe("15550000000");
  });
});
