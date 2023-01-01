import React from 'react'

const Thanks = ({onClick,debug}) => {
    return(
        <section>
            <h1>Thank you for participating!</h1>
            <p></p>
            <button className='small--button' onClick={onClick}>Record another word</button>
            <button className='small--button' onClick={debug}>Check Connectivity Debug</button>
        </section>
         
    )
}

export default Thanks
