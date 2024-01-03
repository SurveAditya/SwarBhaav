import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
// import { Link as ReactScroll } from "react-scroll";
import Link from "next/link";
const NextButton = (props) => {
    return (
        <Link href={`#${props.to}`}>
            <div className="absolute bottom-4 right-4 border-2 cursor-pointer border-cyan-600 text-cyan-300 bg-cyan-900 animate-pulse hover:animate-none rounded-lg">
                <AiOutlineArrowDown className="h-8 w-8" />
            </div>
        </Link>
    );
};

export default NextButton;
