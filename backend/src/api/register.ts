import jwt from "jsonwebtoken";
import { mutate_handler, query_handler } from "../config/orma";

const jwt = require("jsonwebtoken");
const cryptoRandomString = require("crypto-random-string");
const VerificationToken = require("../models/verificationToken.ts");
const verificationService = require("../services/verificationService.ts");

export const send_verification_email = async (email) => {
  if (!email) {
    return Promise.reject("Email required");
  }

  const verificationToken = await VerificationToken.create({
    email: email,
    token: cryptoRandomString({ length: 20, type: "url-safe" }),
    created_at: new Date(),
    updated_at: new Date(),
  });
  //jwt token
  let jwtTokenEmailVerify = jwt.sign({ email: email }, "secret", {
    expiresIn: "1h",
  });
  //sending verificaiton email
  await verificationService.sendVerificationEmail(
    email,
    verificationToken.dataValues.token,
    jwtTokenEmailVerify
  );

  return {
    message: `You have registered successfully! Activation link sent to: ${email}`,
  };
};

export const verify_email = async (res, email, token) => {
  try {
    const $where: any = {
      $eq: ["email", { $escape: email }],
    };

    const query = {
      users: {
        id: true,
        email: true,
        is_verified: true,
        $where,
      },
    };

    const { users } = (await query_handler(query)) as any;

    if (users.length > 1) {
      return res
        .status(400)
        .send(
          "Error: More than 1 user is currently associated with this email"
        );
    }
    const foundUser = users[0];
    if (foundUser.is_verified) {
      return res.status(200).send("You already activated your account!");
    } else {
      const foundToken = await VerificationToken.findOne({
        where: { token: token },
      });
      if (foundToken) {
        // once email has been verified, set is_verified to true
        const user = { ...foundUser, is_verified: true };
        const mutation = {
          $operation: "update",
          users: [user],
        };

        // mutate_response is initialised solely for debugging purposes
        // console log it to check users that were mutated
        const mutate_response = await mutate_handler(mutation);
        // console.log({ mutate_response });

        return res.status(200).send(`Email verified! :)`);
      } else {
        return res.status(404).send("Token expired");
      }
    }
  } catch (err) {
    // console.log({ err });
    return res.status(404).send("Email not found!");
  }
};
