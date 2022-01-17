import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'normalize.css';
import './stylesheets/main.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faEllipsisH, faTrashAlt, faClone, faHeart, faBars } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faEllipsisH, faTrashAlt, faClone, faHeart, faBars);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
