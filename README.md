TODO: 
1. Enforce HTTPS
2. Implement Oauth, MFA, and rate limiting to prevent brute force attacks
3. Enforce a stronger password policy and salting 
4. Add more input validation to prevent SQL injection and XSS attack, both on the client and server side
5. Manage the JWT tokens more securely 
6. Implement a CSP policy to prevent XSS attacks further 
7. Enforce security audits for dependencies to prevent SSRF attacks (manipulation of version numbers) 
8. Define a stricter CORS policy to prevent CSRF attacks 
9. Add Anti-CSRF tokens to prevent CSRF attacks 
10. Add re-authentication logic for sensitive actions 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

