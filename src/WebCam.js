import { Button } from "react-bootstrap";
import React from "react";
import Webcam from "react-webcam";
import {get_string} from "./Api"


const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data); // window.atob(b64Data)
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

export const WebcamCapture = ({setText}) => {
    const webcamRef = React.useRef(null);
    const [devices, setDevices] = React.useState([]);

    const handleDevices = React.useCallback(
    mediaDevices =>
        setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
    );

    // React.useEffect(
    // () => {
    //     navigator.mediaDevices.enumerateDevices().then(handleDevices);
    // },
    // [handleDevices]
    // );

    const capture = React.useCallback(
    () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const block = imageSrc.split(';')
        const contentType = block[0].split(":")[1]
        const realData = block[1].split(',')[1]
        const blob = b64toBlob(realData, contentType);
        const formData = new FormData();
        formData.append('file', blob)
        get_string(formData)
        .then(res => {
            setText(res.data)
            console.log(res.data)
        })
        .catch(error =>  console.log(error))
    },
    [webcamRef]
    );

    return (
    <>
        <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
        />
        <Button
        variant="success"
        onClick={capture}
        >Capture photo</Button>
        <>
    </>
    </>
    );
};