import { useLocation, useNavigate, useParams } from "react-router";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HomeIcon from "@mui/icons-material/Home";
import ReplayIcon from "@mui/icons-material/Replay";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import type { AntiCheatSummary, Question, Quiz, SubmitResult } from "@/types";

interface ResultsState {
  result: SubmitResult;
  quiz: Quiz & { questions: Question[] };
  antiCheat?: AntiCheatSummary;
}

export default function ResultsPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as ResultsState | null;

  if (!state?.result || !state?.quiz) {
    return (
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Alert severity="warning" sx={{ maxWidth: 400, mx: "auto", mb: 2 }}>
          No results found. Please take a quiz first.
        </Alert>
        <Button variant="contained" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </Box>
    );
  }

  const { result, quiz, antiCheat } = state;
  const totalQuestions = result.details.length;
  const percentage =
    totalQuestions > 0
      ? Math.round((result.score / totalQuestions) * 100)
      : 0;

  const getScoreColor = () => {
    if (percentage >= 80) return "secondary.main";
    if (percentage >= 50) return "warning.main";
    return "error.main";
  };

  const getScoreLabel = () => {
    if (percentage >= 80) return "Excellent!";
    if (percentage >= 50) return "Good effort!";
    return "Keep practicing!";
  };

  const resolveOptionText = (question: Question, value: string) => {
    if (question.type === "mcq" && question.options) {
      const idx = Number(value);
      if (!isNaN(idx) && question.options[idx]) return question.options[idx];
    }
    return value;
  };

  return (
    <Box sx={{ maxWidth: 680, mx: "auto" }}>
      {/* Score Hero */}
      <Box
        sx={{
          textAlign: "center",
          py: 5,
          mb: 4,
          bgcolor: "grey.50",
          borderRadius: 3,
          border: 1,
          borderColor: "grey.200",
        }}
      >
        <EmojiEventsIcon sx={{ fontSize: 48, color: getScoreColor(), mb: 1 }} />
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {quiz.title}
        </Typography>
        <Typography
          variant="h1"
          fontWeight={800}
          sx={{ color: getScoreColor(), lineHeight: 1 }}
        >
          {percentage}%
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
          {result.score} / {totalQuestions} correct
        </Typography>
        <Chip
          label={getScoreLabel()}
          sx={{
            mt: 2,
            fontWeight: 600,
            bgcolor: getScoreColor(),
            color: "#fff",
          }}
        />
      </Box>

      {/* Anti-Cheat Summary */}
      {antiCheat &&
        (antiCheat.tabSwitches > 0 || antiCheat.pasteCount > 0) && (
          <Stack direction="row" spacing={1.5} sx={{ mb: 3 }}>
            {antiCheat.tabSwitches > 0 && (
              <Chip
                icon={<VisibilityOffIcon />}
                label={`${antiCheat.tabSwitches} tab switch${antiCheat.tabSwitches !== 1 ? "es" : ""}`}
                color="warning"
                variant="outlined"
              />
            )}
            {antiCheat.pasteCount > 0 && (
              <Chip
                icon={<ContentPasteIcon />}
                label={`${antiCheat.pasteCount} paste${antiCheat.pasteCount !== 1 ? "s" : ""}`}
                color="warning"
                variant="outlined"
              />
            )}
          </Stack>
        )}

      {/* Question Breakdown */}
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        Question Breakdown
      </Typography>

      <Stack spacing={1.5}>
        {result.details.map((detail, i) => {
          const question = quiz.questions.find(
            (q) => q.id === detail.questionId,
          );

          return (
            <Card
              key={detail.questionId}
              sx={{
                border: 1,
                borderColor: detail.correct ? "success.light" : "error.light",
                boxShadow: "none",
                bgcolor: detail.correct
                  ? "rgba(16,185,129,0.04)"
                  : "rgba(239,68,68,0.04)",
              }}
            >
              <CardContent sx={{ py: 2, "&:last-child": { pb: 2 } }}>
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  {detail.correct ? (
                    <CheckCircleIcon color="success" sx={{ mt: 0.2 }} />
                  ) : (
                    <CancelIcon color="error" sx={{ mt: 0.2 }} />
                  )}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {i + 1}. {question?.prompt ?? `Question ${i + 1}`}
                    </Typography>
                    {!detail.correct && detail.expected !== undefined && question && (
                      <Typography
                        variant="body2"
                        color="secondary.main"
                        sx={{ mt: 0.5 }}
                      >
                        Correct answer:{" "}
                        {resolveOptionText(question, detail.expected)}
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Stack>

      {/* Actions */}
      <Stack direction="row" spacing={2} sx={{ mt: 4, mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => navigate("/")}
        >
          Home
        </Button>
        <Button
          variant="outlined"
          startIcon={<ReplayIcon />}
          onClick={() => navigate(`/play/${quizId}`)}
        >
          Retake Quiz
        </Button>
      </Stack>
    </Box>
  );
}
