import { makeStyles } from "@material-ui/core";

export const useShipmentArrivalSummaryStyles = () => {
  const useStyles = makeStyles({
    container: {
      paddingBottom: "20px",
    },
    header: {
      fontSize: "18px",
      padding: "4px",
      backgroundColor: "#7c7d80",
      color: "white",
    },
    dataGroup: {
      padding: "8px 0",
    },
    label: {
      fontWeight: "bold",
      fontSize: "14px",
    },
    value: {
      paddingLeft: "8px",
      fontSize: "14px",
    },
  });

  return {
    classes: useStyles(),
  };
};
