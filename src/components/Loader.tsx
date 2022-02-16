import { useTheme, Box, BoxProps } from "@material-ui/core";
import ReactLoaderSpinner from "react-loader-spinner";

export const Loader = (props: BoxProps) => {
  const theme = useTheme();

  return (
    <Box {...props}>
      <ReactLoaderSpinner type="Grid" color={theme.palette.primary.main} />
    </Box>
  );
};
