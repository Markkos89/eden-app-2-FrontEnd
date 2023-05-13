import { withAuth } from "next-auth/middleware";

// type decodedType = {
//   exp: number;
//   iat: number;
//   _id: string;
//   discordName: string;
//   accessLevel: number;
// };

// type edenTokenType = {
//   edenToken: string;
//   error: string;
// };

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      console.log(req.nextUrl.pathname, { token });

      // if (token?.edenToken) {
      //   // `/admin` requires some access level
      //   // if (
      //   //   req.nextUrl.pathname === "/admin" ||
      //   //   req.nextUrl.pathname === "/admin/party-rooms" ||
      //   //   req.nextUrl.pathname === "/admin/error-log"
      //   // ) {
      //   //   const edenToken = token.edenToken as edenTokenType;
      //   //   let decoded: decodedType;

      //   //   if (Boolean(edenToken.error)) {
      //   //     return false;
      //   //   }
      //   //   if (edenToken.edenToken) {
      //   //     decoded = jwtDecode<decodedType>(edenToken.edenToken);
      //   //     const result = !Boolean(decoded.accessLevel > 5);

      //   //     console.log({ result });
      //   //     return result;
      //   //   }
      //   // }

      //   if (token?.accessTokenExpires) {
      //     const accessTokenExpires = token.accessTokenExpires as number;

      //     if (accessTokenExpires && Date.now() < accessTokenExpires) {
      //       return true;
      //     }
      //   }
      // }

      // requires the user to be logged in
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/dashboard", "/home", "/admin/:path*", "/interview"],
};
