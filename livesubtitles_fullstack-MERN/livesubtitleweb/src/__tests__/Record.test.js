import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import Record from "../Pages/Record"


// Test 1: Page and its components render properly  
test("Record page renders properly", ()=>{
    render(<Record/>)
    const buttons = screen.getAllByRole('button')
    const word_prompt = screen.getAllByText("Please say: ")
    const status = screen.getAllByText("Recording status: idle")
    const player = screen.getAllByTestId('record_audio') // retrieve ReactMediaPlayer using id

    expect(buttons).toHaveLength(2) // 2 button: Start-recording and a stop-recording
})


// Test 2: Clicking Stop recording calls a callback function (onClick)
/* Reference 1 - taken from https://stackoverflow.com/questions/56813438/how-can-i-test-an-onclick-line-of-a-react-component-using-jest
Reference 2- taken from https://chat.openai.com/chat/0a49af14-adcc-41d3-afc6-5dab6c5b7de5 */
test("Verify if retakeRecording is called when the re-take recording button is clicked", ()=>{
    const fn = jest.fn();
    const { getByRole } = render(<Replay onClick={fn} />);
    const buttons = screen.getAllByRole('button')

    fireEvent.click(buttons[1]) // second button retrieved is the stop recording button
    expect(fn).toHaveBeenCalled();
})
/* End of reference 1 and reference 2*/


// Test 3: Clicking start recording changes recording status
test("Verify if retakeRecording is called when the re-take recording button is clicked", ()=>{
    render(<Record/>)
    const word_prompt = screen.getByText("Recording status: idle")
    const buttons = screen.getAllByRole('button')

    fireEvent.click(buttons[0]) // first button retrieved is the start recording button
    expect(word_prompt).not.toBeInDocument() // When start recording is clicked the status element changes\
})


// test('placeholder', ()=>{ // Uncomment this and comment the rest for now since reactmediaplayer has dependency causing jest to error out when it renders record
//     expect(true).toBe(true)
// })