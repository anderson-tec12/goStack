import { Switch, Route } from "react-router-dom";

import Repository from "../pages/Repository";
import Dashboard from "../pages/Dashboard";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/repository/:repository+" component={Repository} />
  </Switch>
);

export default Routes;
