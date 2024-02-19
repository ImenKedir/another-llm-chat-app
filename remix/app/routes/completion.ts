import { Config } from "sst/node/config";
import { eventStream } from "remix-utils/sse/server";
import { requireAuth } from "@/sessions.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import {
  getUser,
} from "drizzle/model";

export async function loader({ request }: LoaderFunctionArgs) {
  const prompt = new URL(request.url).searchParams.get("prompt");
  const userId = await requireAuth(request);

  const [user] = await Promise.all([
    getUser(userId),
  ]);

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
        model: "pygmalionai/mythalion-13b",
        prompt: prompt,
        max_tokens: 200,
        stream: true,
      }),
    })
      .then((response) => response.body)
      .then((body) => {
        const streamReader = body!.getReader();

        // read the stream and send tokens as messages to the browser      
        let window: string[] = [];
        function processStream() {  
          streamReader.read().then(({ value }) => {          
      

            const lines = value!
              .toString()
              .split("\n")
              .filter((line: string) => line.trim() !== "");
    
            for (const line of lines) {
              const message = line.toString().replace(/^data: /, "");

              // Add stop token for user's name
              if (message === "[DONE]" || message === "\n\n" ) {
                // indicate to browser that we're done
                send({ data: "[DONE]" });
                return;
              }

              
              if (message !== "OPENROUTER PROCESSING") {
                try {
                  const parsed = JSON.parse(message);
                  const delta = parsed.choices[0].text;
                  console.log(delta)
                  send({ data: delta });
                  // add the token to the window
                  window.push(delta);
                  const window_str = window.join("");
                  console.log("WINDOW:", window_str)
                  // search for users namme followed by a colon
                  if (window_str.includes(`${user!.name}:`)) {
                    // indicate to browser that we're done
                    send({ data: "[DONE]" });
                    return;
                    throw new Error("User's name found in response");
                  }
                  // remove the first element if the window is too long
                  if (window.length > 10) {
                    window = window.slice(1);
                  }

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
