import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';

import router from './routes'
import './main.css'
import { ConfigProvider } from 'antd';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={{
      cssVar: true,
      token: {
        colorPrimary: '#d91a01',
      },
    }}>
      <RouterProvider router={router} />
    </ConfigProvider>

  </StrictMode>,
)
