import React, { useState, useEffect, useRef } from "react";

const HomePage = (props) => {
    const { setFile, setAudioStream } = props;

    const [recordingStatus, setRecordingStatus] = useState('inactive');
    const [audioChunks, setAudioChunks] = useState([]);
    const [duration, setDuration] = useState(0);

    const mediaRecorder = useRef(null);

    const mineType = "audio/webm";

    const startRecording = async () => {
        let tempStream;
        console.log("Start recording");

        try {
            const streamData = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            tempStream = streamData;
        } catch (error) {
            console.log(error.message);
            return;
        }
        setRecordingStatus('recording');

        const media = new MediaRecorder(tempStream, { type: mineType });
        mediaRecorder.current = media;

        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (e) => {
            if (typeof e.data === "undefined") { return; }
            if (e.data.size === 0) { return; }
            localAudioChunks.push(e.data);
        }
        setAudioChunks(localAudioChunks);
    }

    const stopRecording = async () => {
        setRecordingStatus('inactive');
        console.log("Stop recording");

        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mineType });
            // const audioUrl = URL.createObjectURL(audioBlob);
            // setAudioStream(audioUrl);
            setAudioStream(audioBlob);
            setAudioChunks([]);
            setDuration(0);
        }
    }

    useEffect(() => {
        if (recordingStatus === 'inactive') { return }

        const interval = setInterval(() => {
            setDuration(curr => curr + 1);
        }, 1000);
        return () => clearInterval(interval);
    });

  return (
    <main className="flex-1 p-4 flex flex-col justify-center gap-3 sm:gap-4 text-center pb-20">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Free<span className="text-blue-400 bold">Scribe</span>
      </h1>
      <h3 className="font-medium md:text-lg">
        Record <span className="text-blue-400">&rarr;</span> Transcribe{" "}
        <span className="text-blue-400">&rarr;</span> Translate
      </h3>
      <button className="flex items-center justify-between gap-4 mx-auto text-base w-72 max-w-full my-4 specialBtn px-4 py-2 rounded-xl" onClick={recordingStatus === 'inactive' ? startRecording : stopRecording}>
        <p className="text-blue-400">{recordingStatus === "inactive" ? "Record" : `Stop recording`}</p>
        <div className="flex items-center gap-2">
            {duration && <p className="text-sm">{duration}s</p>}
            <i className={"fa-solid fa-microphone duration-200" + (recordingStatus === 'recording' ? "text-rose-300" : "")}></i>
        </div>
      </button>
      <p className="text-base">
        Or{" "}
        <label
          htmlFor="audio-upload"
          className="text-blue-400 cursor-pointer hover:text-blue-600 duration-200"
        >
          upload{" "}
          <input
            id="audio-upload"
            onChange={(e) => {
              const tempFile = e.target.files[0];
              if (tempFile) {
                setFile(tempFile);
                console.log("File uploaded:", tempFile);
              }
            }}
            className="hidden"
            type="file"
            accept=".mp3,.wave"
          />
        </label>{" "}
        an audio (.mp3 or .wave) file
      </p>
      <p className="italic text-slate-400">Free Now, Free Forever!</p>
    </main>
  );
};

export default HomePage;
