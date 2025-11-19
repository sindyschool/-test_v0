import React from 'react';
import { Question } from '../types';
import { LIKERT_SCALE } from '../constants';

interface QuestionCardProps {
  question: Question;
  onAnswer: (score: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-rose-100 animate-fade-in">
      <h3 className="text-lg text-rose-400 font-bold mb-2 tracking-wide uppercase text-xs">
        {question.category}
      </h3>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-8 leading-relaxed">
        {question.text}
      </h2>

      <div className="space-y-3">
        {LIKERT_SCALE.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-rose-400 hover:bg-rose-50 transition-all duration-200 group text-left"
          >
            <span className="font-medium text-gray-600 group-hover:text-rose-700">
              {option.label}
            </span>
            <div className={`
              w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center
              group-hover:border-rose-500 group-hover:bg-rose-500
            `}>
              <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
