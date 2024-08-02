"use client";

import { memo, useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";

export const ScrollTo = memo(function ScrollTo() {
  const [enableUp, setEnableUp] = useState(false);

  const handleScroll = () => {
    if (
      document.body.scrollTop > window.innerHeight ||
      document.documentElement.scrollTop > window.innerHeight
    ) {
      setEnableUp(true);
    } else {
      setEnableUp(false);
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

  return (
    <div className="fixed flex flex-col gap-2 bottom-20 right-10">
      {enableUp && (
        <Button color="gray" onClick={backToTop} size="lg" className="dark:bg-gray-900">
          <div className="flex gap-2 items-center">
            <FaAngleDoubleUp />
          </div>
        </Button>
      )}
      {true && (
        <Button color="gray" onClick={goToBottom} size="lg" className="dark:bg-gray-900">
          <div className="flex gap-2 items-center">
            <FaAngleDoubleDown />
          </div>
        </Button>
      )}
    </div>
  );
});
