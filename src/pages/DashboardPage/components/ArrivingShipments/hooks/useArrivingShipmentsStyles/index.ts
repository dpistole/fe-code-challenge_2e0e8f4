import { makeStyles, useTheme } from "@material-ui/core";

export const useArrivingShipmentsStyles = () => {
  const theme = useTheme();
  const useStyles = makeStyles({
    container: {
      padding: "1.6rem",
    },
    daysContainer: {
      display: "flex",
      flexDirection: "row",
      [theme.breakpoints.down("lg")]: {
        flexDirection: "column",
        width: "400px",
      },
    },
    dayContainer: {
      padding: "0.8rem",
      border: "solid thin",
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: "150px",
      [theme.breakpoints.down("lg")]: {
        flexGrow: 1,
        flexShrink: 1,
      },
    },
    noShipmentContainer: {
      textAlign: "center",
    },
  });

  return {
    classes: useStyles(),
  };
};
