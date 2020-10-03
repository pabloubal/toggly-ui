import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from '../views/404/NotFound';
import FeatureToogle from "../views/featureToggles/FeatureToggle";
import FeatureTooglesList from "../views/featureToggles/FeatureTogglesList";
import Home from '../views/home/Home';
import Telemetry from "../views/telemetry/Telemetry";
import Layout from './layout/Layout';


function Routes() {
    return (
        <BrowserRouter>
            <Route render={(props) => (
                <Layout {...props}>

                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/feature-toggles/add" component={FeatureToogle} />
                        <Route path="/feature-toggles/:toggleId" component={FeatureToogle} />
                        <Route path="/feature-toggles" component={FeatureTooglesList} />
                        <Route path="/telemetry" component={Telemetry} />
                        <Route component={NotFound} />
                    </Switch>
                </Layout>
            )} />
        </BrowserRouter>
    )
}

export default Routes;