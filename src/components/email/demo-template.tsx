interface EmailTemplateProps {
  name: string
  message: string
}

export function DemoEmailTemplate({ name, message }: EmailTemplateProps) {
  return (
    <div>
      <h1>Xin chào, {name}!</h1>
      <p>Bạn có một lời nhắn:</p>
      <p>{message}</p>
    </div>
  )
}
