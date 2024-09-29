import React, { useRef, useState } from 'react';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progress);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  return (
    <div className="mb-4">
      <video
        ref={videoRef}
        className="w-full"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="mt-2 flex items-center">
        <button
          onClick={togglePlay}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;