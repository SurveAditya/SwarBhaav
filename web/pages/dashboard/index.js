import Head from 'next/head'
import { useEffect, useState } from 'react'
// import styles from '../../styles/Print.module.css';
// import { getSession, useSession, signOut } from "next-auth/react"
import { TbReportSearch } from 'react-icons/tb'
import { BiSolidPhoneCall, BiChat, BiSolidMicrophone } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import LineChart from '../../components/Charts/LineChart';
import PieChart from '../../components/Charts/PieChart'
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FileUploader } from "react-drag-drop-files";
import { motion } from "framer-motion";
import { fadeIn } from "../../lib/fadein";
import Upload2 from '../../components/Upload2';
import Image from 'next/image';
import Footer from '../../components/Footer';
import Modal from "react-modal";
import Navbar2 from '../../components/Navbar2';
import { useRouter } from 'next/router';


export default function Dashboard({ session }) {
    const router = useRouter();
    const { id } = router.query;
    const [chatResponse, setChatResponse] = useState(chatResponseSample);
    const [callResponse, setCallResponse] = useState(callResponseSample);

    const [reportData, setReportData] = useState([
        // { date: '01/01/2021', time: '12:00', sentimentType: 'Audio', result: 'Good' },
        // { date: '01/01/2021', time: '12:00', sentimentType: 'Chat', result: 'Best' },
        // { date: '01/01/2021', time: '12:00', sentimentType: 'Chat', result: 'Good' },
        // { date: '01/01/2021', time: '12:00', sentimentType: 'Audio', result: 'Bad' },
        // { date: '01/01/2021', time: '12:00', sentimentType: 'Audio', result: 'Good' },
        // { date: '01/01/2021', time: '12:00', sentimentType: 'Chat', result: 'Not so Bad' },
    ]);

    const [chats, setChats] = useState([]);
    const [calls, setCalls] = useState([]);


    const [formattedReportData, setFormattedReportData] = useState([]);
    const [pieValues, setPieValues] = useState([30, 40, 30]);
    const pieData = {
        labels: ['Positive', 'Negative', 'Neutral'],
        datasets: [
            {
                label: 'Sentiment Score',
                data: pieValues,
                backgroundColor: [
                    'rgba(56, 189, 248, 0.2)',
                    'rgba(187, 37, 37, 0.2)',
                    'rgb(16, 185, 129, 0.2)',
                ],
                borderColor: [
                    'rgba(56, 189, 248, 1)',
                    'rgba(187, 37, 37, 1)',
                    'rgb(16, 185, 129, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // useEffect(() => {
    //     if (!session) {
    //         // router.push('/login');
    //         window.location.href = '/login';
    //     }
    // }, [])

    // useEffect(() => {
    //     // run this useeffect to fetch the data from the backend
    //     // console.log(session);
    //     fetch(`https://sih-node-backend.architrathod1.repl.co/user/reports`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             token: session
    //         }
    //     }).then(response => response.json()).then(data => {
    //         // console.log(data);
    //         setReportData(data);
    //     }).catch(error => {
    //         console.error('Error uploading file:', error);
    //     });
    //     // setReportData(data.data);
    // }, [])

    useEffect(() => {
        // console.log(id)
        // Fetch data using the user ID
        if (id) {
            fetch(`/api/reports/all`, {
                headers: {
                    'Content-Type': 'application/json',
                    //             token: session
                },
                method: 'POST',
                body: JSON.stringify({ userId: id })
            })
                .then((response) => response.json())
                .then((data) => {
                    // Handle the fetched data
                    // console.log(data);
                    setReportData(data.data);
                    setChats(data.chats);
                    setCalls(data.calls);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [id]);

    useEffect(() => {
        if (reportData.length > 0) {
            // Function to convert createdAt into the desired format
            const formatDate = (dateString) => {
                const date = new Date(dateString);
                const formattedDate = date.toLocaleDateString('en-GB');
                const formattedTime = date.toLocaleTimeString('en-US');
                return {
                    createdAt_Date: formattedDate,
                    createdAt_Time: formattedTime,
                };
            };

            // Map over the reportData and update it with the formatted date and time
            const updatedData = reportData.map((item) => ({
                ...item,
                createdAt_Date: formatDate(item.createdAt).createdAt_Date,
                createdAt_Time: formatDate(item.createdAt).createdAt_Time,
            }));



            // Update the state with the modified data
            setFormattedReportData(updatedData);
            // setPieValues([formattedReportData?.result["sentiment_scores"]?.positive, formattedReportData?.result["sentiment_scores"]?.negative, formattedReportData?.result["sentiment_scores"]?.neutral])
        }
        else {
            setFormattedReportData([]);
        }
    }, [reportData]);

    const ChatFileTypes = ["txt"];

    const [ref, inView] = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    const handleResult1 = (event) => {
        // alert("Hello")
        console.log(event);
        openModal1();
    }

    const handleResult2 = (event) => {
        // alert("Hello")
        console.log(event);
        openModal2();
    }

    const handleChat = async (file) => {
        console.log(file)
        const formData = new FormData();
        formData.append('input_file', file);

        fetch(`https://sih-node-backend.architrathod1.repl.co/user/upload`, {
            method: 'POST',
            body: formData,
            headers: {
                token: session
            }
        }).then(response => response.json()).then(data => {
            console.log(data);
            setChatResponse(data.result);
            setIsOpen1(true);
        }).catch(error => {
            console.error('Error uploading file:', error);
        });
    };

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

    const handlePrint = () => {
        // let printContents = document.getElementById('modal').innerHTML;
        // let originalContents = document.body.innerHTML;
        // document.body.innerHTML = printContents;
        window.print();
        // document.body.innerHTML = originalContents;
    }

    return (
        <>
            {/* <Navbar2 /> */}

            <div className='flex flex-col justify-center items-center text-center gap-2 md:gap-4 p-4 bg-cyan-50'>
                <Head>
                    <title>SwarBhaav | Dashboard</title>
                </Head>
                <div className=" bg-white shadow-sm shadow-cyan-800 w-full h-12 flex justify-center items-center rounded-md">
                    <h1 className='text-2xl md:text-3xl font-bold text-cyan-700'>Dashboard</h1>
                    <a href='..' className='absolute right-6 md:right-8 text-cyan-800 hover:text-cyan-600 hover:underline'>
                        Back
                    </a>
                </div>
                <div className='w-full h-auto flex justify-center items-center flex-col md:flex-row gap-2 md:gap-4' ref={ref}>
                    <div className='w-full md:w-1/3 h-28 bg-white shadow-sm shadow-cyan-800 flex justify-center items-center flex-row gap-2 md:gap-4 rounded-md'>
                        <div className='flex justify-center items-center rounded-full bg-white shadow-md shadow-cyan-800 ml-4'>
                            <BiSolidPhoneCall className='text-cyan-600 md:h-20 md:w-20 h-16 w-16 p-4' />
                        </div>
                        <div className='w-2/3 h-full flex justify-center items-center flex-col gap-2'>
                            <h1 className='text-2xl font-bold text-cyan-600'>Calls Analyzed</h1>
                            <h1 className='text-3xl font-bold text-cyan-800'>
                                {inView ? (
                                    <CountUp
                                        start={0}
                                        end={reportData.filter(data => data.sentimentType === 'audio').length}
                                        duration={2}
                                        decimals={0}
                                        suffix={""}
                                    />
                                ) : (
                                    0
                                )}
                            </h1>
                        </div>
                    </div>
                    <div className='w-full md:w-1/3 h-28 bg-white shadow-sm shadow-cyan-800 flex justify-center items-center flex-row gap-2 md:gap-4 rounded-md'>
                        <div className='flex justify-center items-center rounded-full bg-white shadow-md shadow-cyan-800 ml-4'>
                            <BiChat className='text-cyan-600 md:h-20 md:w-20 h-16 w-16 p-4' />
                        </div>
                        <div className='w-2/3 h-full flex justify-center items-center flex-col gap-2'>
                            <h1 className='text-2xl font-bold text-cyan-600'>Chats Analyzed</h1>
                            <h1 className='text-3xl font-bold text-cyan-800'>
                                {inView ? (
                                    <CountUp
                                        start={0}
                                        end={reportData.filter(data => data.sentimentType === 'chat').length}
                                        duration={2}
                                        decimals={0}
                                        suffix={""}
                                    />
                                ) : (
                                    0
                                )}
                            </h1>
                        </div>
                    </div>
                    <div className='w-full md:w-1/3 h-28 bg-white shadow-sm shadow-cyan-800 flex justify-center items-center flex-row gap-2 md:gap-4 rounded-md'>
                        <div className='flex justify-center items-center rounded-full bg-white shadow-md shadow-cyan-800 ml-4'>
                            <TbReportSearch className='text-cyan-600 md:h-20 md:w-20 h-16 w-16 p-4' />
                        </div>
                        <div className='w-2/3 h-full flex justify-center items-center flex-col gap-2'>
                            <h1 className='text-2xl font-bold text-cyan-600'>Reports Generated</h1>
                            <h1 className='text-3xl font-bold text-cyan-800'>
                                {inView ? (
                                    <CountUp
                                        start={0}
                                        end={reportData.length}
                                        duration={2}
                                        decimals={0}
                                        suffix={""}
                                    />
                                ) : (
                                    0
                                )}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* analyze calls and chats */}
                <div className='w-full h-full flex justify-center items-center flex-col md:flex-row gap-2 md:gap-4'>

                    {/* calls */}


                    <div className='w-full md:w-1/3 md:h-80 bg-white shadow-sm shadow-cyan-800 flex md:justify-between justify-center items-center flex-col gap-2 p-4 rounded-md'>

                        <div className='w-full flex justify-center items-center flex-col gap-2'>
                            <h1 className='text-cyan-600 font-bold text-2xl'>Analyze Calls</h1>
                            <p className='text-gray-500 font-md'>Get Your Call Sentiment Score!</p>
                        </div>
                        <Upload2 />
                    </div>

                    {/* chats */}
                    <div className='w-full md:w-1/3 h-80 bg-white shadow-sm shadow-cyan-800 flex justify-between items-center md:self-start flex-col gap-2 p-4 rounded-md'>
                        <div className='w-full flex justify-center items-center flex-col gap-2'>
                            <h1 className='text-cyan-600 font-bold text-2xl'>Analyze Chats</h1>
                            <p className='text-gray-500 font-md'>Get Your Chat Sentiment Score!</p>
                        </div>
                        <FileUploader
                            handleChange={handleChat}
                            name="chat"
                            types={ChatFileTypes}
                            label="Drag & Drop your Chat file"
                            multiple={false}
                            required={true}
                            classes="h-full w-full border-2 border-gray-300 text-cyan-600 border-dashed  rounded-md"
                        />
                        <h3 className='text-sm text-gray-500'>Note:  Your chat is not saved but the results are saved for your future reference.</h3>
                    </div>

                    <div className='hidden md:block w-full md:w-1/3 md:h-80 bg-white shadow-sm shadow-cyan-800 gap-2 p-4 rounded-md'>

                        <motion.div
                            variants={fadeIn("down", 0.4)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.4 }}
                            className="w-full h-full"
                        >
                            <Image
                                src="/assets/dash.svg"
                                width={300}
                                height={300}
                                alt="Hero Image"
                            />
                        </motion.div>
                    </div>
                </div>


                {/* Graphs and Plots */}
                <div className='w-full h-full flex justify-center items-center flex-col md:flex-row gap-2 md:gap-4 '>
                    <div className='w-full md:w-1/2 bg-white shadow-sm shadow-cyan-800 flex justify-center items-center flex-col gap-2 p-4 md:h-96 rounded-md'>
                        <h1 className='text-cyan-600 font-bold text-2xl'>Sentiment Score of Last Call Analyzed</h1>
                        <LineChart chartData={chartData} />
                    </div>
                    <div className='w-full md:w-1/2 bg-white shadow-sm shadow-cyan-800 flex justify-center items-center flex-col gap-2 p-4 md:h-96 rounded-md'>
                        <h1 className='text-cyan-600 font-bold text-2xl md:mt-12'>Sentiment Score of Last Chat Analyzed</h1>
                        <PieChart position={"right"} chartData={pieData} />
                    </div>
                </div>

                {/* history and  */}
                <div className='w-full h-full flex justify-center items-center flex-col md:flex-row gap-2 md:gap-4'>

                    {/* history */}
                    <div className='w-full md:w-2/3 h-auto bg-white shadow-sm shadow-cyan-800 flex justify-start self-start items-center flex-col gap-2 p-4 rounded-md'>
                        <div className="w-full">
                            <h1 className='text-cyan-600 font-bold text-2xl'>Report History</h1>
                            <div className="shadow rounded border-b border-gray-200 overflow-x-scroll md:overflow-hidden">
                                <table className="min-w-full bg-white ">
                                    <thead className="bg-cyan-100 text-cyan-700">
                                        <tr>
                                            <th className="w-1/4 text-center py-3 px-4 uppercase font-semibold text-md">
                                                Date
                                            </th>
                                            <th className="w-1/4 text-center py-3 px-4 uppercase font-semibold text-md">
                                                Time
                                            </th>
                                            <th className="w-1/4 text-center py-3 px-4 uppercase font-semibold text-md">
                                                Sentiment Type
                                            </th>
                                            <th className="w-1/4 text-center py-3 px-4 uppercase font-semibold text-md">
                                                Result
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-cyan-800 font-semibold">
                                        {Array.isArray(formattedReportData) && formattedReportData.length > 0 && formattedReportData.map((data, index) => {
                                            // console.log(data.sentimentType)
                                            return (
                                                <tr key={index} className={index % 2 == 0 ? "bg-white" : "bg-cyan-50"}>
                                                    <td className="w-1/4 text-center py-3 px-4">
                                                        {/* {data.createdAt?.toDateString()} */}
                                                        {data.createdAt_Date}
                                                    </td>
                                                    <td className="w-1/4 text-center py-3 px-4">
                                                        {/* {data.createdAt?.toTimeString()} */}
                                                        {data.createdAt_Time}
                                                    </td>
                                                    <td className="w-1/4 text-center py-3 px-4 font-normal">
                                                        {data.sentimentType == 'audio' &&
                                                            <span className='bg-cyan-800 text-cyan-400 rounded-full px-2 py-1'>{data.sentimentType}</span>
                                                        }
                                                        {data.sentimentType == 'chat' &&
                                                            <span className='bg-cyan-600 text-cyan-200 rounded-full px-2 py-1'>{data.sentimentType}</span>
                                                        }
                                                    </td>
                                                    <td className="w-1/4 text-center py-3 px-4">
                                                        <button
                                                            key={data._id}
                                                            className='border border-cyan-700 p-2 text-cyan-600 font-semibold hover:bg-cyan-700 hover:text-cyan-400 transition duration-300 rounded-md ease-in-out'
                                                            onClick={data.sentimentType == "audio" ? handleResult2 : handleResult1}
                                                        >
                                                            Result
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        {Array.isArray(formattedReportData) && formattedReportData.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="w-1/4 text-center text-cyan-600 py-3 px-4">No Data Found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <Modal
                                    ariaHideApp={false}
                                    className="w-full md:w-[90vw] h-full md:mx-auto md:my-auto  text-center pt-6"
                                    isOpen={modal1IsOpen}
                                    onRequestClose={closeModal1}
                                    contentLabel="Upload or Capture an Image"
                                // id="modal"
                                >
                                    {chatResponse ? (
                                        <div
                                            id="modal"
                                            className="w-full h-[95vh] rounded-md bg-cyan-100 shadow-lg shadow-gray-400 overflow-y-scroll relative p-4"
                                        >
                                            <h1 className='text-cyan-600 font-bold text-2xl'>Chat Analysis Report</h1>
                                            <div
                                                className=" flex h-full w-full bg-white/50 items-center justify-center gap-2 md:gap-4 p-4"
                                            >
                                                <div className='w-1/2 h-full flex flex-col justify-start items-center text-justify gap-4 text-sm'>
                                                    <h3 className='text-gray-500 font-semibold text-xl'>Chat Duration</h3>
                                                    <p className='text-justify'>{chatResponse.start_date} - {chatResponse.end_date}</p>
                                                    <h3 className='text-gray-500 font-semibold text-xl'>Chat Summary</h3>
                                                    <p className='text-justify'>{chatResponse.openai_response}</p>
                                                </div>

                                                <div className='h-full w-1/2 justify-center items-center gap-4 md:gap-8 '>
                                                    <div className='w-full h-1/2 flex flex-col justify-start items-center self-start text-justify mb-4 md:mb-10'>
                                                        <h3 className='text-gray-500 font-semibold text-xl'>Sentiment Score</h3>
                                                        <div className='w-full md:w-1/2'>
                                                            <PieChart position={"top"} chartData={pieData} />
                                                        </div>
                                                    </div>
                                                    <div className='w-full h-1/2 flex flex-col justify-start items-center self-start text-justify'>
                                                        <h3 className='text-gray-500 font-semibold text-xl'>Key Words</h3>
                                                        <div className='w-full'>
                                                            <table className="min-w-full bg-white border-b border-gray-300">
                                                                <thead className="bg-cyan-100 text-cyan-700">
                                                                    <tr>
                                                                        <th className="w-1/2 text-center py-3 px-4 uppercase font-semibold text-md">
                                                                            Positives
                                                                        </th>
                                                                        <th className="w-1/2 text-center py-3 px-4 uppercase font-semibold text-md">
                                                                            Negatives
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="text-cyan-800 font-semibold">

                                                                    <tr className="bg-white">
                                                                        <td className="w-1/2 text-center py-3 px-4 text-green-600">{
                                                                            chatResponse && Array.isArray(chatResponse?.positive_words) && chatResponse?.positive_words.length > 0 && chatResponse?.positive_words.map((data, index) => {
                                                                                return (
                                                                                    <p key={index}>{data}</p>
                                                                                )
                                                                            }
                                                                            )}
                                                                        </td>
                                                                        <td className="w-1/2 text-center py-3 px-4 text-red-500">{
                                                                            chatResponse && Array.isArray(chatResponse?.negative_words) && chatResponse?.negative_words.length > 0 && chatResponse?.negative_words.map((data, index) => {
                                                                                return (
                                                                                    <p key={index}>{data}</p>
                                                                                )
                                                                            }
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                    {Array.isArray(chatResponse.negative_words) && Array.isArray(chatResponse.positive_words) && chatResponse.positive_words.length === 0 && chatResponse.negative_words.length === 0(
                                                                        <tr>
                                                                            <td colSpan={4} className="w-1/4 text-center text-cyan-600 py-3 px-4">No Positive or Negative Words Detected.</td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="absolute top-2 right-2">
                                                    <button
                                                        className="border-none w-10/12 bg-gray-300 shadow-md shadow-white text-gray-600 p-2 rounded-md text-center flex justify-center items-center flex-col hover:shadow-md text-xl tracking-tight font-semibold hover:scale-105 hover:text-black transition-all duration-200"
                                                        onClick={closeModal1}
                                                    >
                                                        <AiOutlineClose className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                className="m-4 border border-cyan-700 rounded-md px-4 py-2 text-cyan-700 font-semibold hover:bg-cyan-700 hover:text-cyan-100 transition duration-300 ease-in-out"
                                                onClick={handlePrint}
                                            >
                                                Print
                                            </button>
                                        </div>
                                    ) : (
                                        <p>

                                            {"loading..."}
                                        </p>
                                    )}
                                </Modal>
                                <Modal
                                    ariaHideApp={false}
                                    className="w-full md:w-1/2 h-full md:mx-auto md:my-auto  text-center pt-6"
                                    isOpen={modal2IsOpen}
                                    onRequestClose={closeModal2}
                                    contentLabel="Upload or Capture an Image"
                                // id="modal"
                                >
                                    {callResponse ? (
                                        <div
                                            id="modal"
                                            className="w-full h-auto rounded-md bg-cyan-100 shadow-lg shadow-gray-400 relative p-4"
                                        >
                                            <h1 className='text-cyan-600 font-bold text-2xl'>Call Sentiment Analysis</h1>
                                            <div
                                                className=" flex h-full w-full bg-white/50 items-center justify-center gap-2 md:gap-4 p-4"
                                            >
                                                <div className='w-1/2 h-full flex flex-col justify-start items-center text-center gap-4 text-sm'>
                                                    <h3 className='text-gray-500 font-semibold text-xl'>Classified Audio Sentiment</h3>
                                                    <p className='text-justify text-xl'>{callResponse.emotion + " " + emotions[callResponse.emotion]}</p>
                                                </div>
                                                <div className="absolute top-2 right-2">
                                                    <button
                                                        className="border-none w-10/12 bg-gray-300 shadow-md shadow-white text-gray-600 p-2 rounded-md text-center flex justify-center items-center flex-col hover:shadow-md text-xl tracking-tight font-semibold hover:scale-105 hover:text-black transition-all duration-200"
                                                        onClick={closeModal2}
                                                    >
                                                        <AiOutlineClose className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                className="m-4 border border-cyan-700 rounded-md px-4 py-2 text-cyan-700 font-semibold hover:bg-cyan-700 hover:text-cyan-100 transition duration-300 ease-in-out"
                                                onClick={handlePrint}
                                            >
                                                Print
                                            </button>
                                        </div>
                                    ) : (
                                        <p>

                                            {"loading..."}
                                        </p>
                                    )}
                                </Modal>
                            </div>
                        </div>

                    </div>
                    <div className='w-full md:w-1/3 h-96 bg-white shadow-sm shadow-cyan-800 justify-between items-center md:self-start flex-col gap-2 p-4 rounded-md hidden md:block'>
                        <motion.div
                            variants={fadeIn("down", 0.4)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.4 }}
                            className="w-full h-full"
                        >
                            <Image
                                src="/assets/dash2.svg"
                                width={510}
                                height={510}
                                alt="Hero Image"
                            />
                        </motion.div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}


// export async function getServerSideProps({ req }) {

//     const token = localStorage.getItem('token');
//     const username = localStorage.getItem('username');
//     if (!token) {
//         return {
//             redirect: {
//                 destination: '/login',
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: {
//             token,
//             username
//         }
//         // const session = await getSession({ req })

//         // if (!session) {
//         //     return {
//         //         redirect: {
//         //             destination: '/login',
//         //             permanent: false
//         //         }
//         //     }
//         // }

//         // return {
//         //     props: { session }
//         // }
//     }
// }

const chartData = {
    labels: ['01', '02', '03', '04', '05', '06'],
    datasets: [{
        label: 'Hourly Call Sentiment Score',
        data: [12, 19, 3, 15, 9, 11],
        backgroundColor: [
            'rgba(21, 94, 117, 0.2)',
        ],
        borderColor: [
            'rgba(21, 94, 117, 1)',
        ],
        borderWidth: 1,

    }]
};

const chatResponseSample = {
    "openai_response": "The overall sentiment in this chat conversation appears to be positive and friendly. Both speakers, Anish and Aditya, maintain a casual and lighthearted tone throughout the conversation. The key topics discussed include seeking help, making plans for a project, discussing friends in DJ (possibly referring to DJango), planning a birthday celebration for Gargi, and deciding on a restaurant for lunch. Anish expresses gratitude for Aditya's assistance and suggests going to a bookstore as a birthday gift for Gargi. Aditya suggests Punjab's Kitchen for lunch and discusses his previous experience at Asian foods. Both speakers engage in light humor and seem cooperative in their decision-making process. There are no noticeable negative emotions, disagreements, or arguments in the conversation.",
    "sentiment_scores": {
        "positive": "50%",
        "negative": "14.285714285714285%",
        "neutral": "35.714285714285715%"
    },
    "positive_words": [
        "1. Free",
        "2. Nice",
        "3. Great",
        "4. Good"
    ],
    "negative_words": [
        "1. No",
        "2. Problem",
        "3. Lecture",
        "4. Slight"
    ],
    "start_date": "12/03/2022, 20:58",
    "end_date": "27/04/2022, 19:08"
}

const callResponseSample = {
    "emotion": "disgust"
}

const emotions = {
    angry: '😤',
    disgust: '🤢',
    fear: '😨',
    happy: '😄',
    neutral: '😐',
    sad: '😢',
    surprise: '😮',
}