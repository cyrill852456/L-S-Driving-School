// import React, { useState } from 'react';
// import { Loader2 } from 'lucide-react';

// const PowerPointViewer = ({ fileUrl }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Microsoft Office Online Viewer URL
//   const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;

//   const handleIframeLoad = () => {
//     setIsLoading(false);
//   };

//   const handleIframeError = () => {
//     setError('Failed to load the PowerPoint file. Please make sure the file is accessible.');
//     setIsLoading(false);
//   };

//   return (
//     <div className="w-full h-full min-h-[600px] relative">
//       {isLoading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
//         </div>
//       )}
      
//       {error && (
//         <div className="absolute inset-0 flex items-center justify-center bg-red-50 text-red-600 p-4">
//           {error}
//         </div>
//       )}

//       <iframe
//         src={viewerUrl}
//         className="w-full h-full border-0"
//         onLoad={handleIframeLoad}
//         onError={handleIframeError}
//         title="PowerPoint Viewer"
//       />
//     </div>
//   );
// };

// const PowerPointSection = () => {
//   return (
//     <div className="w-full h-screen p-4">
//       <h2 className="text-2xl font-bold mb-4">PowerPoint Presentation</h2>
//       <PowerPointViewer 
//         fileUrl="https://drive.google.com/drive/folders/18qELWrY-CR-7PHjhr8oZ1ljudRpubxLW" 
//       />
//     </div>
//   );
// };

// export default PowerPointSection;
import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
function PowerPointSection() {
  return (
    <div className='flex flex-col items-start'>
      PowerPointSection
      <Link to='/authstudent/tdc-examination'>
      <Button to="">Done</Button>
      </Link>
    </div>
  )
}

export default PowerPointSection