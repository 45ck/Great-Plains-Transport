import '../styles/globals.css'
import '../styles/sandstone.bootstrap.css'
import MainNavbar from '../components/Navbar'
import { SSRProvider } from 'react-bootstrap'
import OurFooter from '../components/Footer'
import { DefaultSeo } from 'next-seo'
import { CookiesProvider, Cookies } from 'react-cookie'
import App from "next/app";
import DemonstrationWarning from '../components/DemonstrationWarning'
import React, { useEffect, useState } from 'react'

// global context for all pages that can tell the
// page to render for mobile or desktop.
export const IsVerticalContext = React.createContext();

function MyApp({ Component, pageProps, cookies }) {

  // if it is a vertical screen that most likely it's mobile.
  // if its not a vertical screen that most likely its on desktop. 

  const [isVerticalScreen, setIsVerticalScreen] = useState(false);

  const onWindowResize = () => {
    if (window.innerWidth <= 1000)
      setIsVerticalScreen(true);
    else
      setIsVerticalScreen(false);
  };

  useEffect(() => {
    addEventListener("resize", onWindowResize);
    onWindowResize();
  }, []);

  // cookies get browser 

  const isBrowser = typeof window !== "undefined";

  return (<>
    <IsVerticalContext.Provider value={{ isVerticalScreen, setIsVerticalScreen }}>
      <SSRProvider>
        <CookiesProvider cookies={isBrowser ? undefined : new Cookies(cookies)}>
          <DefaultSeo
            titleTemplate='%s - Great Plains Transport'
            defaultTitle='Great Plains Transport'
            description='Great Plains Transport is a full-service transportation company that provides high-quality, affordable transportation 
      services to businesses in Australia. Our team of experienced professionals is dedicated to providing reliable, efficient transportation for any type of 
      cargo.'
            languageAlternates={["English"]}
            openGraph={{
              type: 'website',
              locale: 'en_AU',
              url: 'https://greatplainstransport.com.au/',
              siteName: 'Great Plains Transport',
            }}
            twitter={{
              handle: '@handle',
              site: '@site',
              cardType: 'summary_large_image',
            }}
          />

          <MainNavbar />
          <Component {...pageProps} />
          <DemonstrationWarning />
          <OurFooter />
        </CookiesProvider>
      </SSRProvider>
    </IsVerticalContext.Provider>
  </>)
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps, cookies: appContext.ctx.req?.headers?.cookie };
};

export default MyApp
