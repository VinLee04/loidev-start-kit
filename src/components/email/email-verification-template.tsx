// components/email/email-verification-template.tsx

type Props = {
  name: string
  email: string
  otp: string
}

const appName = process.env.APP_NAME || 'Lợi Dev Start Kit'
const appUrl = process.env.BETTER_AUTH_URL

// Desktop mặc định: nút inline-block, giới hạn max 260px, không kéo hết chiều rộng cột
const buttonStyle = {
  display: 'inline-block',
  width: '100%',
  maxWidth: 260,
  boxSizing: 'border-box' as const,
  padding: '12px 16px',
  color: '#ffffff',
  textDecoration: 'none',
  borderRadius: 6,
  fontWeight: 600,
  fontSize: 14,
  textAlign: 'center' as const,
  whiteSpace: 'nowrap' as const,
}

export function EmailVerificationTemplate({ name, otp, email }: Props) {
  const verifyUrl = `${appUrl}/sign-in?email=${encodeURIComponent(email)}&status=auto-verify&otp=${encodeURIComponent(otp)}`

  return (
    <html>
      <head>
        <style>
          {`
            @media only screen and (max-width: 480px) {
              .btn-cell {
                display: block !important;
                width: 100% !important;
                padding: 0 0 8px 0 !important;
              }
              .btn-link {
                max-width: 100% !important;
              }
            }
          `}
        </style>
      </head>
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
          <h2 style={{ marginBottom: 4 }}>Welcome, {name} 👋</h2>
          <p>Thanks for signing up on {appName}.</p>

          <p>Use the code below to verify your email address:</p>
          <p style={{ fontSize: 28, fontWeight: 700, letterSpacing: 4 }}>
            {otp}
          </p>
          <p style={{ color: '#6B7280', fontSize: 13 }}>
            This code will expire shortly. If you didn't request this, you can
            ignore this email.
          </p>

          <table
            style={{ marginTop: 20, width: '100%', borderCollapse: 'collapse' }}
          >
            <tbody>
              <tr>
                <td
                  className="btn-cell"
                  style={{
                    width: '50%',
                    padding: '0 4px 8px 4px',
                    textAlign: 'center',
                  }}
                >
                  <a
                    className="btn-link"
                    style={{ ...buttonStyle, backgroundColor: '#8C56D4' }}
                    href={appUrl}
                  >
                    View Website 🚀
                  </a>
                </td>
                <td
                  className="btn-cell"
                  style={{
                    width: '50%',
                    padding: '0 4px 8px 4px',
                    textAlign: 'center',
                  }}
                >
                  <a
                    className="btn-link"
                    style={{ ...buttonStyle, backgroundColor: '#2E2910' }}
                    href={verifyUrl}
                  >
                    Automatically Verify ✔️
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

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
