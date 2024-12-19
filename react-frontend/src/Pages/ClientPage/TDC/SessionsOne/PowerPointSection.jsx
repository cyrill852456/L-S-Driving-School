import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Download, Play, ChevronRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import pdf1 from '@/assets/TdcDocs/Session1/introduction.pdf';
import pdf2 from '@/assets/TdcDocs/Session1/PRE-DRIVING ORIENTATION ON MOTORCYCLE AND TRICYCLE.pdf';
import pdf3 from '@/assets/TdcDocs/Session1/Road and Traffic Rules.pdf';

const pdfFiles = [
  {
    id: 1,
    title: 'Introduction To Land Transportation',
    description: 'Basic principles and fundamentals',
    url: pdf1
  },
  {
    id: 2,
    title: 'Orientation on Motorcycle and Tricycle',
    description: 'Detailed explanation of core concepts',
    url: pdf2
  },
  {
    id: 3,
    title: ' Road Traffic Rules',
    description: 'Advanced concepts and applications',
    url: pdf3
  }
];

const PowerPointSection = () => {
  const navigate = useNavigate();
  const [timerStarted, setTimerStarted] = useState(false);
  // const [timeRemaining, setTimeRemaining] = useState(5 * 60);
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [timerComplete, setTimerComplete] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(pdfFiles[0]);

  // Prevent back navigation
  useEffect(() => {
    const preventNavigation = (e) => {
      e.preventDefault();
      e.returnValue = '';
      return e.returnValue;
    };

    const preventBackButton = (e) => {
      window.history.pushState(null, '', window.location.href);
    };

    // Add event listeners
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', preventBackButton);
    window.addEventListener('beforeunload', preventNavigation);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', preventBackButton);
      window.removeEventListener('beforeunload', preventNavigation);
    };
  }, []);

  /// Timer Effect
  useEffect(() => {
    let interval;
    if (timerStarted && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setTimerComplete(true);
    }
    return () => clearInterval(interval);
  }, [timerStarted, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = () => {
    setTimerStarted(true);
  };

  const handleDownload = (pdf, e) => {
    e.preventDefault();
    
    fetch(pdf.url)
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `${pdf.title}.pdf`;
        link.click();
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch(error => {
        console.error('Error downloading PDF:', error);
      });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold mb-6">Course Materials</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Tabs defaultValue="pdf-1" className="w-full">
            <TabsList className="w-full">
              {pdfFiles.map((pdf) => (
                <TabsTrigger 
                  key={pdf.id} 
                  value={`pdf-${pdf.id}`}
                  onClick={() => setSelectedPdf(pdf)}
                  className="flex-1"
                >
                  {pdf.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {pdfFiles.map((pdf) => (
              <TabsContent key={pdf.id} value={`pdf-${pdf.id}`}>
                <Card>
                  <CardHeader>
                    <CardTitle>{pdf.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{pdf.description}</p>
                    <Button 
                      className="w-full flex items-center justify-center gap-2"
                      onClick={(e) => handleDownload(pdf, e)}
                    >
                      <Download size={16} />
                      Download {pdf.title}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Required Reading Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{formatTime(timeRemaining)}</div>
                <p className="text-gray-500 text-sm">Time Remaining</p>
              </div>

              {!timerStarted ? (
                <Button 
                  onClick={handleStartTimer}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Play size={16} />
                  Start Timer
                </Button>
              ) : (
                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertDescription>
                    Please review all materials carefully
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              {timerComplete ? (
                <Link to="/authstudent/tdc-examination" className="w-full block">
                  <Button className="w-full flex items-center justify-center gap-2">
                    Proceed to Exam
                    <ChevronRight size={16} />
                  </Button>
                </Link>
              ) : (
                <div className="text-sm text-center text-gray-500">
                  Complete the required reading time to proceed to the exam
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PowerPointSection;