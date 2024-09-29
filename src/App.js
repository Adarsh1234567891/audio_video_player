import React, { createContext, useState, useContext } from 'react';
import VideoPlayer from './VideoPlayer';
import AudioRecorder from './AudioRecorder';
import DialogueDisplay from './DialogueDisplay.js';
import Navigation from './Navigation';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const sampleDialogues = [
  { id: 1, originalText: "Hello, how are you?", translatedText: "Bonjour, comment allez-vous?" },
  { id: 2, originalText: "The weather is nice today.", translatedText: "Le temps est beau aujourd'hui." },
  { id: 3, originalText: "I love learning new languages.", translatedText: "J'adore apprendre de nouvelles langues." },
];

const App = () => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [audioBlob, setAudioBlob] = useState(null);

  const value = {
    dialogues: sampleDialogues,
    currentDialogueIndex,
    setCurrentDialogueIndex,
    recordingStatus,
    setRecordingStatus,
    audioBlob,
    setAudioBlob,
  };

  return (
    <AppContext.Provider value={value}>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <VideoPlayer />
          <AudioRecorder />
          <DialogueDisplay />
          <Navigation />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;