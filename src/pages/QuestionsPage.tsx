import { Grid, Typography } from "@mui/material";

import { OFF_WHITE, SEA_GREEN } from "../constants/styles";

export default function QuestionsPage() {
  return (
    <Grid
      id="about"
      container
      justifyContent="center"
      sx={{ height: "800px", backgroundColor: SEA_GREEN }}
    >
      <Grid
        container
        direction="column"
        alignContent="flex-start"
        sx={{ width: "80%", padding: "5%", color: OFF_WHITE }}
      >
        <Typography variant="h3" fontFamily="monospace">
          FAQ
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={2}>
          Why is MintMyRun deployed on the Optimism network instead of Ethereum
          Mainnet?
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={1}>
          {`>`} The gas cost of minting an NFT on mainnet would far exceed the
          price of the NFT itself (0.005Ξ). Also, it's really expensive to
          deploy a contract on Mainnet.
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={2}>
          How do I add the Optimism network to my MetaMask?
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={1}>
          {`>`} Go to{" "}
          <a
            href="https://chainid.link/?network=optimism"
            rel="noreferrer"
            target="_blank"
            style={{ color: "inherit" }}
          >
            https://chainid.link/?network=optimism
          </a>{" "}
          and click the "Connect" button. Alternatively, you can manually add a
          new network in MetaMask with the configurations described here:{" "}
          <a
            href="https://community.optimism.io/docs/infra/networks.html#optimism-mainnet"
            rel="noreferrer"
            target="_blank"
            style={{ color: "inherit" }}
          >
            https://community.optimism.io/docs/infra/networks.html#optimism-mainnet
          </a>
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={2}>
          How do I transfer Eth to Optimism?
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={1}>
          {`>`} You can deposit Ethereum into Optimistic Ethereum using the
          Optimism Gateway:{" "}
          <a
            href="https://gateway.optimism.io/"
            rel="noreferrer"
            target="_blank"
            style={{ color: "inherit" }}
          >
            https://gateway.optimism.io/
          </a>
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={2}>
          Why aren't my minted activities showing up in the "My NFTs" tab?
        </Typography>
        <Typography variant="body1" fontFamily="monospace" paddingTop={1}>
          {`>`} Make sure that your MetaMask account is switched to the Optimism
          network.
        </Typography>
      </Grid>
    </Grid>
  );
}
