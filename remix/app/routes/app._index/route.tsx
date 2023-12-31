import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getCharacters } from "drizzle/model";
import { Link, useLoaderData } from "@remix-run/react";
import type { Character } from "drizzle/model";
import styles from "@/routes/app._index/app._index.module.css";

export async function loader() {
  const characters = await getCharacters();
  return json({ characters: characters });
}

function CharacterCard({ id, name, description }: Character) {
  return (
    <div className={styles.character_container}>
      <div>
        {name}
        {description}
      </div>
      <Link to={`/app/chat/${id}/new`}>Chat</Link>
    </div>
  );
}

export default function Explore() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className={styles.container}>
      {data.characters.map((character) => (
        <CharacterCard key={character.id} {...character} />
      ))}
    </div>
  );
}
