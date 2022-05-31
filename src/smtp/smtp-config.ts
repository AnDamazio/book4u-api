export const SMTP_CONFIG = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    user: 'book4u.company.contact@gmail.com',
    pass: String(process.env.SMTP_PASSWORD)
}