import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMatchMedia } from "utils/hooks/useMatchMedia";

interface FullPageVideoProps {
  page: string;
}

const FullPageVideo: React.FunctionComponent<FullPageVideoProps> = ({
  page,
}) => {
  const videoElRef = useRef<HTMLVideoElement | null>(null);

  const { matching } = useMatchMedia({ mediaQuery: "(max-width: 640px)" });

  useEffect(() => {
    const videoEl = videoElRef.current;
    const srcWebM = document.getElementById("srcWebM");
    const srcMp4 = document.getElementById("srcMp4");

    if (matching) {
      srcWebM?.setAttribute("src", `/assets/videos/${page}-mobile.webm`);
      srcMp4?.setAttribute("src", `/assets/videos/${page}-mobile.mp4`);
    } else {
      srcWebM?.setAttribute("src", `/assets/videos/${page}-desktop.webm`);
      srcMp4?.setAttribute("src", `/assets/videos/${page}-desktop.mp4`);
    }

    videoEl?.load();
  }, [matching]);

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      onContextMenu={() => false}
      className="absolute left-0 top-0 w-full h-full object-cover z-[-10]"
      id="video"
      ref={videoElRef}
    >
      <source
        src={`/assets/videos/product-desktop.webm`}
        type="video/webm"
        id="srcWebM"
      />
      <source
        src={`/assets/videos/product-desktop.mp4`}
        type="video/mp4"
        id="srcMp4"
      />
    </video>
  );
};

export default FullPageVideo;
