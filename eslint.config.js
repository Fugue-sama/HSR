import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginReact from 'eslint-plugin-react'

export default defineConfig([
  { 
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: { globals: globals.browser },
    plugins: { js, react: pluginReact },
    extends: ['js/recommended'],
    rules: {
      'react/react-in-jsx-scope': 'off', // Tắt cảnh báo vì React 17+ không cần import React
      'react/jsx-runtime': 'warn',
      'semi': ['warn', 'never'], // Cảnh báo khi có dấu chấm phẩy
      'quotes': ['warn', 'single'], // Cảnh báo khi dùng dấu nháy đôi thay vì nháy đơn
      'no-console': 'warn', // Cảnh báo khi sử dụng console.log
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Cảnh báo import nhưng không dùng
      'at-rule-no-unknown': [true, { // không báo lỗi các ngoại lệ sau
      ignoreAtRules: ['apply', 'variants', 'responsive', 'screen']
    }]
    }
  },
  pluginReact.configs.flat.recommended,
])
