import { makeStyles } from "@material-ui/core";

export const useShipmentPageStyles = () => {
  // generate the classNames used by the shipments page
  const useStyles = makeStyles({
    grid: {
      marginInline: 16,
      height: "100%",
    },
    loader: {
      margin: "auto",
      width: "fit-content",
      marginTop: 200,
    },
  });

  return {
    classes: useStyles(),
  };
};
