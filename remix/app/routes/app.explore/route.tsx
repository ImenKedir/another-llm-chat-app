import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getCharacters, searchCharacters } from "drizzle/model";
import { Bucket } from "sst/node/bucket";

import { useLoaderData, useFetcher } from "@remix-run/react";

import { SearchBar } from "./searchbar";
import { CharacterCard } from "./character-card";
import { Header } from "@/routes/app.explore/header";
import { ToggleLeftSidebar } from "@/components/toggle-sidebar";

export async function loader({ request }: LoaderFunctionArgs) {
  let query = new URL(request.url).searchParams.get("q");

  if (query) {
    return json({
      characters: await searchCharacters(query),
      bucket: Bucket.content.bucketName,
    });
  }

  return json({
    characters: await getCharacters(),
    bucket: Bucket.content.bucketName,
  });
}

export default function Explore() {
  const data = useLoaderData<typeof loader>();
  const search = useFetcher<typeof loader>({ key: "explore-page" });

  return (
    <div className="h-full w-full overflow-y-scroll bg-[#0d0d0f]">
      <Header />
      <div className="mx-auto max-w-[1200px] flex-col gap-6 px-4 pt-6 lg:px-10">
        <div className="grid w-full grid-cols-2 items-center justify-center gap-4 text-white sm:grid-cols-3 md:gap-8 lg:grid-cols-4">
          {search.data
            ? search.data.characters.map((character) => (
                <CharacterCard
                  key={character.id}
                  bucket={data.bucket}
                  {...character}
                />
              ))
            : data.characters.map((character) => (
                <CharacterCard
                  key={character.id}
                  bucket={data.bucket}
                  {...character}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
