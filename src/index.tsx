import * as React from 'react';
import { render } from 'react-dom';

import '@material/layout-grid/mdc-layout-grid.scss';
import { BuilderLayout } from './builder';

render (
    <BuilderLayout />,
    document.getElementById('root'),
);
