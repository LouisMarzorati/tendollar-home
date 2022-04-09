import sendgrid from "@sendgrid/mail";
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  const { email, description } = req.body;
  if (req.method === "POST") {
    const emailReq = await sendgrid.send({
      to: "louismarzorati@gmail.com",
      from: "hi@tendollar.site",
      subject: `New Ten Dollar Site Purchase from ${email}`,
      replyTo: email,
      html: `${email} purchased \"<b> ${description}</b>\"`,
    });
    console.log(emailReq);
    res.status(200).send("OK");
  }
}
