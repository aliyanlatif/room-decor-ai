"use client";

import { useState, useRef } from "react";

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string>("");
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access microphone. Please grant permission.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const deleteRecording = () => {
    setAudioURL("");
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Voice Description
      </h3>
      <div className="border-2 border-gray-400 rounded-lg p-6 space-y-4 hover:border-gray-500 transition-colors bg-gray-50/50">
        <div className="flex flex-col items-center space-y-4">
          {!isRecording && !audioURL && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <svg
                  className="w-16 h-16 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </div>
              <button
                onClick={startRecording}
                className="px-8 py-3 bg-transparent border-2 border-gray-700 text-gray-800 rounded-full transition-all duration-300 font-medium hover:bg-gray-800 hover:text-white hover:border-gray-800"
              >
                Start Recording
              </button>
              <p className="text-sm text-gray-600">
                Describe your room decor preferences
              </p>
            </div>
          )}

          {isRecording && (
            <div className="text-center space-y-4 w-full">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold text-red-500">
                {formatTime(recordingTime)}
              </div>
              <p className="text-sm text-gray-700 font-medium">
                Recording in progress...
              </p>
              <button
                onClick={stopRecording}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
              >
                Stop Recording
              </button>
            </div>
          )}

          {audioURL && !isRecording && (
            <div className="w-full space-y-4">
              <div className="flex justify-center">
                <svg
                  className="w-12 h-12 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-700 text-center font-medium">
                Recording completed ({formatTime(recordingTime)})
              </p>
              <audio src={audioURL} controls className="w-full" />
              <div className="flex gap-2 justify-center">
                <button
                  onClick={deleteRecording}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={startRecording}
                  className="px-6 py-2 bg-transparent border-2 border-gray-700 text-gray-800 rounded-full transition-all duration-300 hover:bg-gray-800 hover:text-white hover:border-gray-800"
                >
                  Record Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
