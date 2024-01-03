// import '../styles/globals.css'
// // import { SessionProvider } from 'next-auth/react'

// function MyApp({ Component, pageProps }) {
//   return (
//     // <SessionProvider session={pageProps.session}>
//     <>
//       <Component {...pageProps} />
//       {/* </SessionProvider> */}
//     </>
//   )
// }

// export default MyApp

import React, { useState } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps, session }) {
  return <Component {...pageProps} session={session} />;
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  // Retrieve the token from local storage
  const session = typeof window !== 'undefined' && localStorage.getItem('token') ? localStorage.getItem('token') : '';

  // Call getInitialProps on the child component if it exists
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  return { pageProps, session };
};

export default MyApp;

