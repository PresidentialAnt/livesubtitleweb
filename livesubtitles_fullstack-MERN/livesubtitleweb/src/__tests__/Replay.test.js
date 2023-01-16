import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import Replay from "../Pages/Replay"


// Test 1: Page and all components rendered correctly 
test("Replay page renders properly", ()=>{
    render(<Replay/>)
    const buttons = screen.getAllByRole('button')
    const player = screen.getAllByTestId('audio_player') // retrieve the react player using id

    expect(buttons).toHaveLength(5) // buttons: retake-recording, confirm recording, getUsers, blobify, refresh
    expect(player).toHaveLength(1) // 1 audio player object
})


// Test 2: Clicking retake recording calls a callback function (retakeRecording)
/* Reference 1 - taken from https://stackoverflow.com/questions/56813438/how-can-i-test-an-onclick-line-of-a-react-component-using-jest
Reference 2- taken from https://chat.openai.com/chat/0a49af14-adcc-41d3-afc6-5dab6c5b7de5 */
test("Verify if retakeRecording is called when the re-take recording button is clicked", ()=>{
    const fn = jest.fn();
    const { getByRole } = render(<Replay retakeRecording={fn} />);
    const buttons = screen.getAllByRole('button')

    fireEvent.click(buttons[0]) // first button retrieved is the retake recording button
    expect(fn).toHaveBeenCalled();
})
/* End of reference 1 and reference 2*/


// Test 3: Clicking confirm calls a callback function (submission) and console.log()
/* Reference 3- https://stackoverflow.com/questions/68060782/how-to-test-a-function-inside-react-functional-component-using-jest-spyon-with-r
Work around for nested functions*/
test("Verify if submission is called when the Confirm-recording button is clicked", ()=>{
    render(<Replay/>);
    const buttons = screen.getAllByRole('button')
    const logSpy = jest.spyOn(console, 'log')
    fireEvent.click(buttons[1]) // second button retrieved is the confirm-recording button
    expect(logSpy).toHaveBeenCalled() // console.log called twice: in submission(body) and during onClick
   
})

// test("Verify callback when blobbify is clicked", ()=>{
//     render(<Replay/>);
//     const buttons = screen.getAllByRole('button')
//     fireEvent.click(buttons[3])
    
// })
/* End of reference 3 */
