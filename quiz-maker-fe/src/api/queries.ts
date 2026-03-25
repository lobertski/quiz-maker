import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "./client";
import type {
  Attempt,
  CreateQuestionPayload,
  CreateQuizPayload,
  Question,
  Quiz,
  SubmitResult,
} from "@/types";

export const useQuizzes = () =>
  useQuery({
    queryKey: ["quizzes"],
    queryFn: () => apiClient.get<Quiz[]>("/quizzes"),
  });

export const useQuiz = (quizId: number | undefined) =>
  useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () =>
      apiClient.get<Quiz & { questions: Question[] }>(`/quizzes/${quizId}`),
    enabled: quizId !== undefined,
  });

export const useCreateQuiz = () =>
  useMutation({
    mutationFn: (payload: CreateQuizPayload) =>
      apiClient.post<Quiz>("/quizzes", payload),
  });

export const useUpdateQuiz = () =>
  useMutation({
    mutationFn: ({
      quizId,
      data,
    }: {
      quizId: number;
      data: Partial<CreateQuizPayload & { isPublished: boolean }>;
    }) => apiClient.patch<Quiz>(`/quizzes/${quizId}`, data),
  });

export const useAddQuestion = () =>
  useMutation({
    mutationFn: ({
      quizId,
      question,
    }: {
      quizId: number;
      question: CreateQuestionPayload[];
    }) => apiClient.post<Question>(`/quizzes/${quizId}/questions`, question),
  });

export const useCreateAttempt = () =>
  useMutation({
    mutationFn: (quizId: number) =>
      apiClient.post<Attempt>("/attempts", { quizId }),
  });

export const useSubmitAnswer = () =>
  useMutation({
    mutationFn: ({
      attemptId,
      answers,
    }: {
      attemptId: number;
      answers: Array<{ questionId: number; value: string }>;
    }) =>
      apiClient.post<{ ok: true }>(`/attempts/${attemptId}/answer`, answers),
  });

export const useSubmitAttempt = () =>
  useMutation({
    mutationFn: (attemptId: number) =>
      apiClient.post<SubmitResult>(`/attempts/${attemptId}/submit`, {}),
  });

export const usePostAntiCheatEvent = () =>
  useMutation({
    mutationFn: ({ attemptId, event }: { attemptId: number; event: string }) =>
      apiClient.post<{ ok: true }>(`/attempts/${attemptId}/events`, { event }),
  });
