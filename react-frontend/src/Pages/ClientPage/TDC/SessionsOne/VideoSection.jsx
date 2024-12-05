import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Clock, BookOpen, Award, ChevronRight } from 'lucide-react';
import VideoOne from '@/assets/TdcVideos/tdcVideo.mp4'
import VideoTwo from '@/assets/TdcVideos/sample1.mp4'
import { Link } from 'react-router-dom';
// In a real app, these would be imported from your assets
const Video1 = VideoOne;
const Video2 = VideoTwo;

const videoList = [
  {
    id: 1,
    title: 'How To Be A Fake Taxi Driver',
    src: Video1,
    duration: '15 mins',
    description: 'asdassadasdsadasdsadasdasdasdasdasdasdasdasdasdasdasdasd',
    highlights: ['Component Architecture', 'React Hooks', 'State Management', 'Form Handling'],
    instructor: 'Sarah Johnson',
    rating: 4.8
  },
  {
    id: 2,
    title: 'How to be A Play Boy',
    src: Video2,
    duration: '20 mins',
    description: 'adadsasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdassd',
    highlights: ['Redux Toolkit', 'Middleware', 'Async Actions', 'State Normalization'],
    instructor: 'Michael Chen',
    rating: 4.9
  },
];

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [selectedVideo, setSelectedVideo] = React.useState(videoList[0]);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setIsPlaying(false);
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-gray-50">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Video Container */}
          <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-lg">
            <video
              src={selectedVideo.src}
              className="w-full h-full object-cover"
              controls={isPlaying}
              autoPlay={isPlaying}
            >
              Your browser does not support the video tag.
            </video>
            {!isPlaying && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-all hover:bg-black/50"
                onClick={handlePlayClick}
              >
                <div className="bg-white/10 p-6 rounded-full backdrop-blur-sm">
                  <Play size={48} className="text-white" />
                </div>
              </div>
            )}
          </div>

          {/* Description Card */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    {selectedVideo.title}
                  </CardTitle>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="flex items-center text-sm text-gray-600">
                      <Clock size={16} className="mr-1" />
                      {selectedVideo.duration}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                {selectedVideo.description}
              </p>
              
              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-3">What you'll learn:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedVideo.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <ChevronRight size={16} className="mr-2 text-blue-500" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center border-t pt-4">
              <div className="text-sm text-gray-600">
                Instructor: {selectedVideo.instructor}
              </div>
              <Link to="/authstudent/tdc-powerpoint">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                Done
              </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Video List Sidebar */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Content</h2>
          <div className="space-y-3">
            {videoList.map((video) => (
              <Card
                key={video.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedVideo.id === video.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handleVideoSelect(video)}
              >
                <CardContent className="p-4">
                  <div className="font-semibold text-gray-800 mb-2">{video.title}</div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {video.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <BookOpen size={14} className="mr-1" />
                      {video.level}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;