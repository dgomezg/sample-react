import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

/* 
Default Global Configuration 
*/

axios.defaults.baseURL = 'http://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/* 
Interceptors: global error handlers
*/
//interceptors for the request.
axios.interceptors.request.use(
  request => {
    console.log(request);
    //Edit request config before returning it
    return request;
  },
  //the 2nd function is the handler for errors IN SENDING THE REQUEST
  error => {
    console.log(error);
    return Promise.reject(error);
  });

  //Interceptors for the response.
axios.interceptors.response.use(response => {
  console.log(response);
  //Edit request config before returning it
  return response;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }); 

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
