import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable'
// import cssVars from 'css-vars-ponyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// cssVars({
//     include: 'style',
//     onlyLegacy: false,
//     watch: true,
//     onComplete(cssText, styleNode, cssVariables) {
//     //   console.log(cssVariables);
//     }
//   });

ReactDOM.render(<App />, document.getElementById('root'));
