import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/documentinatorLogo-192.png"></link>
          <meta name="theme-color" content="#000" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta name="HandheldFriendly" content="true" />

          <link rel='apple-touch-startup-image' href='/splashScreens/apple_splash_2048.png' sizes='2048x2732' />
          <link rel='apple-touch-startup-image' href='/splashScreens/apple_splash_1668.png' sizes='1668x2224' />
          <link rel='apple-touch-startup-image' href='/splashScreens/apple_splash_1536.png' sizes='1536x2048' />
          <link rel='apple-touch-startup-image' href='/splashScreens/apple_splash_1125.png' sizes='1125x2436' />
          <link rel='apple-touch-startup-image' href='/splashScreens/apple_splash_1242.png' sizes='1242x2208' />
          <link rel='apple-touch-startup-image' href='/splashScreens/apple_splash_750.png' sizes='750x1334' />
          <link rel='apple-touch-startup-image' href='/splashScreens/apple_splash_640.png' sizes='640x1136' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
