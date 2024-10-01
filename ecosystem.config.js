module.exports = {
  apps: [
    {
      name: 'nemrh_website',
      exec_mode: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      max_memory_restart: '100M',
      watch: true,
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 3014,
      },
    },
  ],
}
