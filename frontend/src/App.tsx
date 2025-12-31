import { useGSAP } from "@gsap/react";
import "./styles/App.css";
import SectionWrapper from "./utils/SectionWrapper";
import FAQSection from "./views/FAQSection";
import FirstBodySection from "./views/FirstBodySection";
import FooterSection from "./views/FooterSection";
import HeroSection from "./views/HeroSection";
import PricingSection from "./views/PricingSection";
import SecondBodySection from "./views/SecondBodySection";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

function App() {
  const mainRef = useRef(null);
  const smootherRef = useRef(null);

  useGSAP(
    () => {
      ScrollSmoother.create({
        wrapper: mainRef.current,
        content: smootherRef.current,
        smooth: 2,
        effects: true,
      });
    },
    { scope: mainRef }
  );

  return (
    <div id="smooth-wrapper" ref={mainRef}>
      <div id="smooth-content" ref={smootherRef}>
        {/* all the views */}
        <SectionWrapper>
          <HeroSection></HeroSection>
          <FirstBodySection></FirstBodySection>
          <SecondBodySection></SecondBodySection>
          <PricingSection></PricingSection>
          <FAQSection></FAQSection>
          <FooterSection></FooterSection>
        </SectionWrapper>
      </div>
    </div>
  );
}

export default App;
