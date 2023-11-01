const { sequelize } = require("./models")
require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const bearerToken = require("express-bearer-token");

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
// app.use(
//   cors({
//     origin: [
//       process.env.WHITELISTED_DOMAIN &&
//       process.env.WHITELISTED_DOMAIN.split(","),
//     ],
//   })
// );

app.use(express.json());
app.use(bearerToken());
app.use((req, res, next) => {
  console.log(req?.headers?.authorization)
  next();
})

//#region API ROUTES

// ===========================
// NOTE : Add your routes here
const { usersRouter } = require('./routers');
app.use('/api/users', usersRouter);


app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

app.use(express.static('src/public'))

const { productsRouter, branchRouter, cartRouter } = require('./routers');
const { log } = require("handlebars");
app.use('/api/products', productsRouter)
app.use('/api/branch', branchRouter)
app.use('/api/cart', cartRouter)

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
// app.use((err, req, res, next) => {
//   if (req.path.includes("/api/")) {
//     console.error("Error : ", err.stack);
//     res.status(500).send("Error!");
//   } else {
//     next();
//   }
// });

//#endregion

// #region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
    // sequelize.sync({ alter: true })
  }
});

// centralized Error handling
app.use((err, req, res, next) => {
  const statusCode = err.status || 500
  const statusMessage = err.message || 'Error'

  return res.status(statusCode).send({
    isError: true,
    message: statusMessage,
    data: null
  })
})