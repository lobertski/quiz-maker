import ActionCard from "@/components/ActionCard";
import QuestionForm from "@/components/quiz-builder/QuestionForm";
import QuizCreatedConfirmation from "@/components/quiz-builder/QuizCreatedConfirmation";
import SaveIcon from "@mui/icons-material/Save";
import type { DraftQuestion, QuizFormData } from "@/types";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import SnackbarAlert from "@/components/SnackbarAlert";
import { useState } from "react";
import { useAddQuestion, useCreateQuiz } from "@/api/queries";
import { validateQuizForm, defaultQuizFormData } from "@/utils";

const createEmptyQuestion = (): DraftQuestion => ({
  type: "mcq",
  prompt: "",
  codeSnippet: "",
  options: ["", ""],
  correctAnswerIndex: null,
  correctAnswerText: "",
});

export default function QuizBuilder() {
  const [formData, setFormData] = useState<QuizFormData>(defaultQuizFormData);
  const [saving, setSaving] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [savedQuizId, setSavedQuizId] = useState<number | null>(null);

  const createQuiz = useCreateQuiz();
  const addQuestion = useAddQuestion();

  const addNewQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, createEmptyQuestion()],
    }));
  };

  const formatQuestionPayload = (draftQuestions: DraftQuestion[]) => {
    return draftQuestions.map((draftQuestion, index) => ({
      type: draftQuestion.type,
      prompt: draftQuestion.prompt,
      codeSnippet: draftQuestion.codeSnippet,
      ...(draftQuestion.type === "mcq" && { options: draftQuestion.options }),
      correctAnswer:
        draftQuestion.type === "mcq"
          ? (draftQuestion.correctAnswerIndex as string | number)
          : draftQuestion.correctAnswerText,
      position: index,
    }));
  };

  const handleOnChangeFormData = (updates: Partial<QuizFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSaveQuiz = async () => {
    const error = validateQuizForm(formData);
    if (error) {
      setValidationError(error);
      return;
    }
    setSaving(true);

    try {
      const saveQuizPayload = {
        title: formData.quizTitle,
        description: formData.quizDescription,
        isPublished: true, // hardcoded for now,
      };
      const { id: quizId } = await createQuiz.mutateAsync(saveQuizPayload);

      await addQuestion.mutateAsync({
        quizId,
        question: formatQuestionPayload(formData.questions),
      });
      setSavedQuizId(quizId);
    } finally {
      setSaving(false);
    }
  };

  if (savedQuizId !== null) {
    return <QuizCreatedConfirmation quizId={savedQuizId} />;
  }

  return (
    <Stack spacing={3} sx={{ mx: "auto", px: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create a Quiz
      </Typography>
      <ActionCard>
        <Stack spacing={2}>
          <TextField
            required
            label="Quiz Title"
            value={formData.quizTitle}
            onChange={(e) =>
              handleOnChangeFormData({ quizTitle: e.target.value })
            }
            fullWidth
          />
          <TextField
            required
            label="Description"
            value={formData.quizDescription}
            onChange={(e) =>
              handleOnChangeFormData({ quizDescription: e.target.value })
            }
            fullWidth
            multiline
            minRows={2}
          />
        </Stack>
      </ActionCard>

      <Typography variant="h6">Questions</Typography>

      <QuestionForm
        questions={formData.questions}
        onChange={(questions) => handleOnChangeFormData({ questions })}
      />

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addNewQuestion}
        >
          Add Question
        </Button>
        <Button
          variant="contained"
          onClick={handleSaveQuiz}
          disabled={saving}
          startIcon={
            saving ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <SaveIcon />
            )
          }
        >
          {saving ? "Saving..." : "Save Quiz"}
        </Button>
      </Stack>

      <SnackbarAlert
        message={validationError}
        onClose={() => setValidationError(null)}
        severity="warning"
      />
    </Stack>
  );
}
