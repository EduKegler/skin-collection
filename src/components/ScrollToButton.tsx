"use client";
import { memo, useEffect, useState } from "react";
import { Button } from "flowbite-react";

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

    // if (
    //   document.body.scrollTop < window.innerHeight - document.body.scrollHeight ||
    //   document.documentElement.scrollTop <
    //     document.documentElement.scrollHeight - window.innerHeight
    // ) {
    //   setEnableDown(true);
    // } else {
    //   setEnableDown(false);
    // }
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
    <div className="fixed flex flex-col gap-2 bottom-10 right-10">
      {enableUp && (
        <Button color="light" onClick={backToTop}>
          {"Back to the top"}
        </Button>
      )}
      {true && (
        <Button color="light" onClick={goToBottom}>
          {"Go to bottom"}
        </Button>
      )}
    </div>
  );
});
