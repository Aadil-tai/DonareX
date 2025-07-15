import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'; // ✅ path may vary, depending where your store is

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
)
