import { render, screen, fireEvent } from "@testing-library/react";
import Thanks from "../Thanks"
// import App from "../../App.js"


// Test 1: Page renders correctly
test("Thanks page renders", ()=>{
    render(<Thanks/>)
})


// Test 2: Two buttons are rendered 
test("Two buttons are present on the thanks page", ()=>{
    render(<Thanks/>);
    const buttons = screen.getAllByRole("button");
    const button1 = screen.getByRole('button', {
        name: "Record another word"
    });
    
    const button2 = screen.getByRole('button', {
        name: "Check Connectivity Debug"
    });

    expect(buttons).toHaveLength(2);
})


// Test 3: Thank you mesage renders
test("Thank you message renders", ()=>{
    render(<Thanks/>)
    const message = screen.getByText("Thank you for participating!")
})


// Test 4: Clicking record another word calls a callback function (onClick)
/* Reference 1 - taken from https://stackoverflow.com/questions/56813438/how-can-i-test-an-onclick-line-of-a-react-component-using-jest
Reference 2- taken from https://chat.openai.com/chat/0a49af14-adcc-41d3-afc6-5dab6c5b7de5 */
test("Verify if onClick is called when the Record-another-word button is clicked", ()=>{
    const fn = jest.fn();
    const { getByRole } = render(<Thanks onClick={fn} />);
    const buttons = screen.getAllByRole('button')

    fireEvent.click(buttons[0]) // first button retrieves the Record-another-word button
    expect(fn).toHaveBeenCalled();
})


// Test 5: Clicking check connectivity debug calls a callback function (debug)
test("Verify if debug is called when the Check-Connectivity-Debug button is clicked", ()=>{
    const fn = jest.fn();
    const { getByRole } = render(<Thanks debug={fn} />);
    const buttons = screen.getAllByRole('button')

    fireEvent.click(buttons[1]) // second button retrieves the Check-Connectivity-Debug button
    expect(fn).toHaveBeenCalled();
})
/* End of reference 1 and reference 2*/