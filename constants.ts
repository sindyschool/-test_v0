import { Category, Question } from './types';

export const QUESTIONS: Question[] = [
  // Communication
  { id: 1, category: Category.COMMUNICATION, text: "배우자는 내가 말할 때 진심으로 경청한다고 느낀다." },
  { id: 2, category: Category.COMMUNICATION, text: "우리는 하루 일과나 감정에 대해 자주 대화를 나눈다." },
  { id: 3, category: Category.COMMUNICATION, text: "배우자에게 내 솔직한 감정을 표현하는 것이 어렵지 않다." },

  // Conflict Resolution
  { id: 4, category: Category.CONFLICT, text: "우리는 다툼이 있어도 비교적 원만하게 화해한다." },
  { id: 5, category: Category.CONFLICT, text: "갈등 상황에서 배우자는 나를 비난하거나 공격하지 않는다." },
  { id: 6, category: Category.CONFLICT, text: "우리는 과거의 잘못을 계속 들추어내지 않고 현재 문제에 집중한다." },

  // Intimacy
  { id: 7, category: Category.INTIMACY, text: "배우자와의 스킨십이나 애정 표현에 만족한다." },
  { id: 8, category: Category.INTIMACY, text: "배우자는 나의 가장 친한 친구라고 느껴진다." },
  { id: 9, category: Category.INTIMACY, text: "우리는 서로에게 사랑받고 있다는 확신을 준다." },

  // Values
  { id: 10, category: Category.VALUES, text: "우리는 함께 즐길 수 있는 취미나 여가 활동이 있다." },
  { id: 11, category: Category.VALUES, text: "자녀 양육이나 인생의 목표에 대해 비슷한 가치관을 가지고 있다." },
  { id: 12, category: Category.VALUES, text: "우리는 서로의 개인적인 성장과 꿈을 지지해준다." },

  // Finance & Life
  { id: 13, category: Category.FINANCE, text: "가계 재정 운영 방식에 대해 합의가 잘 되어 있다." },
  { id: 14, category: Category.FINANCE, text: "집안일 분담이 공평하게 이루어지고 있다고 생각한다." },
  { id: 15, category: Category.FINANCE, text: "경제적인 문제로 인해 심각한 스트레스를 받지 않는다." },
];

export const LIKERT_SCALE = [
  { value: 1, label: "전혀 아니다" },
  { value: 2, label: "아니다" },
  { value: 3, label: "보통이다" },
  { value: 4, label: "그렇다" },
  { value: 5, label: "매우 그렇다" },
];
