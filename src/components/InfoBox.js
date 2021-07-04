import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css"

function InfoBox({ title, isRed,  active, cases, num, ...props }) {
  return (
    <Card className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--redBox"}`} onClick={props.onClick}>
      <CardContent>
        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>
        <h2 className= {`infoBox_cases ${!isRed && "text--color--green"}`}>{cases}</h2>
        <Typography className="infoBox_total" color="textSecondary">
          {num} total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
