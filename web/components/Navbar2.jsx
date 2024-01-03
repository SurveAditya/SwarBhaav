import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/fadein";
import { GiBugleCall, GiSoundWaves } from "react-icons/gi";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { FileUploader } from "react-drag-drop-files";

const Navbar = ({ session }) => {
    // console.log(session);
    const router = useRouter();

    // const [session, setSession] = useState(
    //     typeof window !== "undefined" && localStorage?.getItem("token")
    //         ? localStorage.getItem("token")
    //         : ""
    // );

    const [nav, setNav] = useState(false);

    useEffect(() => {
        // const getToken = async () => {
        //     if (
        //         typeof window !== "undefined" &&
        //         localStorage?.getItem("token")
        //     ) {
        //         setSession(localStorage.getItem("token"));
        //     }
        // };
        // getToken();

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

        // console.log(session);

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("scroll", handleShadow);
            }
        };
    }, []);

    function handleSignOut() {
        // signOut();
        localStorage.removeItem("token");
        router.push("/");
    }

    function handleLogin() {
        router.push("/login");
    }

    function handleChange() {
        alert("File Uploaded!");
    }

    const fileTypes = ["mp3", "wav", "ogg", "m4a", "aac", "flac", "wma"];
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <motion.nav
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0 }}
            className={
                nav
                    ? "p-4 md:px-8 text-center md:h-20 h-16 flex flex-row justify-between items-center fixed top-0 left-0 right-0 bg-white shadow-md z-50"
                    : "p-4 md:px-8 text-center md:h-20 h-16 flex flex-row justify-between items-center "
            }
        >
            <div className="font-bold text-lg">
                {/* <p className='border-l-2 border-black '></p> */}

                <Link href="/">
                    <h1 className="text-2xl font-bold text-cyan-700 cursor-pointer">
                        <span className="font-bold text-cyan-500">स्वर</span>
                        Bhaav
                        <GiSoundWaves className="inline-block ml-1 w-10 h-10 text-cyan-500" />
                    </h1>
                </Link>
            </div>

            {typeof window !== "undefined" &&
            window.location.href == "/dashboard" ? (
                <div
                    id="modal"
                    className="hidden md:block cursor-pointer font-bold text-lg text-cyan-500 hover:text-cyan-600"
                    onClick={openModal}
                >
                    Upload Audio File
                    <Modal
                        ariaHideApp={false}
                        className="aspect-square w-screen md:h-[512px] md:w-[512px] md:mx-auto md:my-auto flex items-center justify-center"
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Upload or Capture an Image"
                    >
                        <motion.div
                            variants={fadeIn("up", 0.3)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: false, amount: 0.4 }}
                            id="modal"
                            className="w-full rounded-md bg-cyan-400 p-1 shadow-lg shadow-gray-400 h-40 flex justify-center items-center"
                        >
                            <div className=" relative flex flex-col h-full w-full bg-white/50 items-center justify-center">
                                <FileUploader
                                    handleChange={handleChange}
                                    name="file"
                                    types={fileTypes}
                                    label="Drag & Drop your files here"
                                    multiple={false}
                                    required={true}
                                    className="h-full w-full border-2 border-gray-300 border-dashed rounded-md"
                                />
                                <div className="absolute top-2 right-2">
                                    <button
                                        className="border-none w-10/12 bg-white/60 shadow-gray-300 text-gray-600 p-2 rounded-md text-center flex justify-center items-center flex-col hover:shadow-md text-xl tracking-tight font-semibold hover:scale-105 hover:text-black transition-all duration-200"
                                        onClick={closeModal}
                                    >
                                        <AiOutlineClose className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </Modal>
                </div>
            ) : null}

            <div>
                {session ? (
                    <button
                        className="border-2 border-cyan-700 rounded-md px-4 py-2 text-cyan-700 font-semibold hover:bg-cyan-700 hover:text-cyan-100 transition duration-300 ease-in-out"
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
