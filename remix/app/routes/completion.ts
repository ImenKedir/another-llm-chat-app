import { Config } from "sst/node/config";
import { eventStream } from "remix-utils/sse/server";
import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const prompt = new URL(request.url).searchParams.get("prompt");

  if (!prompt) {
    return {
      status: 400,
      statusText: "Bad Request",
    };
  }

  return eventStream(request.signal, function setup(send) {
    fetch(Config.OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Config.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gryphe/mythomist-7b",
        prompt: prompt,
        stream: true,
      }),
    })
      .then((response) => response.body)
      .then((body) => {
        const streamReader = body!.getReader();

        // read the stream and send tokens as messages to the browser
        function processStream() {
          streamReader.read().then(({ value }) => {
            const lines = value!
              .toString()
              .split("\n")
              .filter((line: string) => line.trim() !== "");

            for (const line of lines) {
              const message = line.toString().replace(/^data: /, "");

              // Add stop token for user's name
              if (message === "[DONE]" || message === "\n\n") {
                // indicate to browser that we're done
                send({ data: "[DONE]" });
                return;
              }

              if (message !== "OPENROUTER PROCESSING") {
                try {
                  const parsed = JSON.parse(message);
                  const delta = parsed.choices[0].text;
                  send({ data: delta });
                } catch (error) {
                  console.error(error);
                }
              }
            }
            // get the next chunk of data
            processStream();
          });
        }
        // fire!
        processStream();
      });

    return function clear() {};
  });
}
