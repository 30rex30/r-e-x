import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: -1 },
      background: {
        color: "#000000",
        repeat: "no-repeat",
        size: "20%",
      },
      particles: {
        number: { value: 2000, density: { enable: true, area: 500 } },
        color: { value: "#00ff15" },
        shape: { type: "circle" },
        opacity: {
          value: { min: 0.1, max: 1 },
          animation: { enable: true, speed: 1, sync: false },
        },
        size: { value: { min: 0.5, max: 0.5 } },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          outModes: { default: "out" },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "bubble" },
        },
        modes: {
          bubble: { distance: 250, size: 0, duration: 2, opacity: 0 },
          repulse: { distance: 400, duration: 0.4 },
        },
      },
    }),
    [],
  );

  return init ? <Particles id="tsparticles" options={options} /> : null;
};

export default ParticlesBackground;
