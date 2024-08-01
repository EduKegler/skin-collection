"use client";
import { memo, useEffect, useMemo, useState } from "react";
import { Button } from "flowbite-react";

type IDirection = "Up" | "Down";

export const ScrollTo = memo(function ScrollTo() {
  const [direction, setDirection] = useState<IDirection>("Down");

  const handleScroll = () => {
    if (
      document.body.scrollTop > window.innerHeight ||
      document.documentElement.scrollTop > window.innerHeight
    ) {
      setDirection("Up");
    } else {
      setDirection("Down");
    }
  };

  const backToTop = () => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const goToBottom = () => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.scrollTop = document.body.scrollHeight;
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isDown = useMemo(() => direction === "Down", [direction]);

  return (
    <div className="fixed bottom-10 right-10">
      <Button color="light" onClick={direction === "Down" ? goToBottom : backToTop}>
        {isDown ? "Go to bottom" : "Back to the top"}
      </Button>
    </div>
  );
});
