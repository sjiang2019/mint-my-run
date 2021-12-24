import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import StravaRedirect from "../pages/StravaRedirectPage";
import ActivitiesPage from "../pages/ActivitiesPage";
import {
  ACTIVITIES_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  MINTED_ACTIVITIES_ROUTE,
  MINT_PAGE_ROUTE,
  STRAVA_REDIRECT_PAGE_ROUTE,
} from "../constants/constants";
import MintPage from "../pages/MintPage";
import MintedActivitiesPage from "../pages/MintedActivitiesPage";

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <Routes>
            <Route path={HOME_PAGE_ROUTE} element={<HomePage />} />
            <Route
              path={STRAVA_REDIRECT_PAGE_ROUTE}
              element={<StravaRedirect />}
            />
            <Route path={ACTIVITIES_PAGE_ROUTE} element={<ActivitiesPage />} />
            <Route path={MINT_PAGE_ROUTE} element={<MintPage />} />
            <Route
              path={MINTED_ACTIVITIES_ROUTE}
              element={<MintedActivitiesPage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
export default AppRouter;
