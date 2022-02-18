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
      padding: "4px",
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: "150px",
      [theme.breakpoints.down("lg")]: {
        flexGrow: 1,
        flexShrink: 1,
      },
    },
    dayContainerHeader: {
      backgroundColor: theme.palette.primary.main,
      padding: "12px",
    },
    dayContainerBody: {
      padding: "8px 4px",
    },
    noShipmentContainer: {
      padding: "8px 4px",
      textAlign: "center",
      opacity: "0.7",
    },
  });

  return {
    classes: useStyles(),
  };
};
