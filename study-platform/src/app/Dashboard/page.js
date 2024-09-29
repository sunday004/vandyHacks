// pages/new-page.js
import Head from 'next/head';

export default function NewPage() {
  return (
    <div>
      <Head>
        <title>New Page Title</title>
        <meta name="description" content="Description for your new page" />
      </Head>
      <ul>
        <li><button>Practice</button></li>
        <li><button>Play</button></li>
      </ul>
      <h1></h1>
      <p>This is the content of your new page.</p>
    </div>
  );
}