import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import {BrowserRouter} from'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles
createRoot(document.getElementById('root')).render(
<StrictMode>
  
  <BrowserRouter>
  <ToastContainer />
    <App />
  </BrowserRouter>
</StrictMode>
)
