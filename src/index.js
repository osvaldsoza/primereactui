import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NavBar from './NavBar'
import App from './Grafico';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './NavBar.css'
import './Grafico.css'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


ReactDOM.render(
  <div>
    <NavBar />
    <App />
  </div>
  , document.getElementById('root'));
