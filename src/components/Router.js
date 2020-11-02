import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NotFound from '../views/404/NotFound';
import About from "../views/about/About";
import FeatureToogle from "../views/featureToggles/FeatureToggle";
import FeatureTooglesList from "../views/featureToggles/FeatureTogglesList";
import Layout from './layout/Layout';

const baseURL = process.env.PUBLIC_URL ?? ''

const urls = {
    featureTogglesURL: `${baseURL}/feature-toggles`,
    featureTogglesAddURL: `${baseURL}/feature-toggles/add`,
    featureTogglesEditURL: `${baseURL}/feature-toggles/:toggleId`,
    aboutURL: `${baseURL}/about`
}

function Router() {
    return (
        <BrowserRouter>
            <Route render={(props) => (
                <Layout {...props}>

                    <Switch>
                        <Redirect from={baseURL.length>0 ? baseURL : "/"} to={urls.featureTogglesURL} exact />
                        <Route path={urls.featureTogglesAddURL} component={FeatureToogle} />
                        <Route path={urls.featureTogglesEditURL} component={FeatureToogle} />
                        <Route path={urls.featureTogglesURL} component={FeatureTooglesList} />
                        <Route path={urls.aboutURL} component={About} />
                        <Route component={NotFound} />
                    </Switch>
                </Layout>
            )} />
        </BrowserRouter>
    )
}

export { Router, urls };
