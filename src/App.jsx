import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import FileDisplay from "./components/FileDisplay";
import Information from "./components/Information";
import Transcribe from "./components/Transcribe";

const App = () => {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const isAudioAvailable = file || audioStream;

  const handleAudioReset = () => {
    setFile(null);
    setAudioStream(null);
  }

  const worker = useRef(null);

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
        {output ? <Information /> : loading ? <Transcribe downloading={loading} /> : isAudioAvailable ? <FileDisplay handleAudioReset={handleAudioReset} file={file} audioStream={audioStream} /> : <HomePage setFile={setFile} setAudioStream={setAudioStream} />}
      </section>
      <footer></footer>
    </div>
  );
};

export default App;
