"use client";

import { useState, useRef, useEffect } from "react";

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string>("");
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState<string>("");
  const [shouldAnalyze, setShouldAnalyze] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if browser supports Speech Recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setTranscript((prev) => prev + finalTranscript);
          console.log("Transcribed text:", finalTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn("Speech Recognition API not supported in this browser");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Watch transcript and shouldAnalyze - send to API when ready
  useEffect(() => {
    if (shouldAnalyze && transcript.trim()) {
      analyzeTranscript(transcript);
      setShouldAnalyze(false);
    }
  }, [transcript, shouldAnalyze]);

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
      setTranscript("");
      setShouldAnalyze(false);

      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access microphone. Please grant permission.");
    }
  };

  const analyzeTranscript = async (text: string) => {
    try {
      console.log("Sending transcript to Python API:", text);

      const response = await fetch("http://localhost:5001/api/analyze-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze transcript");
      }

      const data = await response.json();
      console.log("Analysis result from Python API:", data);

      return data;
    } catch (error) {
      console.error("Error analyzing transcript:", error);
      return null;
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      // Stop speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      // Set flag to analyze transcript once it's fully updated
      setShouldAnalyze(true);
    }
  };

  const deleteRecording = () => {
    setAudioURL("");
    setRecordingTime(0);
    setTranscript("");
    setShouldAnalyze(false);
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
