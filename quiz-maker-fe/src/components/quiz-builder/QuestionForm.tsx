import ActionCard from "@/components/ActionCard";
import type { DraftQuestion, DraftQuestionType } from "@/types";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

interface QuestionFormProps {
  questions: DraftQuestion[];
  onChange: (questions: DraftQuestion[]) => void;
}

const typeLabels: Record<DraftQuestionType, string> = {
  short: "Short Answer",
  mcq: "Multiple Choice",
};

export default function QuestionForm({
  questions,
  onChange,
}: QuestionFormProps) {
  const updateQuestion = (index: number, updates: Partial<DraftQuestion>) => {
    const updated = questions.map((question, i) =>
      i === index ? { ...question, ...updates } : question,
    );
    onChange(updated);
  };

  const removeQuestion = (index: number) => {
    onChange(questions.filter((_, i) => i !== index));
  };

  const addChoice = (index: number) => {
    const q = questions[index];
    updateQuestion(index, { options: [...q.options, ""] });
  };

  const updateChoice = (qIndex: number, cIndex: number, value: string) => {
    const question = questions[qIndex];
    const options = question.options.map((o, i) => (i === cIndex ? value : o));
    updateQuestion(qIndex, { options });
  };

  const setCorrectChoice = (qIndex: number, cIndex: number) => {
    updateQuestion(qIndex, { correctAnswerIndex: cIndex });
  };

  return (
    <Stack spacing={3}>
      {questions.map((question, qIndex) => (
        <ActionCard key={qIndex}>
          <Stack spacing={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Question {qIndex + 1}
              </Typography>
              {questions.length > 1 && (
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => removeQuestion(qIndex)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>

            <FormControl fullWidth size="small">
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                value={question.type}
                onChange={(e) =>
                  updateQuestion(qIndex, {
                    type: e.target.value as DraftQuestionType,
                    correctAnswerIndex: null,
                    correctAnswerText: "",
                    options: e.target.value === "mcq" ? ["", ""] : [],
                  })
                }
              >
                <MenuItem value="short">{typeLabels.short}</MenuItem>
                <MenuItem value="mcq">{typeLabels.mcq}</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Question Prompt"
              value={question.prompt}
              onChange={(e) =>
                updateQuestion(qIndex, { prompt: e.target.value })
              }
              fullWidth
              multiline
              minRows={2}
            />

            <TextField
              label="Code Snippet (optional)"
              value={question.codeSnippet}
              onChange={(e) =>
                updateQuestion(qIndex, { codeSnippet: e.target.value })
              }
              multiline
              minRows={2}
              fullWidth
              placeholder="Paste code here..."
              sx={{
                "& .MuiInputBase-input": {
                  fontFamily: "monospace",
                  fontSize: "0.85rem",
                },
              }}
            />

            {question.type === "short" && (
              <Box>
                <TextField
                  label="Correct Answer"
                  value={question.correctAnswerText}
                  onChange={(e) =>
                    updateQuestion(qIndex, {
                      correctAnswerText: e.target.value,
                    })
                  }
                  fullWidth
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Case-insensitive string match
                </Typography>
              </Box>
            )}

            {question.type === "mcq" && (
              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ mb: 1 }}
                >
                  Choices
                </Typography>
                <Stack spacing={1}>
                  {question.options.map((option, cIndex) => (
                    <Box
                      key={cIndex}
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <TextField
                        label={`Choice ${cIndex + 1}`}
                        value={option}
                        onChange={(e) =>
                          updateChoice(qIndex, cIndex, e.target.value)
                        }
                        fullWidth
                        size="small"
                      />
                      <Button
                        variant={
                          question.correctAnswerIndex === cIndex
                            ? "contained"
                            : "outlined"
                        }
                        color="success"
                        size="small"
                        onClick={() => setCorrectChoice(qIndex, cIndex)}
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        {question.correctAnswerIndex === cIndex
                          ? "Correct"
                          : "Set Correct"}
                      </Button>
                    </Box>
                  ))}
                </Stack>
                <Button
                  size="small"
                  onClick={() => addChoice(qIndex)}
                  sx={{ mt: 1 }}
                >
                  + Add Choice
                </Button>
              </Box>
            )}
          </Stack>
        </ActionCard>
      ))}
    </Stack>
  );
}
