import React from 'react'
import ReactDOM from 'react-dom/client'
import { Amplify } from 'aws-amplify'
import awsConfig from './aws-exports'
import App from './App'
import './index.css'
import { SmoothScroll } from '@portfolio/shared-ui'

Amplify.configure(awsConfig)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <SmoothScroll>
            <App />
        </SmoothScroll>
    </React.StrictMode>,
)
