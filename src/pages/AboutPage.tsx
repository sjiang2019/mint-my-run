import { Grid, Typography } from "@mui/material";
import React from "react";

import { OFF_WHITE } from "../constants/styles";

export default function AboutPage() {
  return (
    <Grid
      id="about"
      container
      justifyContent="center"
      sx={{ backgroundColor: OFF_WHITE }}
    >
      <Grid
        container
        direction="column"
        alignContent="flex-start"
        sx={{ width: "80%", padding: "5%" }}
      >
        <Typography variant="h3" fontFamily="monospace">
          About
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={2}>
          <strong>MintMyRun</strong> is a passion project. It has no roadmap,
          airdrop, or utility.
        </Typography>
        <Typography
          variant="body1"
          fontFamily="monospace"
          paddingTop={2}
        ></Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={2}>
          To view your minted activities, click the <strong>My NFTs</strong> tab
          in the navigation bar. You can also view them on{" "}
          <a
            href="https://quixotic.io/"
            rel="noreferrer"
            target="_blank"
            style={{ color: "inherit" }}
          >
            Quixotic
          </a>
          .
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={4}>
          To mint new activities:
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={2}>
          1. Click the orange "Connect with Strava" button above. Make sure you
          allow MintMyRun to view your public activities.
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={2}>
          2. Select activities to mint as NFTs.
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={2}>
          3. Preview your NFT image and metadata before minting. You can drag
          the map to change the image, edit the "name" and "description"
          metadata fields, and change the system of measurement.
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={2}>
          4. Ensure that your MetaMask account is connected to the{" "}
          <strong>Optimism</strong> network. Click the "Mint activities" button
          and accept the transaction in MetaMask. Each activity costs{" "}
          <strong>0.005Ξ</strong> to mint.
        </Typography>
      </Grid>
    </Grid>
  );
}
