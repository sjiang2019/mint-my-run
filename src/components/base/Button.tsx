import React from "react";
import { Button as MUIButton, ButtonProps } from "@mui/material";
import { NAVY_BLUE, OFF_WHITE, WHITE } from "../../constants/styles";

export function Button(props: ButtonProps): JSX.Element {
  const { style, ...rest } = props;
  const color = props.variant === "outlined" ? NAVY_BLUE : OFF_WHITE;
  const bgColor = props.variant === "outlined" ? WHITE : NAVY_BLUE;
  return (
    <MUIButton
      style={{
        textTransform: "none",
        height: "48px",
        color: color,
        borderColor: color,
        backgroundColor: bgColor,
        ...style,
      }}
      {...rest}
    />
  );
}
