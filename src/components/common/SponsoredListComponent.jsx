import React from "react";
import { Typography, Box } from "@mui/material";
import { SponsoredCard } from 'components/common/SponsoredCard';

const InfoListComponent = ({ label, value, minWidth = "80px", marginLeft = "50px" }) => {
  return (
    <Box sx={{ display: "flex", marginBottom: "5px" }}>
      <Typography sx={{ fontWeight: "bold", color: "gray", minWidth }}>
        {label}:
      </Typography>
      <Typography sx={{ marginLeft }}>
        {value}
      </Typography>
    </Box>
  );
};

export const SponsoredListComponent = ({ projects }) => {
  return (
    <div className="projects-list">
      {projects && projects.map((project, index) => (
        <SponsoredCard key={index} project={project} />
      ))}
    </div>
  );
};

