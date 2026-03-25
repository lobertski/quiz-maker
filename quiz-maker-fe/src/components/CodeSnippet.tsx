import { Box, Typography } from "@mui/material";

interface CodeSnippetProps {
  code: string;
  language?: string;
}

export default function CodeSnippet({ code }: CodeSnippetProps) {
  return (
    <Box
      sx={{
        backgroundColor: "grey.900",
        color: "grey.100",
        borderRadius: 1.5,
        p: 2,
        my: 1.5,
        overflow: "auto",
      }}
    >
      <Typography
        component="pre"
        sx={{
          fontFamily: "monospace",
          fontSize: "0.85rem",
          m: 0,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {code}
      </Typography>
    </Box>
  );
}
