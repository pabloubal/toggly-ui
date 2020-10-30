import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NotFound from '../views/404/NotFound';
import Credits from "../views/credits/Credits";
import FeatureToogle from "../views/featureToggles/FeatureToggle";
import FeatureTooglesList from "../views/featureToggles/FeatureTogglesList";
import Layout from './layout/Layout';


function Routes() {
    return (
        <BrowserRouter>
            <Route render={(props) => (
                <Layout {...props}>

                    <Switch>
                        <Redirect from="/" to="/feature-toggles" exact/>
                        <Route path="/feature-toggles/add" component={FeatureToogle} />
                        <Route path="/feature-toggles/:toggleId" component={FeatureToogle} />
                        <Route path="/feature-toggles" component={FeatureTooglesList} />
                        <Route path="/credits" component={Credits} />
                        <Route component={NotFound} />
                    </Switch>
                </Layout>
            )} />
        </BrowserRouter>
    )
}

export default Routes;