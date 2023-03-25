import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: { params: { scope: "user" } }
        }),
    ],
    session: {
        jwt: true,
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        signingKey: {"kty":"oct","kid":"zr7JKus0hbDhXkkaMUyvHfgKOwTiOkiKdAItDZnMg-k","alg":"HS512","k":"OY_kSrD8GK9bY6qHswpMIr85IsCBs-6a5qQQrjrO-2c"},
        verificationOptions: {
          algorithms: ["HS512"]
        }
    },
}

const AuthRes = (req, res) => NextAuth(req, res, options);
export default AuthRes;
