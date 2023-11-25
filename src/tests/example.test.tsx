import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import App from "../App";

test("Checks so the user can write in the search bar", async () => {
  render(<App />);
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");

  await user.type(input, "asd");

  expect(input).toHaveValue("asd");
});
