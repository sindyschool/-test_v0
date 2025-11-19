import React, { useState, useMemo } from 'react';
import { QUESTIONS } from './constants';
import { Answer, CategoryScore, Category } from './types';
import { QuestionCard } from './components/QuestionCard';
import { ProgressBar } from './components/ProgressBar';
import { ResultView } from './components/ResultView';

// Group questions by category to calculate max scores properly
const questionsByCategory = QUESTIONS.reduce((acc, q) => {
  if (!acc[q.category]) acc[q.category] = [];
  acc[q.category].push(q);
  return acc;
}, {} as Record<Category, typeof QUESTIONS>);

function App() {
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleStart = () => {
    setStarted(true);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const handleAnswer = (score: number) => {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      category: currentQuestion.category,
      score: score,
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      // Add a tiny delay for better UX
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 250);
    } else {
      setShowResults(true);
    }
  };

  // Calculate scores when showing results
  const resultData = useMemo(() => {
    if (!showResults) return null;

    const scoresByCategory: Record<string, number> = {};
    
    // Sum scores
    answers.forEach(a => {
      scoresByCategory[a.category] = (scoresByCategory[a.category] || 0) + a.score;
    });

    const processedScores: CategoryScore[] = Object.keys(questionsByCategory).map(catKey => {
      const category = catKey as Category;
      const score = scoresByCategory[category] || 0;
      const questionCount = questionsByCategory[category].length;
      const maxScore = questionCount * 5;
      const percentage = Math.round((score / maxScore) * 100);

      return {
        category,
        score,
        maxScore,
        percentage
      };
    });

    const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
    const maxTotalScore = QUESTIONS.length * 5;

    return {
      scores: processedScores,
      totalScore,
      maxTotalScore
    };
  }, [showResults, answers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-slate-50 font-sans text-gray-800">
      <main className="container mx-auto px-4 py-8 sm:py-12 max-w-3xl">
        
        {/* Branding Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            <span className="text-rose-500">행복한 우리집</span> 결혼 만족도 검사
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            당신의 결혼 생활을 더 행복하게 만드는 첫 걸음
          </p>
        </div>

        {/* View Router */}
        {!started ? (
          // Landing View
          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 text-center animate-fade-in border border-white/50 backdrop-blur-sm">
            <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">
              🏠
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">우리 부부, 얼마나 행복할까요?</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              15개의 간단한 질문을 통해 결혼 만족도를 점검해 보세요.<br className="hidden sm:block" />
              인공지능이 분석한 맞춤형 조언을 무료로 제공해 드립니다.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800 mb-8 text-left">
              <strong>💡 안내사항</strong><br/>
              본 검사는 전문적인 의학적 진단이 아니며, 관계 개선을 위한 참고 자료로 활용해 주세요.
            </div>

            <button
              onClick={handleStart}
              className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white text-lg font-bold py-4 px-12 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-rose-200"
            >
              검사 시작하기
            </button>
          </div>
        ) : !showResults ? (
          // Question View
          <div className="max-w-xl mx-auto">
            <ProgressBar current={currentQuestionIndex + 1} total={QUESTIONS.length} />
            <QuestionCard
              question={QUESTIONS[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          </div>
        ) : (
          // Result View
          resultData && (
            <ResultView
              scores={resultData.scores}
              totalScore={resultData.totalScore}
              maxTotalScore={resultData.maxTotalScore}
              onRestart={handleStart}
            />
          )
        )}
      </main>
      
      <footer className="text-center text-gray-400 text-xs py-8">
        &copy; {new Date().getFullYear()} 행복한 우리집 Project. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
