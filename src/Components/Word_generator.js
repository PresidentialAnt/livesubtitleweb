import {ReactMediaRecorder} from 'react-media-recorder';
import React from 'react';

function Word_generator(props) {
    // function to generate a random word can change later
    var prompt = "Please say: " + props.word;
    console.log(prompt);
    return <h1>{prompt}</h1>
};


export default Word_generator;