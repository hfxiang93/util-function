/*
 * @Descripttion: 
 * @Author: xianghaifeng
 * @Date: 2023-03-15 13:49:43
 * @LastEditors: xianghaifeng
 * @LastEditTime: 2023-03-17 14:35:11
 */
import { defineConfig } from 'rollup'
import serve from "rollup-plugin-serve" // 本地开发
import livereload from "rollup-plugin-livereload" // 热更新
import resolve from "rollup-plugin-node-resolve" // 外部文件加载
import { terser } from "rollup-plugin-terser" // 压缩
import ts from "rollup-plugin-typescript2" // ts插件
import replace from "rollup-plugin-replace" // 把node的环境变量转换到window上也能看到
import path from "path"
import { fileURLToPath } from 'url'
import babel from '@rollup/plugin-babel'
import commonjs from 'rollup-plugin-commonjs';
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const metaUrl = fileURLToPath(import.meta.url)
const dirName = path.dirname(metaUrl)
const isDev = () => process.env.NODE_ENV === 'development' ? true : false
const pkg = require('./package.json')
const banner = `/*!
* ${pkg.name} v${pkg.version}
* (c) ${new Date().getFullYear()} Xiang HaiFeng
* @license MIT
*/`
export default defineConfig({
    input: "src/index.ts",
    output: [
        {
            file: path.resolve(dirName, "dist/index.umd.js"),
            format: "umd",
            sourcemap: true,
            name: 'Utils',
            banner
        },
        {
            file: path.resolve(dirName, "dist/index.cjs.js"),
            format: "cjs",
            sourcemap: true,
            banner
        },
        {
            file: path.resolve(dirName, "dist/index.js"),
            format: "es",
            sourcemap: true,
            banner,
        },
        // {
        //     file: path.resolve(dirName, "dist/index.amd.js"),
        //     format: "amd",
        //     sourcemap: true,
        //     banner
        // },
        // {
        //     file: path.resolve(dirName, "dist/index.iife.js"),
        //     format: "iife",
        //     sourcemap: true,
        //     banner
        // },
        // {
        //     file: path.resolve(dirName, "dist/index.system.js"),
        //     format: "system",
        //     sourcemap: true,
        // }
    ],
    plugins: [
        commonjs(),
        ts({
            check: true,
            tsconfig: path.resolve(dirName, 'tsconfig.json'),
            cacheRoot: path.resolve(dirName, 'node_modules/.rts2_cache'),
            tsconfigOverride: {
                compilerOptions: {
                    sourceMap: isDev(),
                    declaration: true,
                    declarationMap: isDev(),
                },
                exclude: ['__tests__', 'test-dts'],
            }
        }),
        !isDev() && terser(),
        isDev() && serve({
            openPage: './index.html',
            port: 3333,
        }),
        isDev() && livereload(),
        resolve(['.js', '.ts']),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        // babel 配置 
        babel({
            exclude: 'node_modules/**'
        })
    ]
}) 