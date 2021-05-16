module.exports = {
  apps: [
    {
      name: "MinqBot",
      script: "index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      interpreter: "node@11.15.0",
      max_memory_restart: "1G",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      user: "root",
      host: "gb.lenyapugachev.com",
      key: "~/.ssh/id_rsa",
      ref: "origin/master",

      repo: "git@github.com:alek-sai/minqbot.git",
      path: "/var/www/minqbot",
      "post-deploy":
        "npm i && ./node_modules/pm2/bin/pm2 start ecosystem.config.js --env production",
    },
  },
};
