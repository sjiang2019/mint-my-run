import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GreekingLoading } from "../components/base/GreekingLoading";

import { NavBar } from "../components/base/NavBar";
import NftCard from "../components/NftCard";
import { ActivityMetadata } from "../constants/models";
import { fetchMetadataFromTokenURIs, fetchTokenURIs } from "../utils/mint";

export default function MintedActivitiesPage(): JSX.Element {
  const [tokenURIs, setTokenURIs] = useState<null | Array<string>>(null);
  const [nftMetadataList, setNftMetadataList] =
    useState<null | Array<ActivityMetadata>>(null);
  useEffect(() => {
    const getNFTMetdata = async () => {
      const tokenURIs = await fetchTokenURIs();
      const metadata = await fetchMetadataFromTokenURIs(tokenURIs);
      setTokenURIs(tokenURIs);
      setNftMetadataList(metadata);
    };
    getNFTMetdata();
  }, []);
  return (
    <>
      <NavBar />
      <Grid container justifyContent="center">
        <Grid container spacing={4} sx={{ marginTop: "40px", width: "90%" }}>
          {nftMetadataList != null && tokenURIs != null ? (
            nftMetadataList.length > 0 ? (
              nftMetadataList.map((metadata: ActivityMetadata, i: number) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  xl={3}
                  key={`${metadata.name}_${i}`}
                  style={{ paddingTop: 3 }}
                >
                  <NftCard nftMetadata={metadata} tokenURI={tokenURIs[i]} />
                </Grid>
              ))
            ) : (
              <Typography>
                No minted activities found. Make sure your Metamask account is
                connected to the Optimism network.
              </Typography>
            )
          ) : (
            <GreekingLoading />
          )}
        </Grid>
      </Grid>
    </>
  );
}
