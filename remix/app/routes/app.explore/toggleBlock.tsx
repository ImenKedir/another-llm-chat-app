import { useState } from "react";
import { Button } from "@/components/shadcn/button";

export const ToggleBlock: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);

  const handleButtonClick = (buttonNumber: number) => {
    setSelectedButton(buttonNumber);
  };

  const isSelected = (buttonNumber: number): string => {
    return selectedButton === buttonNumber
      ? "bg-black text-white"
      : "bg-[var(--tertiary-dark)] text-[var(--secondary-light)]";
  };

  return (
    <div className="flex">
      <Button
        className={`h-7 rounded-r-none border border-[var(--quadrary-dark)] ${isSelected(
          1,
        )}`}
        onClick={() => handleButtonClick(1)}
      >
        All
      </Button>
      <Button
        className={`h-7 rounded-none border border-[var(--quadrary-dark)] ${isSelected(
          2,
        )}`}
        onClick={() => handleButtonClick(2)}
      >
        NSFW
      </Button>
      <Button
        className={`h-7 rounded-l-none border border-[var(--quadrary-dark)] ${isSelected(
          3,
        )}`}
        onClick={() => handleButtonClick(3)}
      >
        SFW
      </Button>
    </div>
  );
};
