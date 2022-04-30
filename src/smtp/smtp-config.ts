export const SMTP_CONFIG = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
}