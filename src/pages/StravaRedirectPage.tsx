import React, { useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { setUser } from "../actions";
import { cleanAuthToken, authGetter } from "../utils/auth";
import { NavBar } from "../components/base/NavBar";
import { parseUserData } from "../utils/parse";
import { GreekingLoading } from "../components/base/GreekingLoading";
import { ACTIVITIES_PAGE_ROUTE, HOME_PAGE_ROUTE } from "../constants/constants";

export function StravaRedirectPage(props: any): JSX.Element {
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      try {
        if (_.isEmpty(location)) {
          return navigate(HOME_PAGE_ROUTE);
        }
        const stravaAuthToken = cleanAuthToken(location.search);
        const tokens = await authGetter(stravaAuthToken);

        const user = parseUserData(tokens);
        props.setUser(user);

        navigate(ACTIVITIES_PAGE_ROUTE);
      } catch (error) {
        navigate(HOME_PAGE_ROUTE);
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
