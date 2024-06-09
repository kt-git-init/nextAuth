import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrpytjs from "bcryptjs";

// Send email function
interface SendEmailProps {
  email: string;
  emailType: string;
  userId: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailProps) => {
  try {
    const hashedToken = await bcrpytjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "13c270868a22c2",
        pass: "1ddb34ba818e85",
      },
    });

    const mailOptions = {
      from: "kunal@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href = "${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> Here </a> to ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Passwrod"} or copy paste the link below in your broswer.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`, // html body
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
