import { StyleSheet, css } from "aphrodite";
import React from "react";
import Lottie from "react-lottie";

import { Button } from "../components/base/Button";
import { NavBar } from "../components/base/NavBar";
import { NAVY_BLUE, STRAVA_ORANGE, WHITE } from "../constants/styles";
import animationData from "../assets/lf30_editor_ftckbmui.json";
import AboutPage from "./AboutPage";
import QuestionsPage from "./QuestionsPage";
import {
  DEFAULT_LOTTIE_OPTIONS,
  STRAVA_AUTH_URL,
} from "../constants/constants";

export default function HomePage(): JSX.Element {
  return (
    <div>
      <NavBar />
      <div className={css(styles.container)}>
        <div>
          <Lottie
            options={{
              ...DEFAULT_LOTTIE_OPTIONS,
              animationData: animationData,
            }}
            height={400}
            width={400}
            isClickToPauseDisabled={true}
          />
        </div>
        <div className={css(styles.button)}>
          <Button
            variant="contained"
            style={{ backgroundColor: STRAVA_ORANGE, color: WHITE }}
            onClick={() => {
              window.location.href = STRAVA_AUTH_URL;
            }}
          >
            Connect with Strava
          </Button>
        </div>
      </div>
      <AboutPage />
      <QuestionsPage />
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: NAVY_BLUE,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    padding: "56px",
  },
});
