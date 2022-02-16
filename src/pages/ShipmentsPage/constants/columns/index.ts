import { GridColDef } from "@material-ui/data-grid";

export const COLUMNS: GridColDef[] = [
  {
    field: "houseBillNumber",
    headerName: "House Bill",
    width: 150,
  },
  {
    field: "client",
    headerName: "Shipper",
    width: 200,
  },
  {
    field: "origin",
    headerName: "Origin",
    width: 400,
  },
  {
    field: "destination",
    headerName: "Destination",
    width: 400,
  },
  {
    field: "mode",
    headerName: "Mode",
    width: 200,
  },
  {
    field: "estimatedDeparture",
    headerName: "Estimated Departure",
    width: 200,
  },
  {
    field: "estimatedArrival",
    headerName: "Estimated Arrival",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
  },
];
