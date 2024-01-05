import React, { useState } from 'react'
import { Button } from '@/components/shadcn/button'


let buttonList = [
    {
        name: "Male",
        id: "1",
        bg: "bg-red-500"
    },
    {
        name: "Female",
        id: "2",
        bg: "bg-blue-500"
    },
    {
        name: "Fictional",
        id: "3",
        bg: "bg-slate-500"
    },
    {
        name: "Non-Fictional",
        id: "4"
    },
    {
        name: "Dominant", 
        id: "5"
    },
    {
        name: "Submissive",
        id: "6"
    },
    {
        name: "Switch",
        id: "7"
    },
    {
        name: "Straight",
        id: "8"
      },
      {
        name: "High",
        id: "9"
      },
      {
        name: "Medium",
        id: "10"
      },
      {
        name: "Low",
        id: "11"

      },
      {
        name: "Small", 
        id: "12"
      },
      {
        name: "Boo",
        id: "13"
      },
      {
        name: "Average",
        id: "14"
      }


          
      ]


export const Filters: React.FC = () => {
    const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  
    const handleButtonClick = (buttonId: string) => {
      setSelectedButtons(prevSelectedButtons => {
        if (prevSelectedButtons.includes(buttonId)) {
          return prevSelectedButtons.filter(id => id !== buttonId);
        } else {
          return [...prevSelectedButtons, buttonId];
        }
      });
    };
    return (
      <div className="overflow-x-auto">
      <div className="grid grid-flow-col grid-rows-3 sm:grid-rows-2 grid-cols-none gap-2" style={{ gridAutoColumns: 'max-content' }}>
        {buttonList.map((button) => (
          <Button 
            key={button.id} 
            variant="secondary"
            className={`flex-none bg-[var(--tertiary-dark)] border border-[var(--quadrary-dark)] text-[var(--secondary-light)] ${selectedButtons.includes(button.id) ? button.bg || 'bg-slate-400' : ''}`}
            onClick={() => handleButtonClick(button.id)}
          >
            {button.name}
          </Button>
        ))}
      </div>
    </div>
    );
  }