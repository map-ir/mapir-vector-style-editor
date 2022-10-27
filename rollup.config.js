/* eslint-disable */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import peerDeps from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import svgr from '@svgr/rollup';
// import visualizer from 'rollup-plugin-visualizer';
// import url from '@rollup/plugin-url';

const extensions = ['.js', '.ts', '.jsx', '.tsx'];

export default {
  input: './src/index.tsx',
  output: [
    {
      dir: 'dist',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: 'inline',
    },
  ],
  plugins: [
    // url(),
    svgr({
      exportType: 'named',
      // jsxRuntime: 'automatic',
      // icon: true,
    }),
    peerDeps(),
    resolve(),
    commonjs(),
    babel({
      babelrc: true,
      babelHelpers: 'runtime',
      exclude: ['**/node_modules/**', '**/libs/**'],
      extensions: extensions,
    }),
    postcss(),
    terser(),
    // visualizer({
    //   filename: 'bundle-analysis.html',
    //   open: true,
    // }),
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: true,
      declarationDir: './dist',
    }),
  ],
};
