import React, { useEffect, useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { CategoryScore, AnalysisResult } from '../types';
import { getMarriageAnalysis } from '../services/geminiService';

interface ResultViewProps {
  scores: CategoryScore[];
  totalScore: number;
  maxTotalScore: number;
  onRestart: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  scores,
  totalScore,
  maxTotalScore,
  onRestart,
}) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      const result = await getMarriageAnalysis(scores);
      setAnalysis(result);
      setLoading(false);
    };
    fetchAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPercentage = Math.round((totalScore / maxTotalScore) * 100);
  
  let grade = "";
  let gradeColor = "";
  if (totalPercentage >= 85) { grade = "매우 만족"; gradeColor = "text-emerald-500"; }
  else if (totalPercentage >= 70) { grade = "만족"; gradeColor = "text-blue-500"; }
  else if (totalPercentage >= 50) { grade = "보통"; gradeColor = "text-yellow-500"; }
  else { grade = "노력 필요"; gradeColor = "text-rose-500"; }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-12">
      {/* Header Result */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 text-center border border-rose-100">
        <p className="text-gray-500 mb-2">전체 만족도 점수</p>
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-6xl font-bold text-gray-800">{totalPercentage}</span>
          <span className="text-2xl text-gray-400">/ 100</span>
        </div>
        <div className={`text-2xl font-bold ${gradeColor} mb-2`}>{grade}</div>
        <p className="text-gray-600 text-sm">
          총점은 {totalScore}점 입니다 (만점 {maxTotalScore}점)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Chart */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 flex flex-col items-center">
          <h3 className="text-lg font-bold text-gray-700 mb-6">영역별 분석</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={scores}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis 
                    dataKey="category" 
                    tick={{ fill: '#4b5563', fontSize: 12 }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Score"
                  dataKey="percentage"
                  stroke="#f43f5e"
                  fill="#f43f5e"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 w-full space-y-2">
              {scores.map((s) => (
                  <div key={s.category} className="flex justify-between text-sm text-gray-600 border-b border-gray-50 pb-1">
                      <span>{s.category}</span>
                      <span className="font-semibold">{s.percentage}점</span>
                  </div>
              ))}
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-rose-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-300 to-purple-400"></div>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            ✨ AI 부부 상담사의 조언
          </h3>
          
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500 animate-pulse">결과를 분석하고 있습니다...</p>
            </div>
          ) : analysis ? (
            <div className="space-y-5 text-sm text-gray-700 leading-relaxed">
              <div className="bg-rose-50 p-4 rounded-xl">
                <p className="font-medium text-rose-800 mb-1">총평</p>
                <p>{analysis.summary}</p>
              </div>

              <div>
                <p className="font-bold text-emerald-600 mb-2 flex items-center">
                    <span className="mr-1">👍</span> 우리의 강점
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 bg-emerald-50/50 p-3 rounded-lg">
                  {analysis.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              <div>
                <p className="font-bold text-orange-600 mb-2 flex items-center">
                    <span className="mr-1">🔧</span> 더 노력하면 좋은 점
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 bg-orange-50/50 p-3 rounded-lg">
                  {analysis.improvements.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl">
                <p className="font-bold text-purple-700 mb-2">💡 오늘의 솔루션</p>
                <p className="text-purple-900 font-medium">{analysis.actionPlan}</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-red-400">분석을 불러오는데 실패했습니다.</div>
          )}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-700 transition shadow-lg"
        >
          다시 검사하기
        </button>
      </div>
    </div>
  );
};
