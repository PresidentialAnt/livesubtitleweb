import React from 'react'

const Thanks = ({onClick}) => {
    return(
        <section>
            <h1>Thank you for participating!</h1>
            <p></p>
            <button className='small--button' onClick={onClick}>Record another word</button>
        </section>
         
    )
}

export default Thanks
