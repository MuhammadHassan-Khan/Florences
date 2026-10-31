import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, afterAll, beforeEach, describe, expect, it, vi } from "vitest";

import MusicControl from "@/components/invitation/MusicControl";

const SRC = "/media/audio/demo-track.wav";
const TITLE = "Demo ambience";

// jsdom does not really play media; playback is stubbed so the control's
// state transitions can be asserted deterministically.
const originalPlay = HTMLMediaElement.prototype.play;
const originalPause = HTMLMediaElement.prototype.pause;
const play = vi.fn();
const pause = vi.fn();

beforeAll(() => {
  HTMLMediaElement.prototype.play = play;
  HTMLMediaElement.prototype.pause = pause;
});

afterAll(() => {
  HTMLMediaElement.prototype.play = originalPlay;
  HTMLMediaElement.prototype.pause = originalPause;
});

beforeEach(() => {
  play.mockReset().mockResolvedValue(undefined);
  pause.mockReset().mockImplementation(() => {});
});

afterEach(cleanup);

function renderControl() {
  render(<MusicControl src={SRC} title={TITLE} />);
  return screen.getByRole("button", { name: /demo ambience/i });
}

describe("music control", () => {
  it("starts paused and never plays before the user asks for it", () => {
    const button = renderControl();
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(button).toHaveAccessibleName(new RegExp(`Play ${TITLE}`, "i"));
    expect(play).not.toHaveBeenCalled();
  });

  it("toggles playback state on each click", async () => {
    const user = userEvent.setup();
    const button = renderControl();

    await user.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveAccessibleName(new RegExp(`Pause ${TITLE}`, "i"));
    expect(play).toHaveBeenCalledTimes(1);

    await user.click(button);
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(button).toHaveAccessibleName(new RegExp(`Play ${TITLE}`, "i"));
    expect(pause).toHaveBeenCalledTimes(1);
  });

  it("degrades to a disabled, labelled control when playback is blocked", async () => {
    play.mockRejectedValue(new Error("playback blocked"));
    const user = userEvent.setup();
    const button = renderControl();

    await user.click(button);
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(button).toHaveAccessibleName(/music is not available in this demo/i);
  });

  it("degrades to a disabled control when the audio file fails to load", () => {
    const button = renderControl();
    fireEvent.error(button.closest("div")!.querySelector("audio")!);
    expect(button).toBeDisabled();
    expect(button).toHaveAccessibleName(/music is not available in this demo/i);
  });
});
