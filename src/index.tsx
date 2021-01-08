import React, { Suspense } from 'react';
import Loader from 'react-loader-spinner';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Suspense
        fallback={
            <div className='loader'>
                <Loader
                    type='BallTriangle'
                    color='#00BFFF'
                    height={80}
                    width={80}
                />
            </div>
        }
    >
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Suspense>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
