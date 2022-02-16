import { makeStyles } from "@material-ui/core";

export const useDashboardStyles = () => {
  // generate the classNames used by the dashboards page
  const useStyles = makeStyles({
    loader: {
      margin: "auto",
      width: "fit-content",
      marginTop: 200,
    },
    container: {
      //CHALLENGE NOTE: the toolbar does not appear to have a static height, so
      //this might fail if the content in the toolbar causes it to grow larger
      //than 64px high. We could use a ref to dynamically determine the toolbar
      //height (or override the material UI to set it to a static height?)
      height: "calc(100vh - 64px)",
    },
  });

  return {
    classes: useStyles(),
  };
};
