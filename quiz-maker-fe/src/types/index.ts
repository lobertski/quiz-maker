export interface QuizFormData {
  quizTitle: string;
  quizDescription: string;
  questions: DraftQuestion[];
}

export type QuestionType = "mcq" | "short" | "code";

export type DraftQuestionType = Extract<QuestionType, "mcq" | "short">;

export interface Question {
  id: number;
  quizId: number;
  type: QuestionType;
  prompt: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer?: string | number;
  position: number;
}

export interface CreateQuestionPayload {
  type: QuestionType;
  prompt: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer?: string | number;
  position?: number;
}

export interface DraftQuestion {
  type: DraftQuestionType;
  prompt: string;
  codeSnippet: string;
  options: string[];
  correctAnswerIndex: number | null;
  correctAnswerText: string;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  timeLimitSeconds?: number;
  isPublished: boolean;
  createdAt: string;
  questions?: Question[];
}

export interface CreateQuizPayload {
  title: string;
  description: string;
  timeLimitSeconds?: number;
  isPublished?: boolean;
}

export interface Attempt {
  id: number;
  quizId: number;
  startedAt: string;
  submittedAt: string | null;
  answers: AttemptAnswer[];
  quiz: Quiz & { questions: Question[] };
}

export interface AttemptAnswer {
  questionId: number;
  value: string;
}

export interface SubmitResult {
  score: number;
  details: QuestionDetail[];
}

export interface QuestionDetail {
  questionId: number;
  correct: boolean;
  expected?: string;
}

export type AntiCheatEventType = "blur" | "focus" | "paste";

export interface AntiCheatEvent {
  type: AntiCheatEventType;
  timestamp: string;
}

export interface AntiCheatSummary {
  tabSwitches: number;
  pasteCount: number;
  events: AntiCheatEvent[];
}
