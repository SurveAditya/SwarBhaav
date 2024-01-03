import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/fadein";
import { GiBugleCall } from "react-icons/gi";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

const Navbar = ({ session }) => {
    const router = useRouter();

    const [nav, setNav] = useState(false);

    useEffect(() => {
        const handleShadow = () => {
            if (typeof window !== "undefined" && window.scrollY >= 10) {
                setNav(true);
            } else {
                setNav(false);
            }
        };

        if (typeof window !== "undefined") {
            window.addEventListener("scroll", handleShadow);
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("scroll", handleShadow);
            }
        };
    }, []);

    function handleSignOut() {
        signOut();
    }

    function handleLogin() {
        router.push("/login");
    }

    return (
        <motion.nav
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0 }}
            className={
                nav
                    ? "p-4 md:px-8 text-center md:h-20 h-16 flex flex-row justify-between items-center fixed top-0 left-0 right-0 bg-white shadow-md z-50"
                    : "p-4 md:px-8 text-center md:h-20 h-16 flex flex-row justify-between items-center"
            }
        >
            <div className="font-bold text-lg">
                {/* <p className='border-l-2 border-black '></p> */}

                <Link href="/">
                    <h1 className="text-2xl font-bold text-cyan-700">
                        <span className="font-medium text-cyan-500">Swar</span>
                        Bhaav
                        <GiBugleCall className="inline-block ml-1 mb-2 text-cyan-500" />
                    </h1>
                </Link>
            </div>

            <div>
                {session ? (
                    <button
                        className="m-4 border border-cyan-700 rounded-md px-4 py-2 text-cyan-700 font-semibold hover:bg-cyan-700 hover:text-cyan-100 transition duration-300 ease-in-out"
                        onClick={handleSignOut}
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        className="border-2 border-cyan-700 rounded-md px-4 py-2 text-cyan-700 font-semibold hover:bg-cyan-700 hover:text-cyan-100 transition duration-300 ease-in-out"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                )}
            </div>
        </motion.nav>
    );
};

export default Navbar;
