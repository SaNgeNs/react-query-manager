const dotenv = require('dotenv');
const esbuild = require('esbuild');
const process = require('node:process');

dotenv.config();
const args = process.argv;

const config = {
  logLevel: 'info',
  entryPoints: ['example/index.tsx'],
  outfile: 'example/public/build/bundle.js',
  bundle: true,
};

if (args.includes('--start')) {
  esbuild
    .context({
      ...config,
      minify: false,
      sourcemap: true,
    })
    .then(async (ctx) => {
      await ctx.watch();
      await ctx.serve({
        servedir: 'example/public',
        onRequest: ({
          remoteAddress, method, path, status, timeInMS,
        }) => {
          console.info(remoteAddress, status, `"${method} ${path}" [${timeInMS}ms]`);
        },
      });
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
