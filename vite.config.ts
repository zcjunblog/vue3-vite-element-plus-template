import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";// 需要安装的插件@types/node
import styleImport from "vite-plugin-style-import"; // 按需加载必备插件
import viteCompression from "vite-plugin-compression"; // gzip必备插件
const resolve = (dir: string) => path.join(__dirname, dir);
// defineConfig: 不用 jsdoc 注解也可以获取类型提示

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "public", // 公共文件路径,会被复制到outDir 根目录
  // 路径相关规则
  resolve: {
    alias: {
      "@": resolve("src"), // 取相对路径别名, @表示当前的src目录路径
    },
  },
  // 样式相关规则
  css: {
    preprocessorOptions: {
      scss: {
        // 加载全局样式
        additionalData: `@use './src/assets/styles/global.scss';
                         @use './src/assets/styles/common.scss';`,
      },
    },
  },
  // 为服务器设置代理规则
  server: {
    // host: "0.0.0.0", // 指定服务器主机名
    port: 8848, // 指定服务端口号
    open: true, // 运行自动打开浏览器
    // https: false, // 关闭https
    strictPort: true, // 若端口被占用,直接结束项目
    proxy: {
      // 选项写法
      // "/api": {
      //   target: "http://jsonplaceholder.typicode.com",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },
    },
  },
  // 打包相关规则
  build: {
    target: "es2020", //指定es版本,浏览器的兼容性
    outDir: "dist", //指定打包输出路径
    assetsDir: "assets", //指定静态资源存放路径
    cssCodeSplit: true, //css代码拆分,禁用则所有样式保存在一个css里面
    sourcemap: false, //是否构建source map 文件
    terserOptions: {
      // 生产环境移除console
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  plugins: [
    vue(),
    viteCompression({
      verbose: false,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
    styleImport({
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            name = name.slice(3);
            return `element-plus/packages/theme-chalk/src/${name}.scss`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        },
      ],
    }),
  ],
});
