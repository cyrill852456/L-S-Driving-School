import React from 'react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Car, CarFront, Bike } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function SelectCourse() {
  const courses = [
    {
      id: 1,
      title: "Theoretical Driving Course",
      icon: <Car className="w-12 h-12 text-[#03346E]" />,
      path: "/course-tdc",
    },
    {
      id: 2,
      title: "Practical Driving Course",
      icon: <CarFront className="w-12 h-12 text-green-600" />,
      path: "/course-pdc",
    },
    {
      id: 3,
      title: "Motorcycle Riding Course",
      icon: <Bike className="w-12 h-12 text-[#1A3636]" />,
      path: "/course-mdc",
    },
  ];

  return (
    <div className="flex justify-center items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="px-6 py-3 bg-[#E85C0D] text-white font-semibold rounded-md hover:bg-[#d05511] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
            View Courses
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>What course you want to visit?</DialogTitle>
          </DialogHeader>
          <div className="flex flex-wrap gap-4 justify-center py-4">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={course.path}
                className="no-underline flex-1 min-w-[250px]"
              >
                <Card className="h-full hover:bg-gray-100 transition-colors cursor-pointer">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-6">
                    <div className="flex justify-center items-center w-full">
                      {course.icon}
                    </div>
                    <Button className="w-full">
                      Select Course
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SelectCourse;