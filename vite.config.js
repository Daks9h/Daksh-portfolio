import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function contactDevApiPlugin() {
  return {
    name: 'contact-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/contact' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const { name, email, message } = JSON.parse(body || '{}');
              if (!name || !email || !message) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Name, email, and message are required fields.' }));
                return;
              }

              const env = loadEnv('development', process.cwd(), '');
              const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
              const recipientEmail = env.RESEND_RECIPIENT_EMAIL || process.env.RESEND_RECIPIENT_EMAIL || 'dakshlalwani89@gmail.com';

              if (!apiKey) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Server configuration error: RESEND_API_KEY is missing from environment (.env).' }));
                return;
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
                      <h2 style="margin: 0; color: #38bdf8; font-size: 20px; font-weight: 700;">New Message from Portfolio Website</h2>
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
                        <p style="color: #94a3b8; font-size: 13px; margin: 0 0 8px 0; font-weight: 600; text-transform: uppercase;">Message Body:</p>
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
              res.statusCode = resendRes.status;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(resendData));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Internal Server Error' }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), contactDevApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
