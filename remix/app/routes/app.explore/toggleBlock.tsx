import React, { useState } from 'react';

export const ToggleBlock: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);

  const handleButtonClick = (buttonNumber: number) => {
    setSelectedButton(buttonNumber);
  };

  const isSelected = (buttonNumber: number): string => {
    return selectedButton === buttonNumber ? 'bg-blue-500 text-white' : 'bg-slate-500 text-black';
  };

  return (
    <div className="flex rounded-full">
      <button
        className={`p-2 rounded-l-xl ${isSelected(1)}`}
        onClick={() => handleButtonClick(1)}
      >
        Button 1
      </button>
      <button
        className={`p-2   ${isSelected(2)}`}
        onClick={() => handleButtonClick(2)}
      >
        Button 2
      </button>
      <button
        className={`p-2 rounded-r-xl ${isSelected(3)}`}
        onClick={() => handleButtonClick(3)}
      >
        Button 3
      </button>
    </div>
  );
};

