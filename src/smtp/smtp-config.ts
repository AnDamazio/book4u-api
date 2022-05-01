export const SMTP_CONFIG = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    user: 'kagamifv4@gmail.com',
    pass: String(process.env.SMTP_PASSWORD)
}