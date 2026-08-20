// components/email/forget-password-template.tsx

type Props = {
  name: string
  email: string
  otp: string
}

const appName = process.env.APP_NAME || 'Lợi Dev Start Kit'
const appUrl = process.env.BETTER_AUTH_URL

const buttonStyle = {
  display: 'block',
  width: '100%',
  maxWidth: 260,
  margin: '0 auto',
  boxSizing: 'border-box' as const,
  padding: '12px 16px',
  color: '#ffffff',
  textDecoration: 'none',
  borderRadius: 6,
  fontWeight: 600,
  fontSize: 14,
  textAlign: 'center' as const,
}

export function ForgetPasswordTemplate({ name, email, otp }: Props) {
  // Link đưa thẳng người dùng tới trang reset password với email + otp
  // đã điền sẵn trên URL, form phía client tự đọc query để auto-fill OTP.
  const resetUrl = `${appUrl}/sign-in?status=reset-password&email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`

  return (
    <html>
      <body>
        <div
          style={{
            fontFamily: 'sans-serif',
            lineHeight: 1.6,
            width: 600,
            maxWidth: '90%',
            margin: '0 auto',
            padding: 20,
            color: '#111827',
          }}
        >
          <h2 style={{ marginBottom: 4 }}>Hi, {name} 👋</h2>
          <p>
            We received a request to reset the password for your account (
            {email}) on {appName}.
          </p>

          <p>Use the code below to reset your password:</p>
          <p style={{ fontSize: 28, fontWeight: 700, letterSpacing: 4 }}>
            {otp}
          </p>
          <p style={{ color: '#6B7280', fontSize: 13 }}>
            This code will expire shortly. If you didn't request this, you can
            safely ignore this email, your password will not be changed.
          </p>

          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <a
              style={{ ...buttonStyle, backgroundColor: '#2E2910' }}
              href={resetUrl}
            >
              Automatically Fill Code ✔️
            </a>
          </div>

          <hr
            style={{
              margin: '32px 0',
              border: 'none',
              borderTop: '1px solid #E5E7EB',
            }}
          />

          <table>
            <tbody>
              <tr>
                <td style={{ verticalAlign: 'middle', paddingRight: 8 }}>
                  {process.env.APP_LOGO_URL && (
                    <img
                      src={process.env.APP_LOGO_URL}
                      alt={appName}
                      width={24}
                      height={24}
                      style={{ borderRadius: 4, display: 'block' }}
                    />
                  )}
                </td>
                <td
                  style={{
                    verticalAlign: 'middle',
                    fontSize: 12,
                    color: '#9CA3AF',
                  }}
                >
                  {appName} · {new Date().getFullYear()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  )
}
