import Lottie from "react-lottie";
import animationData from "../../assets/81883-greeking-table-dekstop.json";

import { DEFAULT_LOTTIE_OPTIONS } from "../../constants/constants";

export function GreekingLoading(): JSX.Element {
  return (
    <Lottie
      options={{
        ...DEFAULT_LOTTIE_OPTIONS,
        animationData: animationData,
      }}
      isClickToPauseDisabled={true}
    />
  );
}
