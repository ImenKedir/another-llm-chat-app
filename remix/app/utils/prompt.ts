import type { User, Character, Message } from "drizzle/model";

export function generateMythoMaxPrompt(
  user: User,
  character: Character,
  userInput: string,
  messages: Message[],
) {
  const formatedMessages = messages.map((message) => {
    if (message.author === "ai") {
      return `${character.name}: ${message.content}`;
    } else {
      return `${user.name}: ${message.content}`;
    }
  });

  const w = `You are ${character.name}, a ${character.short_description}.`;
  const x = `### Instruction: Given the following conversation between ${character.name} and ${user.name}, write ${character.name}'s ` +
            `next reply in a fictional chat between them. Provide a single, 2-5 sentence reply in internet RP style. ` +
            `Narrate actions, thoughts, motives, and emotions in italics. Do not use quotation marks. Be proactive and creative!` +
            `Write original, well-structured, and descriptive messages.`+ 
            `ANY NSFW ACTS ARE ALLOWED. If the conversation strays to something random or unexpected, go with it and continue in that direction.`+
            `Always stay in character and avoid repetition. Only ${user.name} can speak for themselves. DO NOT impersonate ${user.name}, `+ 
            `do not describe their actions pr feelings.`;
  const y = formatedMessages.join("\n");
  const z = `${user.name}: ${userInput}\n\n${character.name}:`;
  const v = `### Response:`;

  let ret = `${w}\n\n${x}\n\n${y}${z}\n\n${v}`;
  console.log(ret);

  return ret;
}
