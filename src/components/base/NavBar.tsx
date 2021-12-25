import { StyleSheet, css } from "aphrodite";
import { HashLink as Link } from "react-router-hash-link";
import { IconButton } from "@mui/material";

import { Button } from "./Button";
import { NAVY_BLUE, OFF_WHITE } from "../../constants/styles";
import {
  HOME_PAGE_ROUTE,
  MINTED_ACTIVITIES_ROUTE,
} from "../../constants/constants";
import etherscanLogo from "../../assets/etherscan-logo.svg";

export function NavBar(): JSX.Element {
  return (
    <div className={css(styles.container)}>
      <Link to={HOME_PAGE_ROUTE} style={{ textDecoration: "none" }}>
        <Button variant="text" className={css(styles.button)} disableRipple>
          Home
        </Button>
      </Link>
      <Link to={MINTED_ACTIVITIES_ROUTE} style={{ textDecoration: "none" }}>
        <Button variant="text" className={css(styles.button)} disableRipple>
          My NFTs
        </Button>
      </Link>
      <IconButton
        onClick={() => {
          window.open(
            "https://optimistic.etherscan.io/address/0xC7adDfaf516751e1b3C068B763bcA13dDc5499F9",
            "_blank"
          );
        }}
        sx={{ float: "right" }}
      >
        <img
          style={{
            height: "32px",
          }}
          src={etherscanLogo}
          alt=""
        />
      </IconButton>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: NAVY_BLUE,
    padding: "8px 16px",
  },
  button: {
    color: OFF_WHITE,
    marginRight: "3px",
    marginLeft: "3px",
  },
});
