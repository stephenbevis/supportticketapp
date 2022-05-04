// React
import React from 'react'
import { createRoot } from 'react-dom/client'

// Redux
import { Provider } from 'react-redux'
import { store } from './app/store'

// Components
import App from './App'

// Utilities
import reportWebVitals from './reportWebVitals'

// Bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()