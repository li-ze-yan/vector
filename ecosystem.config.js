module.exports = {
  apps: [
    {
      name: "vector",
      cwd: "/home/vector/project/vector",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      max_memory_restart: "800M",
      autorestart: true,
      watch: false,
      out_file: "/home/vector/.pm2/logs/vector-out.log",
      error_file: "/home/vector/.pm2/logs/vector-error.log",
      time: true,
    },
  ],
};
