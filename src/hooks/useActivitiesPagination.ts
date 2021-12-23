import { useCallback, useEffect, useState } from "react";

import { Activity, User } from "../constants/models";
import { getUserActivities } from "../utils/fetch";
import { parseActivities } from "../utils/parse";
import { redirectToStravaAuth } from "../utils/utils";

export function useActivitiesPagination(
  user: User
): [boolean, Array<Activity>, number, number | null, () => void, () => void] {
  const [activities, setActivities] = useState<Array<Activity>>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState<null | number>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchActivities = useCallback(
    async (activityPage: number) => {
      try {
        const activitiesResponse = await getUserActivities(
          user.id,
          user.accessToken,
          activityPage
        );
        return parseActivities(activitiesResponse);
      } catch (e: unknown) {
        console.error(e);
        redirectToStravaAuth();
      }
    },
    [user.id, user.accessToken]
  );

  const handleNextPage = async () => {
    setIsLoading(true);
    const userActivities = await fetchActivities(page + 1);
    if (userActivities != null) {
      if (userActivities.length > 0) {
        setActivities(userActivities);
        setPage(page + 1);
      } else {
        setLastPage(page);
      }
    }
    setIsLoading(false);
  };
  const handlePrevPage = async () => {
    if (page > 1) {
      setIsLoading(true);
      const userActivities = await fetchActivities(page - 1);
      if (userActivities != null) {
        setActivities(userActivities);
        setPage(page - 1);
      }
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchFirstPage = async () => {
      const userActivities = await fetchActivities(1);
      if (userActivities != null) {
        setActivities(userActivities);
      }
      setIsLoading(false);
    };
    fetchFirstPage();
  }, [fetchActivities]);
  return [
    isLoading,
    activities,
    page,
    lastPage,
    handleNextPage,
    handlePrevPage,
  ];
}
