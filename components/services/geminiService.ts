import { GoogleGenAI, Type } from "@google/genai";
import { CategoryScore, AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMarriageAnalysis = async (scores: CategoryScore[]): Promise<AnalysisResult> => {
  const scoreSummary = scores.map(s => `${s.category}: ${s.percentage}%`).join(", ");

  const prompt = `
    당신은 전문 부부 상담사입니다. 
    다음은 한 사용자의 결혼 만족도 검사 결과입니다. 
    각 항목은 100점 만점 기준입니다.
    
    결과: ${scoreSummary}

    이 데이터를 바탕으로 다음 형식의 JSON 분석 결과를 제공해 주세요.
    말투는 따뜻하고 전문적이며 공감하는 어조(한국어)로 부탁합니다.

    1. summary: 전체적인 관계에 대한 2-3문장 총평.
    2. strengths: 점수가 높은 영역에 기반한 강점 2가지.
    3. improvements: 점수가 낮은 영역에 기반한 개선점 2가지.
    4. actionPlan: 당장 실천할 수 있는 구체적인 조언 1가지.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
            actionPlan: { type: Type.STRING },
          },
        },
      },
    });

    const text = response.text;
    if (!text) {
        throw new Error("No response text");
    }
    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      summary: "현재 상세 분석을 불러올 수 없습니다. 하지만 검사 결과를 통해 서로 대화하는 시간을 가져보세요.",
      strengths: ["데이터 분석 불가"],
      improvements: ["데이터 분석 불가"],
      actionPlan: "잠시 후 다시 시도해주세요.",
    };
  }
};
