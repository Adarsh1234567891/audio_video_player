import React from 'react';
import { useAppContext } from './App';

const DialogueDisplay = () => {
  const { dialogues, currentDialogueIndex, setCurrentDialogueIndex } = useAppContext();
  const currentDialogue = dialogues[currentDialogueIndex];

  const handleOriginalTextChange = (e) => {
    const updatedDialogues = [...dialogues];
    updatedDialogues[currentDialogueIndex] = {
      ...currentDialogue,
      originalText: e.target.value,
    };
    setCurrentDialogueIndex(currentDialogueIndex);
  };

  const handleTranslatedTextChange = (e) => {
    const updatedDialogues = [...dialogues];
    updatedDialogues[currentDialogueIndex] = {
      ...currentDialogue,
      translatedText: e.target.value,
    };
    setCurrentDialogueIndex(currentDialogueIndex);
  };

  return (
    <div className="mb-4">
      <div className="mb-2">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="originalText">
          Original Text
        </label>
        <textarea
          id="originalText"
          value={currentDialogue.originalText}
          onChange={handleOriginalTextChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="3"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="translatedText">
          Translated Text
        </label>
        <textarea
          id="translatedText"
          value={currentDialogue.translatedText}
          onChange={handleTranslatedTextChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="3"
        />
      </div>
    </div>
  );
};

export default DialogueDisplay;