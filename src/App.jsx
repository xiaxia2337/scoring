import { useRef, useEffect } from "react";
import "./App.css";
import Experience from "./Experience/Experience";
import Border from "./components/Border/Border";
import ZoomSlider from "./components/ZoomSlider/ZoomSlider";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import InfoPanel from "./components/InfoPanel/InfoPanel";
import InfoButton from "./components/Buttons/InfoButton/InfoButton";
import { useExperienceStore } from "./store/useExperienceStore";
import { useResponsiveStore } from "./store/useResponsiveStore";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function App() {
  const isInfoPanelOpen = useExperienceStore((state) => state.isInfoPanelOpen);
  const isMobile = useResponsiveStore((state) => state.isMobile);
  const tlRef = useRef(null);

  useGSAP(() => {
    if (tlRef.current) {
      tlRef.current.revert();
      tlRef.current.kill();
    }

    const commonEase = { duration: 0.7, ease: "power3.inOut" };

    tlRef.current = isMobile
      ? gsap
          .timeline({ paused: true })
          .to("#canvas-container", {
            scale: 0.4,
            borderRadius: "32px",
            transformOrigin: "center 40px",
            ...commonEase,
          })
          .to(
            ".full-page-border",
            {
              scale: 0.4,
              borderRadius: "32px",
              transformOrigin: "center 40px",
              ...commonEase,
            },
            "<",
          )
          .to(
            ".zoom-slider-wrapper",
            {
              opacity: 0,
              pointerEvents: "none",
              duration: 0.3,
            },
            "<",
          )
      : gsap
          .timeline({ paused: true })
          .to("#canvas-container", {
            scale: 0.6,
            borderRadius: "32px",
            transformOrigin: "20px center",
            ...commonEase,
          })
          .to(
            ".full-page-border",
            {
              scale: 0.6,
              borderRadius: "32px",
              transformOrigin: "20px center",
              ...commonEase,
            },
            "<",
          )
          .to(
            ".zoom-slider-wrapper",
            {
              scale: 0.6,
              opacity: 0,
              pointerEvents: "none",
              duration: 0.3,
            },
            "<",
          );

    // if panel was already open when timeline rebuilt, jump to end
    if (isInfoPanelOpen) tlRef.current.progress(1);
  }, [isMobile]);

  useEffect(() => {
    if (!tlRef.current) return;
    isInfoPanelOpen ? tlRef.current.play() : tlRef.current.reverse();
  }, [isInfoPanelOpen]);

  return (
    <>
      <LoadingScreen />
      <InfoPanel />
      <InfoButton />
      <ZoomSlider />
      <Border />
      <Experience />
    </>
  );
}

export default App;
