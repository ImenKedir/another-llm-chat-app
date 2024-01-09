import { useState } from "react";
import { Button } from "@/components/shadcn/button";
import { useFilterStore } from "@/hooks/useFilterStore";

let buttonList = [
  {
    name: "Male",
    id: "1",
    bg: "bg-red-500",
  },
  {
    name: "Female",
    id: "2",
    bg: "bg-blue-500",
  },
  {
    name: "Fictional",
    id: "3",
    bg: "bg-slate-500",
  },
  {
    name: "Non-Fictional",
    id: "4",
  },

];

export const FilterGrid: React.FC = () => {
  const { selectedFilters, setSelectedFilters } = useFilterStore();

  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);

  const handleButtonClick = (buttonId: string) => {
    
   // Find the button by ID
   const button = buttonList.find(button => button.id === buttonId);

   // Safety check in case the button is not found
   if (!button) return;

   // Use the button's name to update the selected filters
   setSelectedFilters(prevSelectedFilters => {
     const isAlreadySelected = prevSelectedFilters.includes(button.name);
     return isAlreadySelected 
       ? prevSelectedFilters.filter(name => name !== button.name)
       : [...prevSelectedFilters, button.name];
   });



    setSelectedButtons((prevSelectedButtons) => {
      if (prevSelectedButtons.includes(buttonId)) {
        return prevSelectedButtons.filter((id) => id !== buttonId);
      } else {
        return [...prevSelectedButtons, buttonId];
      }
    });
    
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const displayedButtons = expanded ? buttonList : buttonList.slice(0, 1);

  return (
    <div className="overflow-x-auto">
      <div
        className="flex flex-wrap gap-2 "
        style={{ gridAutoColumns: "max-content" }}
      >
        {displayedButtons.map((button) => (
          <Button
            key={button.id}
            variant="secondary"
            className={`flex-none border border-[var(--quadrary-dark)] bg-[var(--tertiary-dark)] text-[var(--secondary-light)] ${
              selectedButtons.includes(button.id)
                ? button.bg || "bg-slate-400"
                : ""
            }`}
            onClick={() => handleButtonClick(button.id)}
          >
            {button.name}
          </Button>
        ))}
        <Button
          variant="secondary"
          className="flex-none border border-[var(--quadrary-dark)] bg-blue-500 text-[var(--secondary-light)]"
          onClick={toggleExpand}
        >
          {expanded ? "Collapse" : "Expand"}
        </Button>
      </div>
    </div>
  );
};
