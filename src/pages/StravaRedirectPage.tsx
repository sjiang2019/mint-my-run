import React, { useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { setUser } from "../actions";
import { cleanAuthToken, authGetter } from "../utils/auth";
import { NavBar } from "../components/base/NavBar";
import { parseUserData } from "../utils/parse";
import { GreekingLoading } from "../components/base/GreekingLoading";

export function StravaRedirectPage(props: any): JSX.Element {
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      try {
        if (_.isEmpty(location)) {
          return navigate("/");
        }
        const stravaAuthToken = cleanAuthToken(location.search);
        const tokens = await authGetter(stravaAuthToken);
        console.log("tokens", tokens);

        const user = parseUserData(tokens);
        props.setUser(user);

        navigate("/activities");
      } catch (error) {
        navigate("/");
      }
    };
    authenticate();
  });

  return (
    <div>
      <NavBar />
      <GreekingLoading />
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return { authTokenURL: state.authTokenURL };
};

export default connect(mapStateToProps, {
  setUser,
})(StravaRedirectPage);
