// see https://dev.to/siddharthvenkatesh/component-library-setup-with-react-typescript-and-rollup-onj

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import packageJson from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        name: '@marketone/react-oidc',
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal({ includeDependencies: true }),
      resolve({ browser: true }),
      commonjs(),
      nodePolyfills(),
      json({
        compact: true,
      }),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
    ],
  },
]
