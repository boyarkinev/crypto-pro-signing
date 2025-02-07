import * as path from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base:
		process.env.NODE_ENV === 'production'
			? 'https://boyarkinev.github.io/crypto-pro-signing'
			: '/',
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
	},
});
