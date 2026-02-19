import { useState, useRef } from "react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";
import ParticlesBackground from "./ParticlesBackground";
import "./App.css";

// 1. Lista de músicas
const playlist = [
  { id: 0, nome: "Música 1", src: "/musica-1.mp3", capa: "/capa1.png" },
  { id: 1, nome: "Música 2", src: "/musica-2.mp3", capa: "/capa2.png" },
  { id: 2, nome: "Música 3", src: "/musica-3.mp3", capa: "/capa3.png" },
];

function App() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const currentTrack = playlist[currentTrackIndex];

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(false);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex(
      (prev) => (prev - 1 + playlist.length) % playlist.length,
    );
    setIsPlaying(false);
    setProgress(0);
  };

  const onTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    if (duration) setProgress((current / duration) * 100);
  };

  return (
    <div className="App">
      <ParticlesBackground />

      <main className="container">
        <h1 className="title">REX</h1>

        <audio
          key={currentTrack.src}
          ref={audioRef}
          src={currentTrack.src}
          onTimeUpdate={onTimeUpdate}
          onEnded={nextTrack}
        />

        {/* 2. Exibição da Capa */}
        <div className="album-art">
          <img
            src={currentTrack.capa}
            alt={currentTrack.nome}
            className={isPlaying ? "rotating" : ""}
          />
        </div>

        <div className="button-group">
          <a href="https://discord.gg/gs2YvaUXGw" className="btn discord">
            <span>[</span> Discord <span>]</span>
          </a>
          <a
            href="https://open.spotify.com/user/nlsivulj06p87q0xwof89pyns?si=677c736ada0b4106"
            className="btn spotify"
          >
            <span>[</span> Spotify <span>]</span>
          </a>
          <a
            href="https://steamcommunity.com/profiles/76561199367350481/"
            className="btn steam"
          >
            <span>[</span> Steam <span>]</span>
          </a>
        </div>

        <div className="player-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
            <div
              className="progress-dot"
              style={{ left: `${progress}%` }}
            ></div>
          </div>

          <div className="player-controls">
            <FaStepBackward className="icon" onClick={prevTrack} />
            <div onClick={togglePlay} className="play-trigger">
              {isPlaying ? (
                <FaPause className="icon play" />
              ) : (
                <FaPlay className="icon play" />
              )}
            </div>
            <FaStepForward className="icon" onClick={nextTrack} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
