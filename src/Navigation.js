import React from 'react';
import { useAppContext } from './App';

const Navigation = () => {
  const { dialogues, currentDialogueIndex, setCurrentDialogueIndex } = useAppContext();

  const handlePrevious = () => {
    if (currentDialogueIndex > 0) {
      setCurrentDialogueIndex(currentDialogueIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentDialogueIndex < dialogues.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    }
  };

  return (
    <div className="flex justify-between">
      <button
        onClick={handlePrevious}
        disabled={currentDialogueIndex === 0}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        Previous
      </button>
      <button
        onClick={handleNext}
        disabled={currentDialogueIndex === dialogues.length - 1}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  );
};

export default Navigation;