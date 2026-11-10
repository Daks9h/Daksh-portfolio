/**
 * Vercel Serverless Function: /api/contact
 * Handles contact form submissions and delivers emails via Resend.
 */
export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required fields.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.RESEND_RECIPIENT_EMAIL || 'dakshlalwani89@gmail.com';

    if (!apiKey) {
      console.error('RESEND_API_KEY environment variable is not defined.');
      return res.status(500).json({ error: 'Server configuration error: email service key is missing.' });
    }

    const sanitizedName = String(name).trim();
    const sanitizedEmail = String(email).trim();
    const sanitizedMessage = String(message).trim();

    const emailPayload = {
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [recipientEmail],
      reply_to: sanitizedEmail,
      subject: `New Portfolio Message from ${sanitizedName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #07090e; color: #f8fafc; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #090e18, #0e1626); padding: 24px; border-bottom: 1px solid rgba(6,182,212,0.3);">
            <h2 style="margin: 0; color: #38bdf8; font-size: 20px; font-weight: 700; letter-spacing: 0.05em;">New Message from Portfolio Website</h2>
            <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 13px;">Received via Daksh Lalwani's Developer Portfolio Contact Console</p>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #94a3b8; font-size: 13px; width: 100px;">Sender:</td>
                <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${sanitizedName.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Email:</td>
                <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${sanitizedEmail}" style="color: #38bdf8; text-decoration: none;">${sanitizedEmail.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Time:</td>
                <td style="padding: 8px 0; color: #cbd5e1; font-size: 13px;">${new Date().toUTCString()}</td>
              </tr>
            </table>
            
            <div style="margin-top: 16px;">
              <p style="color: #94a3b8; font-size: 13px; margin: 0 0 8px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Message Body:</p>
              <div style="background: #0d111a; border: 1px solid rgba(255,255,255,0.08); border-left: 3px solid #06b6d4; border-radius: 6px; padding: 16px; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${sanitizedMessage.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
            </div>
          </div>
          <div style="background: #05070a; padding: 16px 24px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: #64748b;">
            Hit "Reply" in your email client to respond directly to ${sanitizedName} (${sanitizedEmail}).
          </div>
        </div>
      `,
    };

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    const resendData = await resendRes.json();

    if (!resendRes.ok) {
      console.error('Resend API error:', resendData);
      return res.status(resendRes.status).json({
        error: resendData.message || 'Failed to dispatch email via Resend.',
      });
    }

    return res.status(200).json({ success: true, id: resendData.id });
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

