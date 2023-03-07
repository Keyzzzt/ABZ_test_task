import React from 'react'
import ReactDOM from 'react-dom/client'
import './02_Styles/index.scss'
import App from './App'
import {Provider} from 'react-redux'
import store from './999_Store/store'
import {BrowserRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <Provider store={store}>
        <BrowserRouter  basename={process.env.PUBLIC_URL}>
            <App/>
        </BrowserRouter>
    </Provider>
)
