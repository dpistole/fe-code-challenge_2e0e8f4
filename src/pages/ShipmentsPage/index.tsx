import { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Loader } from "../../components/Loader";
import {
  fetchShipments,
  FetchShipmentsResult,
} from "../../data/fetch-shipments";
import { useIsMounted } from "../../hooks";
import * as statuses from "../../constants/statuses";
import { COLUMNS } from "./constants/columns";
import { useShipmentPageStyles } from "./hooks";

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

  let useComponent = null;
  switch (fetchShipmentsResult.status) {
    case statuses.LOADING:
      useComponent = <Loader className={classes.loader} />;
      break;
    case statuses.SUCCESS:
      useComponent = (
        <DataGrid
          className={classes.grid}
          rows={fetchShipmentsResult.shipments}
          columns={COLUMNS}
          autoPageSize
          disableSelectionOnClick
        />
      );
      break;
    case statuses.ERROR:
    default:
      useComponent = <p>Error</p>;
  }

  return <div className="page__container">{useComponent}</div>;
};
