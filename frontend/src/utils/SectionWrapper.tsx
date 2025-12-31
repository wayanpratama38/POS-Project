import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function SectionWrapper({ children }) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray(".section-item");

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 5 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    {
      scope: containerRef,
      dependencies: [children],
    }
  );

  return (
    <div ref={containerRef}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return (
            <div className="section-item h-screen w-full relative overflow-hidden">
              {child}
            </div>
          );
        }
        return child;
      })}
    </div>
  );
}
