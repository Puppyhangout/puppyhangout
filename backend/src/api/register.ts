import jwt from "jsonwebtoken";
import { query_handler } from "../config/orma";

const jwt = require("jsonwebtoken");
const cryptoRandomString = require("crypto-random-string");
const VerificationToken = require("../models/verificationToken.js");
const verificationService = require("../services/verificationService.js");

export const send_verification_email = async (email) => {
  console.log({ email });
  if (!email) {
    return Promise.reject("Email required");
  }

  const verificationToken = await VerificationToken.create({
    username: email,
    token: cryptoRandomString({ length: 20, type: "url-safe" }),
    createdat: new Date(),
    updatedat: new Date(),
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
    message: `You have Registered Successfully, Activation link sent to: ${email}`,
  };
};

export const verify_email = async (email, token) => {
  // TODO: Add in isVerified field
  try {
    const $where: any = {
      $eq: ["email", { $escape: email }],
    };
    const query = {
      users: {
        id: true,
        email: true,
        password: true,
        first_name: true,
        user_info: {
          photo_url: true,
          max_match_dist: true,
          lastcheckmsg: true,
        },
        is_verified: true,
        $where,
      },
    };

    const { foundUser } = (await query_handler(query)) as any;
    if (foundUser.isVerified) {
      return { message: "You already activated your account!" };
    } else {
      const foundToken = await VerificationToken.findOne({
        where: { token: token },
      });
      if (foundToken) {
        console.log("Token found!");
        // await User.update(
        //   { isVerified: true },
        //   { returning: true, where: { email: email } }
        // );

        // return res
        //   .status(200)
        //   .send(`Account associated with email ${email} has been Activated!`);
      } else {
        // return res.status(404).send("Token expired");
      }
    }
  } catch (err) {
    console.log("Email not found!");
    // return res.status(404).send("Email not found");
  }
};
