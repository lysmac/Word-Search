import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/native";
import { afterAll, beforeAll, expect, test } from "vitest";
import App from "../App";
import SearchProvider from "../resultContext";

const server = setupServer(
  rest.get(
    "https://api.dictionaryapi.dev/api/v2/entries/en/hello",
    (req, res, ctx) =>
      res(
        ctx.json({
          word: "hello",
          phonetic: "həˈləʊ",
          phonetics: [
            {
              text: "həˈləʊ",
              audio:
                "//ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3",
            },
            {
              text: "hɛˈləʊ",
            },
          ],
          origin:
            "early 19th century: variant of earlier hollo ; related to holla.",
          meanings: [
            {
              partOfSpeech: "exclamation",
              definitions: [
                {
                  definition:
                    "used as a greeting or to begin a phone conversation.",
                  example: "hello there, Katie!",
                  synonyms: [],
                  antonyms: [],
                },
              ],
            },
            {
              partOfSpeech: "noun",
              definitions: [
                {
                  definition: "an utterance of ‘hello’; a greeting.",
                  example: "she was getting polite nods and hellos from people",
                  synonyms: [],
                  antonyms: [],
                },
              ],
            },
            {
              partOfSpeech: "verb",
              definitions: [
                {
                  definition: "say or shout ‘hello’.",
                  example: "I pressed the phone button and helloed",
                  synonyms: [],
                  antonyms: [],
                },
              ],
            },
          ],
        })
      )
  )
);

beforeAll(() => server.listen());

afterAll(() => server.close());

test("User can write in the searchbar", async () => {
  render(<App />);
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");

  await user.type(input, "test");

  expect(input).toHaveValue("test");
});

test("Make a search and get a result", async () => {
  render(
    <SearchProvider>
      <App />
    </SearchProvider>
  );
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");
  const button = screen.getByRole("button", {
    name: /Search!/i,
  });

  await user.type(input, "hello");
  expect(input).toHaveValue("hello");
  user.click(button);

  // Satte 1 sekund timeout för att få testet att fungera vid första starten
  const response = await screen.findByText("hello", {}, { timeout: 1000 });
  // const response = await screen.findByText("hello", {}, { timeout: 500 });
  await expect(response).toBeInTheDocument();
});

test("Play the sound", async () => {
  render(
    <SearchProvider>
      <App />
    </SearchProvider>
  );
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");
  const button = screen.getByRole("button", {
    name: /Search!/i,
  });

  await user.type(input, "hello");
  expect(input).toHaveValue("hello");
  user.click(button);

  // Satte 1 sekund timeout för att få testet att fungera vid första starten
  const response = await screen.findByText("hello", {}, { timeout: 1000 });
  // const response = await screen.findByText("hello", {}, { timeout: 500 });
  await expect(response).toBeInTheDocument();

  const audioButton = screen.getByRole("button", {
    name: /AUDIO/i,
  });
  expect(audioButton).toBeInTheDocument();
});

test("Darkmode/Lightmode works correctly", async () => {
  render(<App />);
  const user = userEvent.setup();
  const darkModeButton = screen.getByRole("button", {
    name: /Switch theme/i,
  });
  const wrapperDiv = document.querySelector("#wrapper");

  expect(wrapperDiv).toHaveClass("light");
  user.click(darkModeButton);
  await waitFor(
    () => {
      expect(wrapperDiv).toHaveClass("dark");
    },
    { timeout: 500 }
  );
});
