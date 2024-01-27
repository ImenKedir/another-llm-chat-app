import { Link } from "@remix-run/react";

import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/shadcn/button";
import { SearchBar } from "./searchbar";

export function Header() {
  return (
    <header className="sticky top-0 z-10 mx-auto flex h-[50px] max-w-[1200px] items-center gap-6 bg-[#0d0d0f] px-4 lg:px-10">
      <SearchBar />
      <Link className="hidden md:flex" to="/app/create">
        <Button className="flex gap-1 bg-black px-8 text-white">
          <PlusIcon color="white" width={20} height={20} />
        </Button>
      </Link>
    </header>
  );
}
