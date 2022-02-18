import React, { useState, useEffect } from "react";
import { useIsMounted } from "../../hooks";
import {
  fetchShipments,
  FetchShipmentsResult,
} from "../../data/fetch-shipments";
import * as statuses from "../../constants/statuses";
import { Loader } from "../../components";
import { useDashboardStyles } from "./hooks";
import { ArrivingShipments } from "./components";

type LoadingResult = {
  status: "LOADING";
};

const INITIAL_RESULT: LoadingResult = {
  status: "LOADING",
};

export const DashboardPage: React.FC = () => {
  const { ifIsMounted } = useIsMounted();
  const { classes } = useDashboardStyles();

  // initialize a state value for storing the fetch shipments result
  const [fetchShipmentsResult, setFetchShipmentsResult] = useState<
    FetchShipmentsResult | LoadingResult
  >(INITIAL_RESULT);

  // on mount fetch the shipments data
  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchShipments();
        ifIsMounted(() => {
          setFetchShipmentsResult(result);
        });
      } catch {
        setFetchShipmentsResult({
          status: statuses.ERROR,
          message: "An unexpected error occurred",
        });
      }
    };

    load();
  }, [ifIsMounted]);

  // if the fetch call is loading, return the loader
  if (fetchShipmentsResult.status === statuses.LOADING) {
    return <Loader className={classes.loader} />;
  }

  // if the fetch call succeeded, return the data grid
  if (fetchShipmentsResult.status === statuses.SUCCESS) {
    return (
      <div className={classes.container}>
        <ArrivingShipments shipments={fetchShipmentsResult?.shipments} />
      </div>
    );
  }

  // if the fetch call failed, or we have an unknown status, display an error message
  return <p>Error</p>;
};
