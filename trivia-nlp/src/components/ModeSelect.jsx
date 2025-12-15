// src/components/ModeSelect.jsx
import React from "react";
import { Grid, Card, CardActionArea, CardContent, Typography, Box } from "@mui/material";

const ModeCard = ({ title, color, iconSvg, description }) => (
  <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
    <CardActionArea sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Box dangerouslySetInnerHTML={{ __html: iconSvg }} />
          <Typography variant="h6" color={color}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" mt={1}>
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default function ModeSelect() {
  const userIcon = `<!-- user svg --> <svg width="36" height="36" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M10.5 2.5a3 3 0 0 1 3 3v2a3 3 0 1 1-6 0v-2a3 3 0 0 1 3-3m7 14v-.728c0-3.187-3.686-5.272-7-5.272s-7 2.085-7 5.272v.728a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1"/></svg>`;
  const usersIcon = `<!-- users svg --> <svg width="36" height="36" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 2.5a3 3 0 0 1 3 3v2a3 3 0 1 1-6 0v-2a3 3 0 0 1 3-3m7 14v-.728c0-3.187-3.686-5.272-7-5.272s-7 2.085-7 5.272v.728a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1"/></g></svg>`;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <ModeCard
          title="1 Jugador"
          color="#90063A"
          iconSvg={userIcon}
          description="Modo individual. Responde hasta fallar."
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <ModeCard
          title="2 Jugadores"
          color="#0B6EF1"
          iconSvg={usersIcon}
          description="Modo por turnos. Eliminación individual."
        />
      </Grid>
    </Grid>
  );
}
