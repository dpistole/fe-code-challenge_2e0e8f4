import { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import Loader from "react-loader-spinner";
import {
  fetchShipments,
  FetchShipmentsResult,
} from "../../data/fetch-shipments";
import { COLUMNS } from "./constants/columns";
import { useShipmentPageStyles } from "./hooks/useShipmentPageStyles";
import * as statuses from "./constants/statuses";

type LoadingResult = {
  status: "LOADING";
};

const INITIAL_RESULT: LoadingResult = {
  status: "LOADING",
};

export const ShipmentsPage: React.FC = () => {
  // initialize component styles
  const { classes, theme } = useShipmentPageStyles();

  // initialize a state value for storing the fetch shipments result
  const [fetchShipmentsResult, setFetchShipmentsResult] = useState<
    FetchShipmentsResult | LoadingResult
  >(INITIAL_RESULT);

  // on mount fetch the shipments data
  useEffect(() => {
    fetchShipments().then((result) => setFetchShipmentsResult(result));
  }, []);

  // if the fetch call is loading, return the loader
  if (fetchShipmentsResult.status === statuses.LOADING) {
    return (
      <Box className={classes.loader}>
        <Loader type="Grid" color={theme.palette.primary.main} />
      </Box>
    );
  }

  // if the fetch call succeeded, return the data grid
  if (fetchShipmentsResult.status === statuses.SUCCESS) {
    return (
      <DataGrid
        className={classes.grid}
        rows={fetchShipmentsResult.shipments}
        columns={COLUMNS}
        pageSize={20}
        disableSelectionOnClick
      />
    );
  }

  // if the fetch call failed, or we have an unknown status, display an error message
  return <p>Error</p>;
};
