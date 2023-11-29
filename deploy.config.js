module.exports = {
  apps: [
    {
      name: "JCWD-2502-02", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 2502,
        DB_USERNAME: "jcwd250202",
        DB_PASSWORD: "jcwd250202",
        DB_DATABASE: "jcwd250202",
        DB_HOST: "adminer2.purwadhikabootcamp.com",
        TRANSPORTER_SERVICE: "gmail",
        TRANSPORTER_EMAIL: "aryosetyotama27@gmail.com",
        TRANSPORTER_PASS: "vqqe bpez glsa vbzx",
        FE_BASEPATH: "https://jcwd250202.purwadhikabootcamp.com/",
      },
      time: true,
    },
  ],
};
