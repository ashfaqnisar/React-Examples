import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.hydrate(//The hydrate is used for server side rendering
    <App />,
    document.getElementById('mountNode'),
);