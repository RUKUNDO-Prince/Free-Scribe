import React, { useState } from "react";
import "./index.css";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import FileDisplay from "./components/FileDisplay";

const App = () => {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);

  const isAudioAvailable = file || audioStream;

  const handleAudioReset = () => {
    setFile(null);
    setAudioStream(null);
  }

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
        {isAudioAvailable ? <FileDisplay handleAudioReset={handleAudioReset} file={file} audioStream={audioStream} /> : <HomePage setFile={setFile} setAudioStream={setAudioStream} />}
      </section>
      <h1 className="text-green-400">hello</h1>
      <footer></footer>
    </div>
  );
};

export default App;
