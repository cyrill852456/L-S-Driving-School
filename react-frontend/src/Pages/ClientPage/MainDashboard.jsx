import React from 'react'
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { startExam } from '@/lib/services/TDCOnlineTraining/onlineTrainingSevice';

function MainDashboard() {
  const navigate = useNavigate();

  const handleStartExam = async () => {
    try {
      await startExam();
      navigate('/authstudent/tdc-video');
    } catch (error) {
      // Handle any errors
      console.error('Failed to start exam:', error);
    }
  };
  return (
    <div className="mt-[15rem] flex items-center ">
    <div className="max-w-2xl text-left p-10  ">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Welcome to TDC Online Exam!
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Congratulations on taking the first step toward achieving your goals with TDC! We’re thrilled to have you on board. Get ready to begin your online exam and showcase your skills.
      </p>
      <Button
          size="lg"
          className="text-lg py-4 px-8"
          onClick={handleStartExam}
        >
          Get Started
        </Button>
    </div>
  </div>
  )
}

export default MainDashboard