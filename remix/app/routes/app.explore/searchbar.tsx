import { useFetcher } from "@remix-run/react";

import { Input } from "@/components/shadcn/input";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/shadcn/button";
import { PieChartIcon } from "@radix-ui/react-icons";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export function SearchBar() {
  const search = useFetcher({ key: "explore-page" });
  return (
    <search.Form method="get" className="flex grow gap-4">
      <Input
        className="border border-[var(--quadrary-dark)] bg-[var(--primary-dark)] text-white placeholder-[var(--secondary-light)]"
        name="q"
        placeholder="Search for characters by name..."
        onSubmit={(event) => {
          // if there is no user input just call the loader with no query

          search.submit(event.currentTarget.form);
        }}
      />
      <Button
        type="submit"
        className="flex gap-1 
         bg-white text-black"
      >
        {search.state === "loading" ? (
          <PieChartIcon
            className="animate-spin"
            color="black"
            width={20}
            height={20}
          />
        ) : (
          <MagnifyingGlassIcon color="black" width={20} height={20} />
        )}
      </Button>
    </search.Form>
  );
}
