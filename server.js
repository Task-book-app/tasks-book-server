import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema.js";
import "./db/mongo-connect.js";
import config from "./config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authenticate from "./middlewares/authenticate.js";
import { getErrorCode } from "./util/errorConstants.js";

const app = express();
app.use(express.json({ limit: "10MB" }));
app.use(cors({ origin: config.frontendOrigin, credentials: true }));
app.use(cookieParser());
app.use(authenticate);

app.get("/", (req, res) => {
  res.send(`
  <h1>Tasks List Server</h1>
  <a href=${config.backendUrl}>👉 to graphql</a>
  `);
});

app.use("/graphql", (req, res) => {
  graphqlHTTP({
    schema,
    graphiql: true,
    customFormatErrorFn: (err) => {
      const error = getErrorCode(err.message);
      return { message: error.message, statusCode: error.statusCode };
    },
  })(req, res);
});

app.use((req, res, next) => {
  const error = new Error(`Looks like you are lost...`);
  error.status = 400;
  next(error);
});

app.listen(config.port, () => {
  console.log(`App listening 🦻 at http://localhost:8000`);
  console.log(`GraphQL listening at http://localhost:8000/graphql`);
});

app.use(function errorHandler(err, req, res, next) {
  // console.log("I am the old handler: =>", err.message);
  res.status(err.status || 400).send({
    error: {
      message: err.message || null,
      statusCode: err.status || null,
    },
  });
});
