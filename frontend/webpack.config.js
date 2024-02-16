import { resolve } from 'path';
import Dotenv from 'dotenv-webpack';

export const entry = './src/index.js';
export const output = {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
};
export const plugins = [
    new Dotenv(),
];
