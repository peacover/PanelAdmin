// import { Role } from "@prisma/client";
// import { Html, Heading, Text } from "@react-email/components";
// const EmailTemplate = ({
//   name,
//   email,
//   password,
//   role,
// }: {
//   name: string;
//   email: string;
//   password: string;
//   role: string;
// }) => {
//   return (
//     <Html lang="en">
//       <Heading as="h1">Welcome to PanelAdmin</Heading>
//       <Text>Hi {name},</Text>
//       <Text>
//         You have been added as
//         {role === Role.SUPERADMIN ? (
//           <span className="font-bold">a Super Admin</span>
//         ) : (
//           <span className="font-bold">an Admin</span>
//         )}
//         in PanelAdmin Platform
//       </Text>
//       <Text>Your email is: {email}</Text>
//       <Text>
//         Your password is:
//         <span className="font-bold">{password}</span>
//       </Text>
//       <Text>Use this email and password to login</Text>
//       <Text>Best Regards,</Text>
//       <Text>PanelAdmin Team</Text>
//       {/* Please don't reply to this email, as we can't review or respond to messages at this address. */}
//       <Text>
//         <a href="https://paneladmin.com">PanelAdmin.com</a>
//       </Text>
//     </Html>
//   );
// };
// export default EmailTemplate;


import { Role } from "@prisma/client";
import { Html, Heading, Text, Link } from "@react-email/components";

const EmailTemplate = ({
  name,
  email,
  password,
  role,
}: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const isAdmin = role === Role.ADMIN;
  const roleText = isAdmin ? "Admin" : "Super Admin";

  return (
    <Html lang="en">
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f8f8f8' }}>
        <Heading as="h1" style={{ color: '#333' }}>Welcome to PanelAdmin</Heading>

        <Text style={{ color: '#555', fontSize: '16px', marginTop: '10px' }}>
          Hi <span style={{ fontWeight: 'bold' }}>{name}</span>,
        </Text>

        <Text style={{ color: '#555', fontSize: '16px' }}>
          You've been added as{" "}
          <span style={{ fontWeight: 'bold' }}>{isAdmin ? "an" : "a"} {roleText}</span> in the PanelAdmin Platform.
        </Text>

        <Text style={{ color: '#555', fontSize: '16px', marginTop: '30px' }}>Your email: <span style={{ fontWeight: 'bold' }}>{email}</span></Text>

        <Text style={{ color: '#555', fontSize: '16px' }}>
          Your password: <span style={{ fontWeight: 'bold' }}>{password}</span>
        </Text>

        <Text style={{ color: '#555', fontSize: '16px', marginTop: '50px' }}>
          Best Regards,
        </Text>
        <Text style={{ color: '#555', fontSize: '16px' }}>PanelAdmin Team</Text>

        <Text style={{ color: '#555', fontSize: '14px', marginTop: '10px' }}>
          If you have any questions, visit our website{" "}
          <Link href="https://www.paneladmin.website" style={{ color: '#007BFF' }}>paneladmin.website</Link>.
        </Text>

        <Text style={{ color: '#777', fontSize: '12px', marginTop: '20px' }}>
          Please don't reply to this email, as we can't review or respond to messages at this address.
        </Text>
      </div>
    </Html>
  );
};

export default EmailTemplate;
