import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import ModeSelect from "../ModeSelect"


// Test 1: Page and buttons render correctly
test("Mode Selection page renders properly", ()=>{
    render(<ModeSelect/>)
    // Contains a button to record your voice and a button for a potential game mode
    const buttons = screen.getAllByRole('button')

    expect(buttons).toHaveLength(2)
})

// Test 2: Functionality of Record voice button 
/* Reference 1 - taken from https://stackoverflow.com/questions/56813438/how-can-i-test-an-onclick-line-of-a-react-component-using-jest
Reference 2- taken from https://chat.openai.com/chat/0a49af14-adcc-41d3-afc6-5dab6c5b7de5 */
test("Verify if rawData callback is called when the Record-Voice-Only-Button is clicked", ()=>{
    const fn = jest.fn();
    const { getByRole } = render(<ModeSelect rawData={fn} />);
    const button = screen.getAllByRole('button')
    fireEvent.click(button[0]) 
    expect(fn).toHaveBeenCalled();
})
/* End of reference 1 and reference 2*/


// Test for the onclick event callback function to be implemented when the game is developed: