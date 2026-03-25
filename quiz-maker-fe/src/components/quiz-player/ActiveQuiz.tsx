import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SendIcon from "@mui/icons-material/Send";
import QuizQuestion from "./QuizQuestion";
import { useSubmitAnswer, useSubmitAttempt } from "@/api/queries";
import useAntiCheat from "@/hooks/useAntiCheat";
import type { Attempt } from "@/types";

interface ActiveQuizProps {
  attempt: Attempt;
}

export default function ActiveQuiz({ attempt }: ActiveQuizProps) {
  const navigate = useNavigate();
  const questions = attempt.quiz.questions;
  const totalQuestions = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const submitAnswer = useSubmitAnswer();
  const submitAttempt = useSubmitAttempt();
  const { events, handlePaste, getSummary } = useAntiCheat(attempt.id);

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const currentAnswer = answers[question.id] ?? "";
  const answeredCount = questions.filter(
    (q) => (answers[q.id] ?? "").trim() !== "",
  ).length;
  const allAnswered = answeredCount === totalQuestions;

  const setAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleSubmit = async () => {
    setConfirmOpen(false);
    setSubmitting(true);

    try {
      const answersToSubmit = questions
        .filter((q) => (answers[q.id] ?? "").trim() !== "")
        .map((q) => ({
          questionId: q.id,
          value: answers[q.id],
        }));

      await submitAnswer.mutateAsync({
        attemptId: attempt.id,
        answers: answersToSubmit,
      });

      const result = await submitAttempt.mutateAsync(attempt.id);
      const summary = getSummary();

      navigate(`/results/${attempt.quizId}`, {
        state: { result, quiz: attempt.quiz, antiCheat: summary },
      });
    } finally {
      setSubmitting(false);
    }
  };

  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <Box sx={{ maxWidth: 720, mx: "auto" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1 }}
      >
        <Typography variant="h5" fontWeight={700}>
          {attempt.quiz.title}
        </Typography>
        <Chip
          label={`${answeredCount} / ${totalQuestions} answered`}
          size="small"
          color={allAnswered ? "success" : "default"}
          variant="outlined"
        />
      </Stack>

      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Question {currentIndex + 1} of {totalQuestions}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Math.round(progress)}%
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ borderRadius: 4, height: 6 }}
        />
      </Box>

      <QuizQuestion
        question={question}
        answer={currentAnswer}
        onAnswerChange={setAnswer}
        onPaste={handlePaste}
      />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          startIcon={<ArrowBackIcon />}
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => i - 1)}
        >
          Previous
        </Button>

        <Stack direction="row" spacing={1.5}>
          {isLastQuestion && (
            <Button
              variant="contained"
              endIcon={
                submitting ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <SendIcon />
                )
              }
              disabled={!allAnswered || submitting}
              onClick={() => setConfirmOpen(true)}
            >
              {submitting ? "Submitting..." : "Submit Quiz"}
            </Button>
          )}
          {!isLastQuestion && (
            <Button
              endIcon={<ArrowForwardIcon />}
              variant="contained"
              onClick={() => setCurrentIndex((i) => i + 1)}
            >
              Next
            </Button>
          )}
        </Stack>
      </Stack>

      {events.length > 0 && (
        <Typography
          variant="caption"
          color="text.disabled"
          sx={{ mt: 2, display: "block" }}
        >
          Activity tracked: {events.length} event(s)
        </Typography>
      )}

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Submit Quiz?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have answered {answeredCount} of {totalQuestions} questions.
            Once submitted, you cannot change your answers.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
