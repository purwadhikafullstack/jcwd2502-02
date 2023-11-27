module.exports = {
  apps: [
    {
      name: "JCWD-2502-02", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 2502,
        DB_USERNAME: "",
        DB_PASSWORD: "",
        DB_DATABASE: "",
        DB_HOST: "",
        TRANSPORTER_SERVICE: "",
        TRANSPORTER_EMAIL: "",
        TRANSPORTER_PASS: "",
        FE_BASEPATH: "https://jcwd250202.purwadhikabootcamp.com/"
      },
      time: true,
    },
  ],
};
