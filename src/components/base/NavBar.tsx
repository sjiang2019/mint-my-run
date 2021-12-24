import { StyleSheet, css } from "aphrodite";
import React from "react";
import { HashLink as Link } from "react-router-hash-link";

import { Button } from "./Button";
import { NAVY_BLUE, OFF_WHITE } from "../../constants/styles";
import {
  ABOUT_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  MINTED_ACTIVITIES_ROUTE,
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
      <Link to={MINTED_ACTIVITIES_ROUTE} style={{ textDecoration: "none" }}>
        <Button variant="text" className={css(styles.button)}>
          My NFTs
        </Button>
      </Link>
      <Button
        variant="text"
        className={css(styles.button)}
        onClick={() => {
          window.open(
            "https://optimistic.etherscan.io/address/0xC7adDfaf516751e1b3C068B763bcA13dDc5499F9",
            "_blank"
          );
        }}
      >
        Contract
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
