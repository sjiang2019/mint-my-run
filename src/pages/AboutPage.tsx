import { Grid, Typography } from "@mui/material";
import React from "react";

import { OFF_WHITE } from "../constants/styles";

export default function AboutPage() {
  return (
    <Grid
      id="about"
      container
      justifyContent="center"
      sx={{ height: "800px", backgroundColor: OFF_WHITE }}
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
          airdrop, or utility. It was born simply out of a desire to memorialize
          athletic achievements on the blockchain.
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={2}>
          Each activity costs <strong>0.005Ξ</strong> to mint and there's no cap
          on the total supply of MintMyRun (MMR) tokens.
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={2}>
          To view your minted activities, click the "My NFTs" tab in the
          navigation bar.
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={4}>
          To mint new activities:
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={2}>
          1. Ensure that your MetaMask account is connected to the{" "}
          <strong>Optimism</strong> network (see FAQ section for more details).
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={2}>
          2. Click the orange "Connect with Strava" button above. Make sure you
          allow MintMyRun to view your public activities.
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={2}>
          3. Select activities to preview as NFTs and click "View activities"
          button to proceed to minting page.
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={2}>
          4. Preview your activity metadata before minting. You can drag the map
          to change the image, update the "name" and "description" metadata
          fields, and change the system of measurement.
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={2}>
          5. Click the "Mint activities" button and accept the transaction in
          MetaMask.
        </Typography>
      </Grid>
    </Grid>
  );
}
