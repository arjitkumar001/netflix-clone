import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  handlePlay: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ handlePlay }) => {
  const [videoData, setVideoData] = useState<any | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    // Fetch video data from TMDB API
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/667538/videos?api_key=70832fbf4e20b8e11a44971719bde149'
        );

        setVideoData(response.data.results[0]);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();
  }, []);

  const handlePlayVideo = () => {
    setIsPlaying((prevState) => !prevState);
    handlePlay();
  };

  return (
    <div>
      <h1 style={{ color: 'white' }}>Video player</h1>
      {videoData && (
        <div>
          <ReactPlayer
           playing={isPlaying}
            url={`https://www.youtube.com/watch?v=${videoData.key}`}
            controls
            width="100%"
            height="auto"
          />
        
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
