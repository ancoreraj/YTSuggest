const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    });

    // const accessToken = await new Promise((resolve, reject) => {
    //     oauth2Client.getAccessToken((err, token) => {
    //         if (err) {
    //             reject();
    //         }
    //         resolve(token);
    //     });
    // });

    let accessToken;

    oauth2Client.getToken((err, tokens) => {
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        if (err) {
            accessToken = tokens
        } else {
            console.log(err)
        }
    });



    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            accessToken,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
        }
    });

    transporter.verify((err, success) => {
        err
            ? console.log(err)
            : console.log(`==server is ready to send message: ${success}==`);
    })

    return transporter;
};

const send = async (emailOptions) => {

    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(emailOptions);
    console.log(`Email Sent`);
};

module.exports = send
