import React from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  type ButtonProps,
} from "@mui/material";

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonLabel: string;
  buttonIcon?: React.ReactNode;
  buttonColor?: ButtonProps["color"];
  onButtonClick: () => void;
  buttonDisabled?: boolean;
  children?: React.ReactNode;
}

export default function ActionCard({
  icon,
  title,
  description,
  buttonLabel,
  buttonIcon,
  buttonColor = "primary",
  onButtonClick,
  buttonDisabled = false,
  children,
}: Partial<ActionCardProps>) {
  return (
    <Card sx={{ flex: 1 }}>
      <CardContent sx={{ p: 3 }}>
        {icon}
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        {children}
        {!!buttonLabel && !!onButtonClick && (
          <Button
            variant="contained"
            color={buttonColor}
            fullWidth
            startIcon={buttonIcon}
            disabled={buttonDisabled}
            onClick={onButtonClick}
          >
            {buttonLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
