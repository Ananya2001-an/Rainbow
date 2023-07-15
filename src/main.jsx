import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './contexts/authContext'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AuthProvider>
        <ChakraProvider theme={theme}>
        <App />
        </ChakraProvider>
      </AuthProvider>
    </BrowserRouter>
)
