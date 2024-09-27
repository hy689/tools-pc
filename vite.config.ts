import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-ignore
import pxtovw from 'postcss-px-to-viewport'

// 尝试使用 `npm i --save-dev @types/postcss-px-to-viewport` 
// (如果存在)，或者添加一个包含 `declare module 'postcss-px-to-viewport';` 的新声明(.d.ts)文件ts(7016)
//配置参数
const usePxtovw = pxtovw({
  viewportWidth: 375,
  viewportUnit: 'vw'
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [usePxtovw]
    }
  },
  resolve: {
    alias: {
      "@": '/src'
    }
  }
})
