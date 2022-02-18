import { createTheme, ThemeProvider } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import "./App.css";
import { Navbar } from "./components/Navbar";
import { DashboardPage } from "./pages/DashboardPage";
import { ShipmentsPage } from "./pages/ShipmentsPage";
import { AppRoute } from "./routes";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2AC3AD",
    },
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="app__container">
          <div className="navbar__container">
            <Navbar />
          </div>
          <div className="page__container">
            <Switch>
              <Route exact path="/">
                <Redirect to={AppRoute.DASHBOARD} />
              </Route>
              <Route path={AppRoute.DASHBOARD}>
                <DashboardPage />
              </Route>
              <Route path={AppRoute.SHIPMENTS}>
                <ShipmentsPage />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};
