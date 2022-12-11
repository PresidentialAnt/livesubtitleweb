import {ReactMediaRecorder} from 'react-media-recorder';
import React from 'react';

function Store_audio(props) {
    // Button to download audio
    return (
        <div>
            <a href = {props.url} download> <button className='small--button'>Download Audio</button></a>
        </div>
    );
};

export default Store_audio;