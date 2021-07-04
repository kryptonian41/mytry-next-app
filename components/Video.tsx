import React, { useLayoutEffect } from "react";

const Video = ({ page }) => {
  const videoSrcHandler = ({ matches }) => {
    const video = document.getElementById("video") as HTMLVideoElement;
    const srcWebM = document.getElementById("srcWebM");
    const srcMp4 = document.getElementById("srcMp4");
    if (matches) {
      srcWebM.setAttribute("src", `/assets/videos/${page}-mobile.webm`);
      srcMp4.setAttribute("src", `/assets/videos/${page}-mobile.mp4`);
    } else {
      srcWebM.setAttribute("src", `/assets/videos/${page}-desktop.webm`);
      srcMp4.setAttribute("src", `/assets/videos/${page}-desktop.mp4`);
    }
    video.load();
  };

  useLayoutEffect(() => {
    const mediaListener = window.matchMedia("(max-width: 640px)");
    videoSrcHandler({
      matches: mediaListener.matches,
    });
    mediaListener.addEventListener("change", videoSrcHandler);

    return () => {
      mediaListener.removeEventListener("change", videoSrcHandler);
    };
  }, []);

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      onContextMenu={() => false}
      className="homePage__bgVideo"
      id="video"
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

export default Video;
