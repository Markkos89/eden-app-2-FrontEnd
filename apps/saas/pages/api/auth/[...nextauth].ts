/* eslint-disable no-unused-vars */
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import NextAuth, { NextAuthOptions } from "next-auth";
// import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";

type decodedType = {
  exp: number;
  iat: number;
  _id: string;
  discordName: string;
  accessLevel: number;
};

type edenTokenType = {
  edenToken: string;
  error: string;
};

async function getEdenToken(
  accessToken: string
): Promise<edenTokenType | null> {
  const NEXT_PUBLIC_AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL;

  // try {
  const res = await fetch(`${NEXT_PUBLIC_AUTH_URL}/auth/token`, {
    method: "POST",
    body: JSON.stringify({ accessToken }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (data.edenToken) return data;
  return null;
  // } catch {
  // TODO: if the server is down, user still gets a session token but should be rejected

  // return null;
  // }
}

const providers: NextAuthOptions["providers"] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // authorization: { params: { scope: "identify guilds" } },
  }),
];

const callbacks: NextAuthOptions["callbacks"] = {
  // async signIn({ user, account, profile }) {
  //   console.log("---------------- SIGN IN ----------------");
  //   console.log({ user, account, profile });
  //   return true;
  // },
  async jwt({ token, user, account }) {
    if (account && user) {
      const _edenToken = await getEdenToken(account.id_token as string);

      return {
        uid: user.id,
        accessToken: account.id_token as string,
        accessTokenExpires:
          account.expires_at && ((account.expires_at * 1000) as number),
        edenToken: _edenToken,
      };
    }

    const accessTokenExpires = token.accessTokenExpires as number;

    // Discord and Eden tokens expire after 7 days, this will help force the user to re-authenticate within the getServerSideProps
    if (accessTokenExpires && Date.now() < accessTokenExpires) {
      return {
        ...token,
        error: null,
      };
    } else {
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }
  },
  async session({ session, token }) {
    if (session?.user) {
      session.user.id = token.uid as string;
    }

    session.error = token.error as string;

    if (token.edenToken) {
      const edenToken = token.edenToken as edenTokenType;
      let decoded: decodedType;

      if (edenToken.error) {
        session.error = edenToken.error;
        session.accessLevel = null;
      }

      if (edenToken.edenToken) {
        decoded = jwt_decode<decodedType>(edenToken.edenToken);
        session.accessLevel = decoded.accessLevel;
      }
    }
    return session;
  },
};

export const authOptions: NextAuthOptions = {
  debug: true,
  providers,
  callbacks,
  secret: process.env.NEXT_PUBLIC_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    // signIn: "/login",
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

export default NextAuth(authOptions);
