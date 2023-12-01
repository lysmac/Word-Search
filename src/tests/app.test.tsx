import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/native";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
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
        }),
      ),
  ),
);

beforeAll(() => server.listen());

afterAll(() => server.close());

describe("Tests related to searching", () => {
  // Kontrollerar så att det man skriver i searchbaren syns
  test("User can write in the searchbar", async () => {
    render(<App />);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

    await user.type(input, "test");

    expect(input).toHaveValue("test");
  });

  // Kontrollerar så att ett felmeddelande finns om man försöker söka med en tom searchbar
  test("User get an error message when trying to search with an empty search field", async () => {
    render(
      <SearchProvider>
        <App />
      </SearchProvider>,
    );
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", {
      name: /Search!/i,
    });
    await user.type(input, " ");

    expect(input).toHaveValue(" ");

    user.click(button);

    const response = await screen.findByText(
      "Please enter a search term",
      {},
      { timeout: 500 },
    );
    await expect(response).toBeInTheDocument();
  });

  // Kontrollerar att resultatet från en sökning renderas
  test("Make a search and get a result", async () => {
    render(
      <SearchProvider>
        <App />
      </SearchProvider>,
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
    // Kontrollerar att hello och greeting finns
    const hello = await screen.findByText("hello", {}, { timeout: 1000 });
    await expect(hello).toBeInTheDocument();
    const greeting = await screen.findByText("greeting", {}, { timeout: 1000 });
    await expect(greeting).toBeInTheDocument();
  });

  // Kontrollerar att det finns ett error-meddelande vid en icke-existerande sökterm
  test("Make a search for a word not found, get error message", async () => {
    render(
      <SearchProvider>
        <App />
      </SearchProvider>,
    );
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", {
      name: /Search!/i,
    });

    await user.type(input, "asdf");
    expect(input).toHaveValue("asdf");
    user.click(button);

    const response = await screen.findByText(
      "No Definitions Found",
      {},
      { timeout: 1000 },
    );
    await expect(response).toBeInTheDocument();
  });

  // Kontrollerar att det finns ett audio-element och att det går att spela upp ljudet (mockar play-funktionen)
  test("Checks if theres an audio element rendered when when searching", async () => {
    render(
      <SearchProvider>
        <App />
      </SearchProvider>,
    );
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", {
      name: /Search!/i,
    });

    await user.type(input, "hello");
    user.click(button);

    const audioElement = (await screen.findByTestId(
      "audio-element",
    )) as HTMLAudioElement;
    expect(audioElement).toBeInTheDocument();

    const mockPlay = vi.fn();
    audioElement.play = mockPlay;

    audioElement.play();

    expect(mockPlay).toHaveBeenCalled();
  });
});

describe("VG Features", () => {
  // Kontrollerar så att darkmode fungerar genom att hitta tailwind-classes
  test("Darkmode/Lightmode works correctly", async () => {
    render(
      <SearchProvider>
        <App />
      </SearchProvider>,
    );
    const user = userEvent.setup();
    const darkModeButton = screen.getByRole("button", {
      name: /Switch theme/i,
    });
    const wrapperDiv = document.querySelector("#wrapper");
    const headerElement = screen.getByRole("banner");

    // Kollar så tailwind-classes finns för light/darkmode på headern
    expect(headerElement).toHaveClass("dark:bg-dark-purple bg-floral");

    // Klickar på knappen för att byta tema och ser till att wrappern får class dark
    user.click(darkModeButton);
    await waitFor(
      () => {
        expect(wrapperDiv).toHaveClass("dark");
      },
      { timeout: 1000 },
    );
  });

  // Kontrollerar att man kan lägga till och ta bort ord från favoriter.
  // Genom att söka efter ett ord, lägga till det i favoriter och sedan ta bort det.
  // Kontrollerar genom att kolla knappar finns/inte finns kvar på sidan före/efter klick.
  test("User can add, view and delete a word from favourites page", async () => {
    render(
      <SearchProvider>
        <App />
      </SearchProvider>,
    );
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", {
      name: /Search!/i,
    });

    await user.type(input, "hello");
    expect(input).toHaveValue("hello");
    user.click(button);

    const response = await screen.findByText("hello", {}, { timeout: 1000 });
    await expect(response).toBeInTheDocument();

    const addButton = screen.getByRole("button", {
      name: /Add to favourites/i,
    });
    user.click(addButton);

    const savedWordsButton = screen.getByRole("button", {
      name: /Saved words/i,
    });

    await user.click(savedWordsButton);

    const removeButton = screen.getByRole("button", {
      name: /Remove Word/i,
    });

    await expect(removeButton).toBeInTheDocument();
    user.click(removeButton);

    await waitFor(
      () => {
        expect(removeButton).not.toBeInTheDocument();
      },
      { timeout: 500 },
    );
  });
});
