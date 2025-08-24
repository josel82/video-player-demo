import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-dash'; // Required for DASH support

export default function VideoPlayer() {
  const videoNode = useRef(null);
  let player = useRef(null);

  // URLs for HLS and DASH streams
  const hlsSrc = 'https://your-cloud-front-distribution-url-here/hls_master.m3u8';
  const dashSrc = 'https://your-cloud-front-distribution-url-here/manifest.mpd';

  useEffect(() => {
    if (!videoNode.current) return;

    // Initialize Video.js after DOM is ready
    const initPlayer = () => {
      player.current = videojs(videoNode.current, {
        controls: true,
        autoplay: true,
        preload: 'auto',
        fluid: true,
        sources: [
          { src: hlsSrc, type: 'application/x-mpegURL' },
          { src: dashSrc, type: 'application/dash+xml' },
        ],
      });
    };

    const raf = requestAnimationFrame(initPlayer);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(raf);
      if (player.current) {
        player.current.dispose();
      }
    };
  }, []); // empty dependency array ensures this runs once

  return (
    <div>
      <div data-vjs-player>
        <video
          ref={videoNode}
          className="video-js vjs-default-skin"
          playsInline // better iOS support
        />
      </div>
    </div>
  );
}
