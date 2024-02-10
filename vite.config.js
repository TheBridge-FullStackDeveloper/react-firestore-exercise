import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

export default defineConfig(({ mode }) => {
  dotenv.config(); // Cargar variables de entorno desde .env
  return {
    plugins: [react()],
  };
});
