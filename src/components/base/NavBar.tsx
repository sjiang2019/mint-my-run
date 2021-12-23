import { StyleSheet, css } from "aphrodite";
import React from "react";
import { HashLink as Link } from "react-router-hash-link";

import { Button } from "./Button";
import { NAVY_BLUE, OFF_WHITE } from "../../constants/styles";
import {
  ABOUT_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  QUESTIONS_PAGE_ROUTE,
} from "../../constants/constants";

export function NavBar(): JSX.Element {
  return (
    <div className={css(styles.container)}>
      <Link to={HOME_PAGE_ROUTE} style={{ textDecoration: "none" }}>
        <Button variant="text" className={css(styles.button)}>
          Home
        </Button>
      </Link>
      <Link to={ABOUT_PAGE_ROUTE} style={{ textDecoration: "none" }}>
        <Button variant="text" className={css(styles.button)}>
          About
        </Button>
      </Link>
      <Link to={QUESTIONS_PAGE_ROUTE} style={{ textDecoration: "none" }}>
        <Button variant="text" className={css(styles.button)}>
          FAQ
        </Button>
      </Link>
      <Button
        variant="text"
        className={css(styles.button)}
        onClick={() => {
          window.open("https://etherscan.com", "_blank");
        }}
      >
        Contract
      </Button>
      <Button
        variant="text"
        className={css(styles.button)}
        onClick={() => {
          window.open("https://twitter.com", "_blank");
        }}
      >
        Twitter
      </Button>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: NAVY_BLUE,
  },
  button: {
    color: OFF_WHITE,
  },
});
