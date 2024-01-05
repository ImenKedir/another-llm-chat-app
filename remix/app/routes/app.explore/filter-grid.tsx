import React, { useState } from "react";
import { Button } from "@/components/shadcn/button";

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
  {
    name: "Dominant",
    id: "5",
  },
  {
    name: "Submissive",
    id: "6",
  },
  {
    name: "Switch",
    id: "7",
  },
  {
    name: "Straight",
    id: "8",
  },
  {
    name: "High",
    id: "9",
  },
  {
    name: "Medium",
    id: "10",
  },
  {
    name: "Low",
    id: "11",
  },
  {
    name: "Small",
    id: "12",
  },
  {
    name: "Boo",
    id: "13",
  },
  {
    name: "Average",
    id: "14",
  },
  {
    name: "Big",
    id: "15",
  },
  {
    name: "Huge",
    id: "16",
  },
  {
    name: "Gigantic",
    id: "17",
  },
  {
    name: "Micro",
    id: "18",
  },
  {
    name: "Micro",
    id: "19",
  },
  {
    name: "Micro",
    id: "20",
  },
  {
    name: "Micro",
    id: "21",
  },
];

export const FilterGrid: React.FC = () => {
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);

  const handleButtonClick = (buttonId: string) => {
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

  const displayedButtons = expanded ? buttonList : buttonList.slice(0, 10);

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
