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

  const w = `You are ${character.name}, a ${character.description}.`;
  const x = `### Instruction: Given the following conversation between ${character.name} and ${user.name}, write the next line of dialogue for ${character.name}.`;
  const y = formatedMessages.join("\n");
  const z = `${user.name}: ${userInput}\n\n${character.name}:`;

  let ret = `${w}\n\n${x}\n\n${y}${z}`;
  console.log(ret);

  return `${w}\n\n${x}\n\n${y}${z}`;
}
