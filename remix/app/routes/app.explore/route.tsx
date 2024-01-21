import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getCharacters, searchCharacters } from "drizzle/model";
import { Bucket } from "sst/node/bucket";

import { useLoaderData, useFetcher } from "@remix-run/react";

import { Input } from "@/components/shadcn/input";
import { ToggleLeftSidebar } from "@/components/toggle-sidebar";

import { CharacterCard } from "./character-card";

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
  const search = useFetcher<typeof loader>();

  return (
    <div className="h-full w-full overflow-y-scroll bg-[#0d0d0f]">
      <header className="sticky top-0 z-10 flex h-[50px] items-center justify-center border-b-2 border-[var(--secondary-dark)] bg-[var(--primary-dark)]">
        <ToggleLeftSidebar />
        <h1 className="font-[Geist] text-2xl text-white">Explore</h1>
      </header>
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 pt-6 lg:px-10">
        <search.Form method="get" className="flex gap-4">
          <Input
            className="border border-[var(--quadrary-dark)] bg-[var(--primary-dark)] text-white placeholder-[var(--secondary-light)]"
            name="q"
            placeholder="Search for characters by name..."
            onSubmit={() => console.log("submit")}
            onChange={(event) => {
              search.submit(event.currentTarget.form);
            }}
          />
        </search.Form>
        <div className="grid w-full grid-cols-2 items-center justify-center gap-4 text-white md:grid-cols-3 md:gap-8 xl:grid-cols-4">
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
