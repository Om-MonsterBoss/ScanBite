import { config } from "./config.js";

const transporter =
    nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,

        auth: {
            user: config.auth_email,
            pass: config.auth_pass
        }
    });


    export const welcomeMail = async (fullName, email) => {
    try {


        await transporter.sendMail({

            from: `"Helloo from ," <${config.AUTH_EMAIL}>`,

            to: email,

            subject: "Welcome to MultiVendor Marketplace 🎉",

            html: `
        <div style="
            max-width:600px;
            margin:auto;
            background:#ffffff;
            border-radius:12px;
            overflow:hidden;
            font-family:Arial,sans-serif;
            border:1px solid #e5e7eb;
        ">

            <div style="
                background:#111827;
                color:white;
                padding:30px;
                text-align:center;
            ">
                <h1>MultiVendor Marketplace</h1>
            </div>

            <div style="padding:40px;">

                <h2>
                    Welcome, ${fullName} 🎉
                </h2>

                <p>
                    Your email has been successfully verified and your account is now active.
                </p>

                <p>
                    We're excited to have you as part of the MultiVendor Marketplace community.
                </p>

                <div style="
                    margin:30px 0;
                    background:#f3f4f6;
                    border-radius:8px;
                    padding:24px;
                ">

                    <h3 style="
                        margin-top:0;
                        color:#111827;
                    ">
                        What's Next?
                    </h3>

                    <ul style="
                        color:#4b5563;
                        line-height:1.8;
                        padding-left:20px;
                    ">
                        <li>Browse products from multiple vendors</li>
                        <li>Create your own wishlist</li>
                        <li>Track orders in real time</li>
                        <li>Become a seller and open your store</li>
                        <li>Receive personalized recommendations</li>
                    </ul>

                </div>

                <div style="
                    text-align:center;
                    margin:30px 0;
                ">

                    <a href="https://your-domain.com"
                       style="
                        display:inline-block;
                        background:#111827;
                        color:white;
                        text-decoration:none;
                        padding:14px 28px;
                        border-radius:8px;
                        font-weight:bold;
                       ">
                        Explore Marketplace
                    </a>

                </div>

                <p>
                    Thank you for choosing MultiVendor Marketplace.
                </p>

                <p>
                    Happy Shopping!
                </p>

            </div>

            <div style="
                background:#f9fafb;
                padding:20px;
                text-align:center;
                color:#6b7280;
                font-size:12px;
            ">
                © 2026 MultiVendor Marketplace.
                All rights reserved.
            </div>

        </div>
        `
        });

    } catch (error) {

        console.log(
            "Error while sending welcome email:",
            error.message
        );

    }


};
