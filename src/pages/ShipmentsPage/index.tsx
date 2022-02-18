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
import { useShipmentPageStyles, useDynamicDataGrid } from "./hooks";

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
  const { pageSize, dataGridContainerRef } = useDynamicDataGrid();

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
          pageSize={pageSize}
          // resolves console warning `The page size ${pageSize} is not preset in the `rowsPerPageOptions``
          rowsPerPageOptions={[pageSize]}
          disableSelectionOnClick
        />
      );
      break;
    case statuses.ERROR:
    default:
      useComponent = <div className="page__container">{useComponent}</div>;
  }

  return (
    <div className="page__container" ref={dataGridContainerRef}>
      {useComponent}
    </div>
  );
};
