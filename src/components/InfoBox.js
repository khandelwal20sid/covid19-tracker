import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css"

function InfoBox({ title, cases, num, ...props }) {
  return (
    <Card className="infoBox" onClick={props.onClick}>
      <CardContent>
        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="infoBox_cases">{cases}</h2>
        <Typography className="infoBox_total" color="textSecondary">
          {num} total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
