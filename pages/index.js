import { Inter } from "@next/font/google";
import { useSession } from "next-auth/react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const session = useSession();
  console.log(session);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h3>home page</h3>
        <a
          href="https://expo.dev/artifacts/eas/qYqRQK8adVa7SF3ERB1PA4.apk"
          download={true}
        >
          download
        </a>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus
          quibusdam dolor consequatur quas ipsam unde dicta sit quis dignissimos
          atque corporis repellat porro saepe ullam esse laboriosam omnis,
          blanditiis reiciendis delectus? Iure repellat excepturi illum
          praesentium temporibus porro deserunt soluta dolor tenetur dolorem,
          est dolores sequi minus voluptatibus enim aut?
        </p>
      </main>
    </>
  );
}
