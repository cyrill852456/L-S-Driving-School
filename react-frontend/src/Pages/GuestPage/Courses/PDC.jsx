import React,{useState,useEffect} from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Calendar, Shield, Award, Star, Users, Map, Settings, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PDCCourse } from '@/lib/services/Courses';
const PDC = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await PDCCourse();
        setCourses(response.courses); 
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };
  
    fetchCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-xl">Loading courses...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-red-500">
        <p className="text-xl">Error: {error}</p>
      </div>
    );
  }

  const features = [
    { 
      icon: Car, 
      title: "Modern Fleet", 
      description: "Learn on well-maintained, latest model vehicles" 
    },
    { 
      icon: Shield, 
      title: "Safety First", 
      description: "Dual control cars with experienced instructors" 
    },
    { 
      icon: Map, 
      title: "Route Variety", 
      description: "Practice on different road types and conditions" 
    },
    { 
      icon: Settings, 
      title: "Skill Building", 
      description: "Progressive learning from basics to advanced" 
    }
  ];

  const courseLevels = [
    {
      features: [
        "Basic vehicle control",
        "Parking fundamentals",
        "Simple road navigation",
        "Traffic signal practice",
        "Basic safety protocols"
      ]
    },
    {
      features: [
        "Advanced vehicle control",
        "Complex parking maneuvers",
        "Highway driving",
        "Night driving sessions",
        "Defensive driving techniques",
        "Traffic navigation"
      ]
    },
    {
      features: [
        "Expert vehicle handling",
        "All weather conditions",
        "Advanced defensive driving",
        "Emergency maneuvers",
        "Complex traffic scenarios",
        "Test preparation",
        "Mock driving tests"
      ]
    }
  ];



  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star 
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Practical Driving Course</h1>
          <p className="text-xl mb-8">Master real-world driving with professional instructors</p>
          <div className="flex flex-wrap gap-4">
            <Badge variant="secondary" className="text-lg">
              <Users className="w-4 h-4 mr-2" />
              Expert Instructors
            </Badge>
            <Badge variant="secondary" className="text-lg">
              <Award className="w-4 h-4 mr-2" />
              95% First-Time Pass Rate
            </Badge>
            <Badge variant="secondary" className="text-lg">
              <Calendar className="w-4 h-4 mr-2" />
              Flexible Scheduling
            </Badge>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Program</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6">
              <feature.icon className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Course Levels Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Course Levels</h2>
          {courses && courses.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((pkg, index) =>
                   <Card  key={index} className="flex flex-col">
                   <CardHeader>
                     <CardTitle className="text-2xl font-bold">{pkg.title}</CardTitle>
                     <CardDescription>
                       <span className="text-3xl font-bold text-green-600">₱ {pkg.price}</span>
                       <br />
                       <span className="text-lg">8 Hours of Training</span>
                     </CardDescription>
                   </CardHeader>
                   <CardContent>
                   <ul className="space-y-3">
                {courseLevels[index]?.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
                   </CardContent>
                 </Card>
              )}
            
         
           </div>
          ): (
            <div className="text-center text-gray-500">
              <p>No courses available</p>
            </div>
          )}
         
        </div>
      </section>

   

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Driving?</h2>
          <p className="text-xl mb-8">Book your first lesson today and begin your journey to becoming a confident driver</p>
          <div className="flex justify-center gap-4">
            <Link to='/pdc-booking-enrollment-proccess'>
            <Badge variant="secondary" className="text-lg cursor-pointer hover:bg-white hover:text-green-600">
              Schedule Lesson
            </Badge>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PDC;