import Image from "next/image";
import styles from "../styles/Home.module.css";
import NextButton from "./NextButton";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/fadein";

export default function Hero({ session, next }) {
    return (
        <div className={`${styles.container} bg-cyan-100 relative`}>
            <section className="w-full min-h-screen">
                <main className="min-h-[calc(100vh - 64px)] md:min-h-[calc(100vh - 80px)] flex flex-col md:flex-row justify-center md:gap-8 lg:gap-12 items-center text-center md:text-left ">
                    <motion.div
                        variants={fadeIn("up", 0.4)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.4 }}
                        className="md:w-1/2 h-full"
                    >
                        <div className="">
                            <h1 className="text-4xl md:text-5xl font-bold text-cyan-900 uppercase ">
                                <motion.span
                                    variants={fadeIn("up", 0.5)}
                                    initial="hidden"
                                    whileInView={"show"}
                                    viewport={{ once: true, amount: 0.3 }}
                                    className="text-cyan-700 font-semibold selection:text-cyan-200 selection:bg-black"
                                >
                                    Transforming Calls into
                                </motion.span>
                                <motion.span
                                    variants={fadeIn("up", 0.6)}
                                    initial="hidden"
                                    whileInView={"show"}
                                    viewport={{ once: true, amount: 0.3 }}
                                    className="selection:text-cyan-300 selection:bg-black/75"
                                >
                                    {" "}
                                    Actionable Feedback.
                                </motion.span>
                            </h1>
                            <p className="text-gray-500">
                                Discover the Power of Sentiment Analysis for
                                Your Customer Calls.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={fadeIn("down", 0.4)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.4 }}
                        className="md:w-1/2 h-full"
                    >
                        <Image
                            src="/assets/hero.svg"
                            width={510}
                            height={510}
                            alt="Hero Image"
                        />
                    </motion.div>
                </main>
            </section>
            {/* <NextButton to={next} /> */}
        </div>
    );
}
