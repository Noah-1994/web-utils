import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const config = {
  input: './src/index.ts',
  output: {
    name: 'WebUtils',
    sourcemap: !process.env.MINIFY,
  },
  plugins: [
    typescript(),
    babel({ babelHelpers: 'bundled' }),
  ],
};

if (process.env.MINIFY) {
  config.plugins.push(terser());
}

export default config;
