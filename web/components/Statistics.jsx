import React from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/fadein";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const Statistics = () => {
    const [ref, inView] = useInView({
        threshold: 0.5,
    });
    return (
        <main
            className={`${styles.container} min-h-screen bg-cyan-100 relative`}
        >
            <div className="container px-5 py-24 mx-auto flex flex-wrap">
                <motion.div
                    variants={fadeIn("up", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.3 }}
                    className="md:w-1/2 flex justify-center h-full "
                >
                    <Image
                        className=""
                        src="/assets/stats.svg"
                        alt="stats"
                        height={550}
                        width={550}
                    />
                </motion.div>
                <motion.div
                    variants={fadeIn("down", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.3 }}
                    className="flex flex-wrap -mx-4 mt-auto mb-auto md:w-1/2 h-full text-center content-start justify-center sm:pr-10"
                >
                    <div className="w-full sm:p-4 px-4 mb-6">
                        <h1 className="font-semibold text-2xl md:text-4xl mb-2 text-cyan-700">
                            Our Sentiment Analysis in Numbers
                        </h1>
                        <div className="leading-relaxed text-gray-500 font-normal">
                            Discover the Data Behind Our Success.
                        </div>
                    </div>
                    <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2" ref={ref}>
                        <h2 className="title-font font-medium text-3xl text-cyan-800">
                            {inView ? (
                                <CountUp
                                    start={0}
                                    end={12}
                                    duration={3}
                                    decimals={0}
                                    suffix={""}
                                />
                            ) : (
                                0
                            )}
                        </h2>
                        <p className="leading-relaxed text-cyan-600">
                            Active Users
                        </p>
                    </div>
                    <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                        <h2 className="title-font font-medium text-3xl text-cyan-800">
                            {inView ? (
                                <CountUp
                                    start={0.0}
                                    end={3.3}
                                    duration={3}
                                    decimals={1}
                                    suffix={"K"}
                                />
                            ) : (
                                0
                            )}
                        </h2>
                        <p className="leading-relaxed text-cyan-600">
                            Audio Files Processed
                        </p>
                    </div>
                    <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                        <h2 className="title-font font-medium text-3xl text-cyan-800">
                            {inView ? (
                                <CountUp
                                    start={0.0}
                                    end={83.95}
                                    duration={3}
                                    decimals={1}
                                    suffix={"%"}
                                />
                            ) : (
                                0
                            )}
                        </h2>
                        <p className="leading-relaxed text-cyan-600">
                            Sentiment Accuracy
                        </p>
                    </div>
                    <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                        <h2 className="title-font font-medium text-3xl text-cyan-800">
                            {inView ? (
                                <CountUp
                                    start={0.0}
                                    end={5}
                                    duration={3}
                                    decimals={1}
                                    suffix={"s"}
                                />
                            ) : (
                                0
                            )}
                        </h2>
                        <p className="leading-relaxed text-cyan-600">
                            Response Time
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

export default Statistics;
