import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { quizQuestions, getRandomQuestions } from './Questions/Question';

const QuizSection = () => {
  // Use getRandomQuestions to generate a random set of questions
  const [questions] = useState(() => getRandomQuestions(30)); 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  
  const handleAnswerSelect = (answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let calculatedScore = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setShowResults(true);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (showResults) {
    return (
      <Card className="w-full max-w-5xl mx-auto mt-10 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200">
          <CardTitle className="text-center text-blue-800">Driving Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-800 mb-4">
              Your Score: {score} / {questions.length}
            </p>
            <p className="mt-4 text-lg text-gray-700">
              {score === questions.length 
                ? "Perfect Score! You're a Road Safety Expert!" 
                : score >= questions.length * 0.6 
                  ? "Good job! You have solid driving knowledge." 
                  : "You might want to review driving guidelines."}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
            onClick={handleRestartQuiz}
          >
            Restart Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQuizQuestion = questions[currentQuestion];

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h1 className='text-3xl font-bold mb-6'>Session 1 TDC Exam</h1>
      <Card className="w-full shadow-lg">
        <CardContent className="p-8">
          <p className="text-lg font-semibold mb-6 text-gray-800 break-words whitespace-pre-wrap">
            {currentQuizQuestion.question}
          </p> 
           {/* Image support */}
           {currentQuizQuestion.image && (
            <div className="mb-6 flex justify-center">
              <img 
                src={currentQuizQuestion.image} 
                alt="Quiz question visual" 
                className="max-w-full max-h-64 object-contain"
              />
            </div>
          )}
          <div className="space-y-4">
            {currentQuizQuestion.options.map((option) => (
              <Button
                key={option}
                variant={selectedAnswers[currentQuestion] === option.charAt(0) ? "default" : "outline"}
                className="w-full justify-start hover:bg-blue-100 transition-colors text-wrap break-words whitespace-pre-wrap text-left h-auto min-h-[60px]"
                onClick={() => handleAnswerSelect(option.charAt(0))}
              >
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-6">
          <Button 
            variant="outline" 
            onClick={handlePreviousQuestion} 
            disabled={currentQuestion === 0}
            className="hover:bg-gray-100"
          >
            Previous
          </Button>
          {currentQuestion === questions.length - 1 ? (
            <Button 
              onClick={handleSubmitQuiz} 
              disabled={!selectedAnswers[currentQuestion]}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Submit Quiz
            </Button>
          ) : (
            <Button 
              onClick={handleNextQuestion} 
              disabled={!selectedAnswers[currentQuestion]}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Next
            </Button>
          )}
        </CardFooter>
      </Card>
      <div className="mt-2 text-sm text-gray-500 text-center">
        Question {currentQuestion + 1} of {questions.length}
      </div>
    </div>
  );
};

export default QuizSection;