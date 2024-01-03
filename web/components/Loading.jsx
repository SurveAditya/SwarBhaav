import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ type, color }) => (
    <ReactLoading
        type={type || "cubes"}
        color={color || "#72ccef"}
        height={667}
        width={375}
    />
);

export default Loading;
