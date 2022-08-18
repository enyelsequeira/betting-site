import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    const meta = {
      image: '/images/logo.svg',
      title: 'Gamble site',
      description: 'Site created for interview to show how to create a site with Next.js',
    };
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href={meta.image} sizes="32x32" />
          <meta name="title" content={meta.title} />
          <meta name="description" content={meta.description} />
          <meta name="robots" content="follow, index" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
        </Head>
        <body className="bg-primary-bg">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
