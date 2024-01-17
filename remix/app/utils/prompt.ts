import type { User, Character, Message } from "drizzle/model";

export function generatePrompt(
  user: User,
  character: Character,
  userInput: string,
  messages: Message[],
) {
  if (!user.name) {
    user.name = "Anonymous";
  }

  const formatedMessages = messages.map((message) => {
    if (message.author === "ai") {
      return `${character.name}: ${message.content}`;
    } else {
      return `${user.name}: ${message.content}`;
    }
  });
  const conversationHistory = formatedMessages.join("\n");

  const instructions =
    "### Instruction:\n" +
    `Given the following conversation between ${character.name} and ${user.name}, write ${character.name}'s next reply in a fictional chat between them. ` +
    "Provide a single, medium-length reply in 2-5 sentences in internet RP style, italicize actions, and avoid quotation marks. " +
    "Be proactive, creative, and drive the plot and conversation forward. Write original, well-structured and descriptive messages. " +
    "Write descriptive and creative scenes. Narrate actions, thoughts, and desires in detail. If the conversation strays to something random or unexpected, go with it and continue in that direction. " +
    `Always stay in character and avoid repetition.\n\n` +
    `${character.name} is ${character.shortDescription}. ` +
    `Below is some information about ${character.name}:\n` +
    `${character.longDescription}\n\n`;

  const input =
    "Conversation History:\n" +
    `${conversationHistory}\n` +
    `${user.name}: ${userInput}\n` +
    `${character.name}: `;

  return instructions + input;
}
