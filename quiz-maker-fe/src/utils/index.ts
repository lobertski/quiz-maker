import type { QuizFormData } from "@/types";

export const defaultQuizFormData: QuizFormData = {
  quizTitle: "",
  quizDescription: "",
  questions: [
    {
      type: "mcq",
      prompt: "",
      codeSnippet: "",
      options: ["", ""],
      correctAnswerIndex: null,
      correctAnswerText: "",
    },
  ],
};

export const validateQuizForm = (formData: QuizFormData): string | null => {
  const { quizTitle, quizDescription, questions } = formData;

  if (!quizTitle.trim()) return "Quiz title is required.";
  if (!quizDescription.trim()) return "Quiz description is required.";
  if (questions.length === 0) return "Add at least one question.";

  let error: string | null = null;

  questions.forEach((q, i) => {
    if (error) return;

    if (!q.prompt.trim()) {
      error = `Question ${i + 1}: prompt is required.`;
      return;
    }

    if (q.type === "mcq") {
      if (q.options.length < 2) {
        error = `Question ${i + 1}: at least 2 choices required.`;
        return;
      }
      if (q.options.some((o) => !o.trim())) {
        error = `Question ${i + 1}: all choices must have text.`;
        return;
      }
      if (q.correctAnswerIndex === null) {
        error = `Question ${i + 1}: select a correct answer.`;
        return;
      }
    } else {
      if (!q.correctAnswerText.trim()) {
        error = `Question ${i + 1}: correct answer is required.`;
        return;
      }
    }
  });

  return error;
};
