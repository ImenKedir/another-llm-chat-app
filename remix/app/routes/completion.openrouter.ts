import { LoaderFunctionArgs } from "@remix-run/node";
import { eventStream } from "remix-utils/sse/server";

const OPENROUTER_API_KEY =
  "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";

export async function loader({ request }: LoaderFunctionArgs) {
  const prompt = new URL(request.url).searchParams.get("prompt");

  return eventStream(request.signal, function setup(send) {
    fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stream: true,
        model: "nousresearch/nous-capybara-7b",
        messages: [{ role: "user", content: prompt }],
      }),
    })
      .then((response) => response.body)
      .then((body) => {
        const streamReader = body!.getReader();

        function processStream() {
          streamReader.read().then(({ value }) => {
            const lines = value!
              .toString()
              .split("\n")
              .filter((line: string) => line.trim() !== "");

            for (const line of lines) {
              const message = line.toString().replace(/^data: /, "");

              if (message === "[DONE]") {
                // indicate to browser that we're done
                send({ data: "[DONE]" });
                return;
              }

              if (message !== "OPENROUTER PROCESSING") {
                try {
                  const parsed = JSON.parse(message);
                  const delta = parsed.choices[0].delta?.content;
                  send({ data: delta });
                } catch (err) {
                  console.error("ERROR", err);
                }
              }
            }
            processStream();
          });
        }

        processStream();
      });

    return function clear() {};
  });
}
