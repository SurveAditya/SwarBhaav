import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/fadein";
import { useState } from "react";

const Packages = () => {
    const [packagePrice, setPackagePrice] = useState("monthly");
    const prices = {
        rookie: 99,
        manager: 199,
    };
    return (
        <section
            className={`${styles.container} min-h-screen bg-cyan-100 relative`}
        >
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <motion.h1
                        variants={fadeIn("down", 0.4)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.2 }}
                        className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900"
                    >
                        Pricing
                    </motion.h1>
                    <motion.p
                        variants={fadeIn("down", 0.5)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.2 }}
                        className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500"
                    >
                        Choose the package that suits your role and level of
                        insight with our Manager and Rookie packages.
                    </motion.p>
                    <motion.div
                        variants={fadeIn("down", 0.6)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.2 }}
                        className="flex mx-auto border-2 border-cyan-500 rounded overflow-hidden mt-6"
                    >
                        <button
                            onClick={() => setPackagePrice("monthly")}
                            style={{
                                padding: "0.5rem 1rem",
                                outline: "none",
                            }}
                            className={
                                packagePrice === "monthly"
                                    ? "bg-cyan-500 text-white"
                                    : "bg-cyan-200 text-cyan-700"
                            }
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setPackagePrice("annually")}
                            style={{
                                padding: "0.5rem 1rem",
                                outline: "none",
                            }}
                            className={
                                packagePrice === "annually"
                                    ? "bg-cyan-500 text-white"
                                    : "bg-cyan-200 text-cyan-700"
                            }
                        >
                            Annually
                        </button>
                    </motion.div>
                </div>
                <div className="flex flex-wrap -m-4">
                    <motion.div
                        variants={fadeIn("up", 0.4)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.3 }}
                        className="p-4 md:w-1/2 w-full"
                    >
                        <div className="h-full p-6 rounded-lg border-2 border-cyan-300 flex flex-col relative overflow-hidden">
                            <h2 className="text-sm tracking-widest title-font mb-1 font-medium uppercase">
                                Rookie (Employee)
                            </h2>
                            <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
                                ₹
                                {packagePrice === "monthly"
                                    ? `${prices.rookie}`
                                    : `${prices.rookie * 12}`}
                                <span className="text-lg ml-1 font-normal text-gray-500">
                                    {packagePrice === "monthly"
                                        ? ` / mo`
                                        : ` / yr`}
                                </span>
                            </h1>
                            <p className="flex items-center text-gray-500 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-cyan-300 text-white rounded-full flex-shrink-0">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        className="w-3 h-3"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </span>
                                Limited Access
                            </p>
                            <p className="flex items-center text-gray-500 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-cyan-300 text-white rounded-full flex-shrink-0">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        className="w-3 h-3"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </span>
                                Basic Sentiment Analysis
                            </p>
                            <p className="flex items-center text-gray-500 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-cyan-300 text-white rounded-full flex-shrink-0">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        className="w-3 h-3"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </span>
                                Sentiment Scores
                            </p>
                            <p className="flex items-center text-gray-500 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-cyan-300 text-white rounded-full flex-shrink-0">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        className="w-3 h-3"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </span>
                                Limited Reporting
                            </p>
                            <p className="flex items-center text-gray-500 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-cyan-300 text-white rounded-full flex-shrink-0">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        className="w-3 h-3"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </span>
                                Standard Customer Support
                            </p>

                            <button className="flex items-center mt-auto text-gray-400 bg-cyan-300 border-0 py-2 px-4 w-full focus:outline-none hover:bg-cyan-500 hover:text-white rounded">
                                Buy
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    className="w-4 h-4 ml-auto"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                            {/* <p className="text-xs text-gray-500 mt-3">
                                Literally you probably haven't heard of them
                                jean shorts.
                            </p> */}
                        </div>
                    </motion.div>
                    <motion.div
                        variants={fadeIn("up", 0.4)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.3 }}
                        className="p-4 md:w-1/2 w-full"
                    >
                        <div className="h-full p-6 rounded-lg border-2 border-cyan-500 flex flex-col relative overflow-hidden">
                            <span className="bg-cyan-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                                Popular
                            </span>
                            <h2 className="text-sm tracking-widest title-font mb-1 font-medium uppercase">
                                Manager
                            </h2>
                            <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
                                ₹
                                {packagePrice === "monthly"
                                    ? `${prices.manager}`
                                    : `${prices.manager * 12}`}
                                <span className="text-lg ml-1 font-normal text-gray-500">
                                    {packagePrice === "monthly"
                                        ? ` / mo`
                                        : ` / yr`}
                                </span>
                            </h1>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-cyan-500 text-white rounded-full flex-shrink-0">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        className="w-3 h-3"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </span>
                                Full Access
                            </p>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-cyan-500 text-white rounded-full flex-shrink-0">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        className="w-3 h-3"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </span>
                                Real-time Monitoring
                            </p>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-cyan-500 text-white rounded-full flex-shrink-0">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        className="w-3 h-3"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </span>
                                Team Management
                            </p>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-cyan-500 text-white rounded-full flex-shrink-0">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        className="w-3 h-3"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </span>
                                Advanced Analytics
                            </p>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-cyan-500 text-white rounded-full flex-shrink-0">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        className="w-3 h-3"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </span>
                                Integration Support
                            </p>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-cyan-500 text-white rounded-full flex-shrink-0">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        className="w-3 h-3"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </span>
                                Data Security
                            </p>

                            <button className="flex items-center mt-auto text-white bg-cyan-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-cyan-600 rounded">
                                Buy
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    className="w-4 h-4 ml-auto"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                            {/* <p className="text-xs text-gray-500 mt-3">
                                Literally you probably haven't heard of them
                                jean shorts.
                            </p> */}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Packages;
