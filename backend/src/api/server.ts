import cors from "cors";
import express from "express";
import { handler } from "express_phandler";
import { mutate_handler, query_handler } from "../config/orma";
import { introspect } from "../scripts/introspect";
import { login_user } from "./login";
import { send_verification_email, verify_email } from "./register";

const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3001;

export const start = async (env: "production" | "development") => {
  const app = express();
  await introspect(env);

  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // middleware to verify json web tokens
  app.use("/api", function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
      return;
    }

    let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    if (token) {
      jwt.verify(token, "secret", (err, decoded) => {
        if (err) {
          return res.status(401).send({
            success: false,
            message: "Token is not valid",
          });
        } else {
          req.decoded = decoded;
          next();
          return;
        }
      });
    } else {
      return res.status(401).send({
        success: false,
        message: "Auth token is not supplied",
      });
    }
  });

  app.post(
    "/login",
    handler((req, res) => {
      return login_user(req.body.email, req.body.password);
    })
  );

  app.post(
    "/query",
    handler(async (req, res) => {
      const results = await query_handler(req.body);
      return results;
    })
  );

  app.post(
    "/mutate",
    handler(async (req) => mutate_handler(req.body))
  );

  app.post(
    "/send_verification_email",
    handler(async (req) => send_verification_email(req.body.email))
  );

  app.get("/api/verify_email", async (req, res) =>
    verify_email(res, req.query.email, req.query.token)
  );

  await new Promise((r) => app.listen(port, r as any));
  console.log(`Listening started on port ${port}`);
};

// Override default nodejs default uncaught exception behaviour
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

process.on("uncaughtException", (e) => {
  console.log(e);
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("Bye bye!");
  process.exit();
});
