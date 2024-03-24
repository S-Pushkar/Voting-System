import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path';

//https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      // Send the key and certificate
      key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
    },
    port: 443, // Change the port to 443
  },
});

