import {
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import CodeSnippet from "@/components/CodeSnippet";
import type { Question } from "@/types";

interface QuizQuestionProps {
  question: Question;
  answer: string;
  onAnswerChange: (value: string) => void;
  onPaste?: () => void;
}

export default function QuizQuestion({
  question,
  answer,
  onAnswerChange,
  onPaste,
}: QuizQuestionProps) {
  return (
    <Card sx={{ mb: 3, border: 1, borderColor: "grey.200", boxShadow: "none" }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {question.prompt}
        </Typography>

        {question.codeSnippet && <CodeSnippet code={question.codeSnippet} />}

        {question.type === "mcq" && question.options && (
          <RadioGroup
            value={answer}
            onChange={(e) => onAnswerChange(e.target.value)}
          >
            {question.options.map((option, i) => (
              <FormControlLabel
                key={i}
                value={String(i)}
                control={<Radio />}
                label={option}
                sx={{
                  border: "1px solid",
                  borderColor:
                    answer === String(i) ? "primary.main" : "grey.200",
                  borderRadius: 1.5,
                  mx: 0,
                  mb: 1,
                  px: 1.5,
                  py: 0.5,
                  transition: "border-color 0.2s",
                  "&:hover": { borderColor: "primary.light" },
                }}
              />
            ))}
          </RadioGroup>
        )}

        {question.type === "short" && (
          <TextField
            label="Your Answer"
            value={answer}
            onChange={(e) => onAnswerChange(e.target.value)}
            onPaste={onPaste}
            fullWidth
            multiline
            minRows={2}
          />
        )}
      </CardContent>
    </Card>
  );
}
