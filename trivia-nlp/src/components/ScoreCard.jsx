// src/components/ScoreCard.jsx
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function ScoreCard({ name, score }) {
  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="subtitle2">{name}</Typography>
        <Typography variant="h5">{score} pts</Typography>
      </CardContent>
    </Card>
  );
}
