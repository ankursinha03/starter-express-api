const nodemailer = require("nodemailer");
const redis = require("redis");
require("dotenv").config({ path: "../env/.env" });

var redisConn = false;

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

client.connect();

client.on("error", (err) => {
  redisConn = false;
});

client.on("ready", () => {
  redisConn = true;
  // console.log("ready");
});

const n = process.env.TOTAL_MAILS;
let i = 1;

const sendMail = async (name, rollNo, email, otp, reset) => {
  console.log(redisConn);
  if (redisConn) {
    // console.log("using redis");
    const exists = await client.exists("mail-i");

    if (exists) {
      i = await client.get("mail-i");
      // console.log(i);
    }
  }
  console.log(i);

  const EMAIL = eval("process.env.MAIL_" + i);
  // console.log(EMAIL);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: eval("process.env.CLIENTID_" + i),
      clientSecret: eval("process.env.CLIENTSECRET_" + i),
      refreshToken: eval("process.env.REFRESHTOKEN_" + i),
      accessToken: eval("process.env.ACCESSTOKEN_" + i),
      expires: 1484314697598,
    },
  });

  i = (i % n) + 1;

  if (redisConn) {
    await client.set("mail-i", i.toString());
  }

  console.log("sending mail to", email);
  let emailBody;
  if (reset) {
    emailBody = `Hi ${name} (${rollNo}),\n\nThe One Time Password (OTP) for your Orientation ‘21 App is: ${otp}\n\nRegards,\nSpider R&D Club, NIT-T`;
  } else {
    emailBody = `Hi ${name} (${rollNo}),\n\nWelcome to NIT Trichy!\nThe One Time Password (OTP) to reset your Orientation account's password is: ${otp}\n\nRegards,\nSpider R&D Club, NIT-T`;
  }

  const info = await transporter.sendMail({
    from: EMAIL,
    to: email,
    subject: "Your OTP for Orientation'21 App",
    text: emailBody,
  });

  return { status: "success", info: info };
};

module.exports = sendMail;
