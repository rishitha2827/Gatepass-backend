const axios = require("axios");

exports.sendPassEmail = async (email, passId, qrCode) => {
  await axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: { name: "College Gate Pass", email: "your_email@domain.com" },
      to: [{ email }],
      subject: "Your Gate Pass",
      htmlContent: `<p>Your pass ID is <strong>${passId}</strong>.</p><p>Show this QR code to the watchman:</p><img src="${qrCode}" />`
    },
    {
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
};
