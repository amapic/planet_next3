import React, { useState, useEffect } from "react";

const useAudio = (url) => {
  const [audio, setAuido] = useState();
  const [playing, setPlaying] = useState(false);

  function toggle() {
    setPlaying(playing);
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuido(new Audio(url));
    }
  }, []);

  useEffect(() => {
    if (audio !== undefined) {
      playing ? audio.play() : audio.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (audio === undefined) {
      return;
    }
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle];
};

const Player = () => {
  const [playing, toggle] = useAudio("../a.mp3");



  useEffect(() => {
    toggle();
  });

  return (
    // <div>
    //     <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
    //     {/* <audio controls autoPlay={playing}>
    //         <source src="/sound/sound.mp3" type="audio/mpeg" />
    //     </audio> */}
    // </div>

    <></>
  );
};

export default Player;
