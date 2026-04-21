import { useEffect, useState } from "react";

export const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[200] pointer-events-none">
      <div
        className="h-full"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #e8a0bf, #d4a853, #f7e7ce)",
          boxShadow: "0 0 8px rgba(232,160,191,0.9), 0 0 2px rgba(212,168,83,0.6)",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
};
