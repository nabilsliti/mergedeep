import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

function onwarn(warning) {
    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
        console.error(`(!) ${warning.message}`);
    }
}

const config = {
    input: 'dist/esm/mergedeep.js',
    output: {
        file: 'dist/browser/mergedeep.js',
        format: 'esm',
        name: 'mergedeep',
    },
    context: 'window',
    plugins: [nodeResolve(), terser(), commonjs()],
    onwarn,
};
export default config;
