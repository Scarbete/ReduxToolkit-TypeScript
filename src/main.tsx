import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import './assets/styles/core.sass'
import { App } from './app.tsx'
import { store } from './store/store.tsx'

const root = document.getElementById('root')!

createRoot(root).render(
    <Provider store={store}>
        <App />
    </Provider>
)
