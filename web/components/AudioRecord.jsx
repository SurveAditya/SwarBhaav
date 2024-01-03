import { useEffect, useState } from "react";
import { BsRecordCircle, BsStopCircle, BsFillSendFill } from "react-icons/bs";
const MicRecorder = require("mic-recorder-to-mp3");
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const AudioRecord = () => {
    const [blob, setBlob] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [timer, setTimer] = useState(0);

    const handleFileSubmit = () => {
        console.log(blob);
    };
    const startRecording = ({
        Mp3Recorder,
        isBlocked,
        setBlob,
        setIsRecording,
    }) => {
        if (isBlocked) {
            alert("Permission Denied");
        } else {
            Mp3Recorder.start()
                .then(() => {
                    setBlob("");
                    setIsRecording(true);
                })
                .catch((e) => console.error(e));
        }
    };
    const stopRecording = ({ Mp3Recorder, setBlob, setIsRecording }) => {
        Mp3Recorder.stop()
            .getMp3()
            .then(([blob]) => {
                const blobURL = URL.createObjectURL(new Blob(blob));
                setBlob(blobURL);
                setIsRecording(false);
            })
            .catch((e) => console.log(e));
    };

    const formatTime = ({ timer }) => {
        const getSeconds = `0${timer % 60}`.slice(-2);
        const minutes = Math.floor(timer / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);

        return `${getMinutes} : ${getSeconds}`;
    };
    useEffect(() => {
        const interval = setInterval(() => {
            if (isRecording) {
                setTimer((seconds) => seconds + 1);
            }
        }, 1000);
        return () => {
            clearInterval(interval);
            setTimer(0);
        };
    }, [isRecording]);

    useEffect(() => {
        let newVariable;
        newVariable = navigator;

        newVariable.getUserMedia(
            { audio: true },
            () => {
                console.log("Permission Granted");
                setIsBlocked(false);
            },
            () => {
                console.log("Permission Denied");
                setIsBlocked(true);
            }
        );
    }, []);

    return (
        <div className="flex justify-center items-center flex-col">
            <div className="flex justify-center items-center text-center flex-row">
                <button
                    className="m-4 border border-cyan-700 rounded-md px-4 py-2 text-cyan-700 font-semibold hover:bg-cyan-700 hover:text-cyan-300 transition duration-300 ease-in-out flex justify-center items-center text-center flex-row gap-2"
                    onClick={(e) =>
                        startRecording({
                            Mp3Recorder,
                            isBlocked,
                            setBlob,
                            setIsRecording,
                        })
                    }
                    disabled={isRecording}
                >
                    <p className={isRecording ? "animate-pulse" : ""}>
                        <BsRecordCircle className="h-6 w-6" />
                    </p>
                    Record
                </button>
                <button
                    className="group m-4 border border-cyan-700 rounded-md px-4 py-2 text-cyan-700 font-semibold hover:bg-cyan-700 hover:text-cyan-300 transition duration-300 ease-in-out flex justify-center items-center text-center flex-row gap-2"
                    onClick={(e) =>
                        stopRecording({ Mp3Recorder, setBlob, setIsRecording })
                    }
                >
                    <p className={isRecording ? "" : "hover:animate-pulse"}>
                        <BsStopCircle className="h-6 w-6" />
                    </p>
                    Stop
                </button>
            </div>
            <div className="blob">
                {blob ? (
                    <audio src={blob} controls />
                ) : (
                    <p className="timer">{formatTime({ timer })}</p>
                )}
            </div>
            <button
                className="group m-4 border border-cyan-700 rounded-md px-4 py-2 text-cyan-700 font-semibold hover:bg-cyan-700 hover:text-cyan-300 transition duration-300 ease-in-out flex justify-center items-center text-center flex-row gap-2"
                onClick={handleFileSubmit}
                disabled={isRecording || !blob}
            >
                <p className="group-hover:rotate-3">
                    <BsFillSendFill className="h-6 w-6" />
                </p>
                Submit
            </button>
        </div>
    );
};
export default AudioRecord;
