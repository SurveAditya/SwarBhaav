import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/fadein";
import { BsFillImageFill } from "react-icons/bs";
import { BiSolidMicrophone } from "react-icons/bi";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineClose } from "react-icons/ai";
import AudioRecord from "./AudioRecord";

const Upload = () => {
    const fileTypes = ["mp3", "wav", "ogg", "m4a", "aac", "flac", "wma"];
    const [modal1IsOpen, setIsOpen1] = useState(false);
    const [modal2IsOpen, setIsOpen2] = useState(false);

    const openModal1 = () => {
        setIsOpen1(true);
    };

    const closeModal1 = () => {
        setIsOpen1(false);
    };

    const openModal2 = () => {
        setIsOpen2(true);
    };

    const closeModal2 = () => {
        setIsOpen2(false);
    };

    const handleChange = (file) => {
        console.log(file);
    };

    return (
        <section
            id="upload"
            className={`${styles.container} flex flex-col justify-center items-center w-full gap-4 text-center bg-cyan-100 min-h-screen relative`}
        >
            <motion.h1
                variants={fadeIn("down", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.4 }}
                className="text-3xl font-bold text-cyan-800"
            >
                Choose your Audio to get started!
            </motion.h1>
            <p className="text-gray-500 font-normal">
                Perform Sentiment Analysis on your own Audio Files.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full">
                <motion.div
                    variants={fadeIn("up", 0.3)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.4 }}
                    className="group border-none w-11/12 md:w-1/3 h-24 md:h-36 bg-white/60 shadow-cyan-200 text-cyan-700 p-2  rounded-md text-center flex justify-center items-center flex-col hover:shadow-md text-xl tracking-tight font-semibold hover:scale-105 transition-all duration-200 cursor-pointer gap-2"
                    onClick={openModal1}
                >
                    <p className="group-hover:animate-bounce">
                        <BsFillImageFill className="h-6 w-6" />
                    </p>
                    Upload from your device
                </motion.div>

                <motion.div
                    variants={fadeIn("up", 0.3)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.4 }}
                    className="group border-none w-11/12 md:w-1/3 h-24 md:h-36 bg-white/60 shadow-cyan-200 text-cyan-700 p-2 rounded-md text-center flex justify-center items-center flex-col hover:shadow-md text-xl tracking-tight font-semibold hover:scale-105 transition-all duration-200 cursor-pointer gap-2"
                    onClick={openModal2}
                >
                    <p className="group-hover:animate-bounce">
                        <BiSolidMicrophone className="h-6 w-6" />
                    </p>
                    Record from your Mic
                </motion.div>
            </div>

            <Modal
                ariaHideApp={false}
                className="aspect-square w-screen md:h-[512px] md:w-[512px] md:mx-auto md:my-auto flex items-center justify-center"
                isOpen={modal1IsOpen}
                onRequestClose={closeModal1}
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
                                onClick={closeModal1}
                            >
                                <AiOutlineClose className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </Modal>
            <Modal
                ariaHideApp={false}
                className="aspect-square w-screen md:h-[512px] md:w-[512px] md:mx-auto md:my-auto flex items-center justify-center"
                isOpen={modal2IsOpen}
                onRequestClose={closeModal2}
                contentLabel="Capture an Image"
            >
                <motion.div
                    variants={fadeIn("up", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.4 }}
                    id="modal"
                    className="w-full rounded-md bg-cyan-400 p-1 shadow-lg shadow-gray-400 h-40 flex justify-center items-center"
                >
                    <div className="relative flex flex-col h-full w-full bg-white/50 items-center justify-center">
                        <AudioRecord />
                        <div className="absolute top-2 right-2">
                            <button
                                className="border-none w-10/12 bg-white/60 shadow-gray-300 text-gray-600 p-2 rounded-md text-center flex justify-center items-center flex-col hover:shadow-md text-xl tracking-tight font-semibold hover:scale-105 hover:text-black transition-all duration-200"
                                onClick={closeModal2}
                            >
                                <AiOutlineClose className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </Modal>
        </section>
    );
};

export default Upload;
