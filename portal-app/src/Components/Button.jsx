// These are buttons to be used throught the app to create uniformity
// Author: R. Markowitz
// Last Updated: Jan 15, 2025

import React from 'react';
import { Button } from 'react-bootstrap';
import '../custom.scss'
import Spinner from 'react-bootstrap/Spinner';



const SubmitButton = (props) => {
    const text = props.text;
    return(
            <Button variant = "secondary" className = "m-3" onClick = {props.onClick} width = "25%">
                {text.includes("...") && 
                    (<Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                    />)}      
                    {text}
            </Button>
    )
}

const DownloadFileButton = (props) => {
    const filePath = props.filePath;
    const brokenDownPath = filePath.split("/");
    const fileName = brokenDownPath[brokenDownPath.length - 1];


    return(
        <a href = {filePath} download = {fileName}>
            <Button variant = "light" size = "sm" onClick = {props.onClick} >Download Template</Button>
        </a>
    )
}

const UploadMoreButton = (props) => {
    return(
       <Button variant = "light"  onClick = {props.onClick}>Upload More</Button> 
    )
    
}

const NavButton = (props) => {
    return (
        <Button variant = "link" className = "m-2" onClick = {props.onClick} width = "20%">{props.text}</Button>
    )
}

export default SubmitButton;
export {
    DownloadFileButton,
    UploadMoreButton,
    NavButton
};