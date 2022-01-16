/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // css: {
  //   postcss: {
  //     plugins: [
  //       {
  //         postcssPlugin: 'internal:charset-removal',
  //         AtRule: {
  //           charset: (atRule) => {
  //             if (atRule.name === 'charset') {
  //               atRule.remove();
  //             }
  //           }
  //         }
  //       }
  //     ]
  //   }
  // },
  build: {
    chunkSizeWarningLimit: 1000
    // rollupOptions: {
    //   output: {
    //     // eslint-disable-next-line consistent-return
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //       }
    //     }
    //   }
    // }
  }
});
