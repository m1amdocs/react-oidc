import { defineConfig, loadEnv } from "vite";
import * as fs from "fs";
import * as path from 'path';
import react from "@vitejs/plugin-react";
import jotaiDebugLabel from "jotai/babel/plugin-debug-label";
import jotaiReactRefresh from "jotai/babel/plugin-react-refresh";

// https://vitejs.dev/config/
export default () => {
  // using .env.sample as a template create your own .env.development file
  const envVars = loadEnv('development', process.cwd())
  process.env = {...process.env, ...envVars}

  const certDir = process.env.VITE_CERTS_DIR

  if (!certDir) {
    throw Error('VITE_CERTS_DIR variable is missing, please check .env.development file')
  }

  return defineConfig({
    server: {
      https: {
        key: fs.readFileSync(path.join(certDir, 'localhost-key.pem')),
        cert: fs.readFileSync(path.join(certDir, "localhost.pem")),
      },
    },
    plugins: [
      react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
    ],
  })
}