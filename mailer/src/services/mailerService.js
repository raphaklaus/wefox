import nodemailer from 'nodemailer'

export const sendMail = async ({ to, text }) => {
  const testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || testAccount.user,
      pass: process.env.SMTP_PASS || testAccount.pass
    }
  })

  return transporter.sendMail({
    from: '"Wefox 🦊" <support@wefox.com>',
    subject: 'Weather Notification',
    to,
    text
  })
}
