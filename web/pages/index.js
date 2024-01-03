import React, { useState } from 'react';
// import { getSession, useSession } from 'next-auth/react';
import Hero from '../components/Hero';
import Articles from '../components/Articles';
import Features from '../components/Features';
import Statistics from '../components/Statistics';
import Packages from '../components/Packages';
import Footer from '../components/Footer';
import Navbar2 from '../components/Navbar2';
import Head from 'next/head';
import Upload from '../components/Upload';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = ({ session }) => {
  // const [session, setSession] = useState(typeof window !== "undefined" && localStorage?.getItem("token") ? localStorage.getItem('token') : "");

  return (
    <div>
      <Head>
        <title>SwarBhaav - Transforming calls into actionable feedback.</title>
        <meta name="title" content="SwarBhaav - Transforming calls into actionable feedback." />
        <meta name="description" content="Catalyze customer service excellence with our sentiment analysis platform, deciphering emotions and delivering actionable insights from incoming calls." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://Swar-Bhaav.vercel.app/" />
        <meta property="og:title" content="SwarBhaav - Transforming calls into actionable feedback." />
        <meta property="og:description" content="Catalyze customer service excellence with our sentiment analysis platform, deciphering emotions and delivering actionable insights from incoming calls." />
        <meta property="og:image" content="https://Swar-Bhaav.vercel.app/SwarBhaav.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://Swar-Bhaav.vercel.app/" />
        <meta property="twitter:title" content="SwarBhaav - Transforming calls into actionable feedback." />
        <meta property="twitter:description" content="Catalyze customer service excellence with our sentiment analysis platform, deciphering emotions and delivering actionable insights from incoming calls." />
        <meta property="twitter:image" content="https://Swar-Bhaav.vercel.app/SwarBhaav.jpg" />
        {/* manifest */}
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Navbar2 id="navbar" session={session} />

      <Hero id="hero" next="upload" session={session} />

      <Articles id="articles" next="upload" session={session} />

      {/* {session && <Upload id="upload" next="features" session={session} />} */}

      <Features id="features" next="contact" session={session} />

      <Statistics id="statistics" next="packages" session={session} />

      <Packages id="packages" next="contact" session={session} />

      <Footer id="footer" />

    </div>
  );
}

export default Home;


// export async function getServerSideProps({ req }) {
//   // const session = await getSession({ req });
//   // return {
//   //   props: { session }
//   // }
//   if (typeof window !== "undefined" && localStorage?.getItem("token")) {
//     const token = localStorage.getItem('token');
//     const username = localStorage.getItem('username');
//   }

//   if (token == "undefined") {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       token,
//       username
//     }
//   }
// }