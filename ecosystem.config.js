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
        NODE_ENV: 'development',
        API_URL: 'https://api-nemrh-test.cmt-saudi.com/api/',
        SOCKET_URL: 'https://api-nemrh-test.cmt-saudi.com:3303',
      },
      env_production: {
        NODE_ENV: 'production',
        API_URL: 'https://nova.nemmra.com/api/',
        SOCKET_URL: 'https://nova.nemmra.com:3304',
      },
    },
  ],
}
