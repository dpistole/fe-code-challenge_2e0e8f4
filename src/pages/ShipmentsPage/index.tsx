import { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Loader } from "../../components/Loader";
import {
  fetchShipments,
  FetchShipmentsResult,
} from "../../data/fetch-shipments";
import { COLUMNS } from "./constants/columns";
import {
  useIsMounted,
  useShipmentPageStyles,
  useDynamicDataGrid,
} from "./hooks";
import * as statuses from "./constants/statuses";

type LoadingResult = {
  status: "LOADING";
};

const INITIAL_RESULT: LoadingResult = {
  status: "LOADING",
};

export const ShipmentsPage: React.FC = () => {
  const { ifIsMounted } = useIsMounted();
  // initialize component styles
  const { classes } = useShipmentPageStyles();

  // initialize a state value for storing the fetch shipments result
  const [fetchShipmentsResult, setFetchShipmentsResult] = useState<
    FetchShipmentsResult | LoadingResult
  >(INITIAL_RESULT);

  // get the pageSize
  const { pageSize } = useDynamicDataGrid();

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
      <DataGrid
        className={classes.grid}
        rows={fetchShipmentsResult.shipments}
        columns={COLUMNS}
        pageSize={pageSize}
        // resolves console warning `The page size ${pageSize} is not preset in the `rowsPerPageOptions``
        rowsPerPageOptions={[pageSize]}
        disableSelectionOnClick
      />
    );
  }

  // if the fetch call failed, or we have an unknown status, display an error message
  return <p>Error</p>;
};
