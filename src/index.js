import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import './components/NavBar.css'
import './components/Grafico.css'
import './components/Filmes.css'

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


ReactDOM.render( <App /> , document.getElementById('root'));
