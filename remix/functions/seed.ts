import fs from "fs";
import { ApiHandler } from "sst/node/api";

import { getUser, createUser } from "drizzle/model";

async function createNughtyMLUser() {
  const nuaghtyML = await getUser("1");

  if (!nuaghtyML) {
    const user = await createUser({
      id: "1",
      name: "NaughtyML",
      email: null,
      image: null,
    });
  }

  return nuaghtyML;
}

function getCharactersFromJson() {
  const file = fs.readFileSync("data/characters.json", "utf8");

  let characters;
  try {
    characters = JSON.parse(file);
  } catch (error) {
    console.error(error);
    characters = [];
  }

  return characters;
}

export const handler = ApiHandler(async (_evt) => {
  const characters: any[] = getCharactersFromJson();

  characters.forEach((c, i) => {
    console.log(`Char ${i}: ${c}`);
  });

  const nuaghtyML = await createNughtyMLUser();

  return {
    body: "ok",
  };
});
