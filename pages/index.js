import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = parseCookies({ req });
  const token = cookies.token;

  try {
    // Ensure JWT_SECRET is securely stored and not exposed to the client.
    jwt.verify(token, process.env.JWT_SECRET);

    // If the token is valid, return an empty props object (page will render).
    return { props: {} };
  } catch (err) {
    // If the token is invalid or not present, redirect to the login page.
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Note App</h1>
      {/* Securely rendered content for authenticated users, this is where the notes logic would live */}
    </div>
  );
}
