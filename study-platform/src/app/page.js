import Image from "next/image";


export default function Home() {
  return (
    <div>
      <button>Get Started</button>
    </div>
  );
}
export function NewPage () {
  return (
    <div>
      <Head>
        <title>New Page Title</title>
        <meta name="description" content="Description for your new page" />
      </Head>
      <h1>Welcome to the New Page!</h1>
      <p>This is the content of your new page.</p>
    </div>
  );
}