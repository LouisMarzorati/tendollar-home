import sendgrid from "@sendgrid/mail";
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default function handler(req,res) {
    const {email, description} = req.body;
    if (req.method === "POST") {
const emailReq = await sendgrid.send({
    to: "louismarzorati@gmail.com",
    from: "lou@tendollar.site",
    subject: `New Ten Dollar Site Purchase`,
    replyTo: email,
    html: `${email} purchased ${description}`,

  });
    console.log(emailReq);
    res.status(200).send("OK");
    }
}

    