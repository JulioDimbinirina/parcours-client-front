import React from 'react';
import { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from './components/commons/private-route';

const QualificationVente = React.lazy(() => import('./pages/qualification-vente'));

const Routes = () => {
    return (
        <Suspense fallback={null}>
            <Switch>
                <PrivateRoute path="/qualification_vente" exact component={QualificationVente} />
            </Switch>
        </Suspense>
    )
}

export default Routes;