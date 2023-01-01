import React from 'react'

const Settings = () => {
    return (
    <section>
        <h1>Settings</h1>
        <div className='div'>
            <p>Font:</p>
            <input type ='radio' name='font' checked/>
            <p>Default</p>
            <input type ='radio' name='font'/>
            <p>Better legibility</p>
        </div>
        <div className='div'>
            <p>Font size:</p>
            <input type ='radio' name='size'/>
            <p>Small</p>
            <input type ='radio' name='size' checked/>
            <p>Medium</p>
            <input type ='radio' name='size'/>
            <p>Large</p>
        </div>
    </section>
    )

}

export default Settings
