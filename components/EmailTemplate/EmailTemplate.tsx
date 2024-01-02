import { Html, Heading, Text } from "@react-email/components"
const EmailTemplate = ({
  name,
  email,
  password
}: {
  name: string
  email: string
  password: string
}) => {
  return (
    <Html lang="en">
        <Heading as="h1">Welcome to PanelAdmin</Heading>
        <Text>Hi {name},</Text>
        <Text>You have been added as a user in PanelAdmin Platform</Text>
        <Text>Your email is: {email}</Text>
        <Text>Your password is: {password}</Text>
        <Text>Use this email and password to login</Text>
        <Text>Thanks</Text>
    </Html>
  )
}
export default EmailTemplate