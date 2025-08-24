# Simple Video Player Demo
This project is a minimalist web application built with React that demonstrates a foundational understanding of modern web development and cloud-based media delivery. The application fetches and plays a video file served from Amazon Web Services (AWS), showcasing a practical example of a full-stack media pipeline.
---

## Core Technologies
- **Frontend:** React

- **Video Hosting:** Amazon S3

- **Content Delivery Network (CDN):** Amazon CloudFront

- **ABR Streaming** HLS, DASH, CMAF
---

## Key Features
- **Responsive UI**: The React frontend provides a simple, clean, and responsive user interface for playing the video.

- **Cloud-Based Hosting**: The video file is stored securely in an AWS S3 bucket. This is a common practice for scalable and cost-effective media storage.

- **Global Content Delivery:** AWS CloudFront is used as a CDN to cache the video at edge locations around the world.  This ensures that the video loads quickly for users regardless of their geographic location, reducing latency and improving the overall user experience.
---

## How It Works
A user visits the web application.

The React frontend makes a request to the CloudFront distribution URL to fetch the video file.

CloudFront either serves the video from its cache (if it's a popular file) or retrieves it from the S3 origin bucket.

The video is then delivered to the user with low latency and high transfer speeds, ready to be played in the browser.
---

## Getting Started
### Prerequisites

- Node.js

- npm

- Installation

- Clone the repository:
```bash
git clone https://github.com/josel82/video-player-demo.git
```

- Navigate to the project directory:
```bash
cd video-player-demo
```

- Install dependencies:
```bash
npm install
```

- Run the application in development mode:
```bash
npm run dev 
```

The application will be accessible at http://localhost:5173/

Note: For this application to work, you must update the video source URL in the React component to point to your specific AWS CloudFront distribution link.


## Video delivery
This should can be stored in an Amazon S3 bucket and accessed through CloudFront. This set up is outside of the scope of this repository.

## Video Encoding
I have used `ffmpeg` for video encoding. The following command would encode a `.mp4` video file into `CMAF` and create `.m3u8` and `.mpd` manifests 

```bash
ffmpeg -i ~/Movies/myVideo.mp4 \
  -c:v libx264 -c:a aac \
  -map 0:v:0 -map 0:a:0 \
  -b:v:0 4000k -s:v:0 1920x1080 -b:a:0 500k \
  -map 0:v:0 -map 0:a:0 \
  -b:v:1 2000k -s:v:1 1280x720 -b:a:1 500k \
  -var_stream_map "v:0,a:0 v:1,a:1" \
  -seg_duration 4 \
  -movflags frag_keyframe+empty_moov \
  -use_template 1 \
  -use_timeline 1 \
  -f dash \
  -hls_playlist 1 \
  -hls_master_name hls_master.m3u8 \
  manifest.mpd
```