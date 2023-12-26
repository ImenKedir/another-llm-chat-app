import { Config } from "sst/node/config";
import { LoaderFunctionArgs } from "@remix-run/node";
import { eventStream } from "remix-utils/sse/server";

export async function loader({ request }: LoaderFunctionArgs) {
  const prompt = new URL(request.url).searchParams.get("prompt");

  return eventStream(request.signal, function setup(send) {
    fetch(Config.OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Config.OPENROUTER_API_KEY}`,
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

        // read the stream and send tokens as messages to the browser
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
