import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getCharacters } from "drizzle/model";
import { Link, useLoaderData } from "@remix-run/react";
import type { Character } from "drizzle/model";
import styles from "@/routes/app._index/app._index.module.css";

export async function loader() {
  const characters = await getCharacters();
  return json({ characters: characters });
}

function Character({ id, name, description }: Character) {
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
  console.log("app/index data:", data);

  return (
    <div className={styles.container}>
      {data.characters.map((character) => (
        <Character key={character.id} {...character} />
      ))}
    </div>
  );
}
