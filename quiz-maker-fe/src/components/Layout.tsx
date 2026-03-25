import { useNavigate } from "react-router";
import React from "react";
import QuizIcon from "@mui/icons-material/Quiz";

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{ bgcolor: "primary.main" }}
        >
          <Toolbar>
            <QuizIcon sx={{ mr: 1.5 }} />
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Quiz Maker
            </Typography>

            <Button color="inherit" onClick={() => navigate("/builder")}>
              Create Quiz
            </Button>
            <Button color="inherit" onClick={() => navigate("/play")}>
              Take Quiz
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            flex: 1,
            background:
              "radial-gradient(ellipse at 20% 0%, rgba(99,102,241,0.06) 0%, transparent 50%), " +
              "radial-gradient(ellipse at 80% 100%, rgba(16,185,129,0.06) 0%, transparent 50%)",
          }}
        >
          <Container maxWidth="md" sx={{ py: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </>
  );
}
