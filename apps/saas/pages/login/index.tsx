import { LoginSection, SEO } from "@eden/package-ui";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

import wave from "../../public/wave.gif";

const LoginPage: NextPage = () => {
  return (
    <>
      <SEO title={``} />
      <LoginSection image={wave.src} />
    </>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  const { redirect } = ctx.query;

  let redirectUrl = "/home";

  if (
    redirect &&
    typeof redirect === "string" &&
    redirect.startsWith("_next")
  ) {
    redirectUrl = "/home";
  } else if (redirect && typeof redirect === "string") {
    redirectUrl = redirect;
  }

  if (session) {
    return {
      redirect: {
        destination: redirectUrl ? `/${redirectUrl}` : `/home`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
