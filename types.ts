export enum Category {
  COMMUNICATION = "의사소통",
  CONFLICT = "갈등 해결",
  INTIMACY = "정서/신체적 친밀감",
  VALUES = "가치관 및 공유 활동",
  FINANCE = "경제 및 생활 관리",
}

export interface Question {
  id: number;
  text: string;
  category: Category;
}

export interface Answer {
  questionId: number;
  score: number; // 1 to 5
  category: Category;
}

export interface CategoryScore {
  category: Category;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface AnalysisResult {
  summary: string;
  strengths: string[];
  improvements: string[];
  actionPlan: string;
}
