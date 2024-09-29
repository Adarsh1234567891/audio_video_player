import React, { useRef, useState, useEffect } from 'react';
import { useAppContext } from './App';

const AudioRecorder = () => {
  const { recordingStatus, setRecordingStatus, setAudioBlob } = useAppContext();
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
      };

      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      mediaRecorderRef.current.start();
      setRecordingStatus('recording');
      drawWaveform();
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecordingStatus('stopped');
    }
  };

  const drawWaveform = () => {
    if (!analyserRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      requestAnimationFrame(draw);
      analyserRef.current.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
      canvasCtx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };

    draw();
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <button
          onClick={startRecording}
          disabled={recordingStatus === 'recording'}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Start Recording
        </button>
        <button
          onClick={stopRecording}
          disabled={recordingStatus !== 'recording'}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Stop Recording
        </button>
      </div>
      <canvas ref={canvasRef} className="w-full h-24 bg-gray-200" />
      {audioUrl && (
        <audio controls src={audioUrl} className="w-full mt-2">
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default AudioRecorder;