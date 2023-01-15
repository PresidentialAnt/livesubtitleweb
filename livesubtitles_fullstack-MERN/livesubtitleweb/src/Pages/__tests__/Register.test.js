import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import Register from "../Register"
// import App from "../../App.js"

// Test 1: Register page renders correctly
test("Register page renders", ()=>{
    render(<Register/>)
})


// Test 2: All input boxes rendered correctly
test("All text inputs are present", ()=>{
    const result = render(<Register/>)
    const textInputs = screen.getAllByDisplayValue("")
    const username_input = screen.getAllByPlaceholderText("Username") // Username textbox is already filled in 
    textInputs.push(username_input)
    expect(textInputs).toHaveLength(3)
})


// Test 3: All buttons rendered correctly
test("All buttons are present", ()=>{
    render(<Register/>)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2) // Next and login button
})


// Test 4: Input boxes can accept user's typing
test("Text changes when users types into each input box", ()=>{
    render(<Register/>)
    // Find the input boxes
    const username = screen.getByPlaceholderText('Username')
    const fullName = screen.getByPlaceholderText('Full Name')
    const password = screen.getByPlaceholderText('Password')

    userEvent.type(username, "{selectall}{backspace}FredLovesJS") // To simulate the typing of a username and clear the preset username
    userEvent.type(fullName, "Fred123") // To simulate the typing of a username and clear the preset username
    userEvent.type(password, "123") // Type password

    // Assertions: 
    expect(username.value).toBe("FredLovesJS")
    expect(fullName.value).toBe("Fred123")
    expect(password.value).toBe("123")
})


// Test 5: CP level dropdown selector can be changed to different values
test("CP level dropdown selector can be changed to a different value", ()=>{
    render(<Register/>)
    const selector = screen.getByRole('combobox')
    const default_cp_level = selector.value

    // Select a particular CP level
    fireEvent.keyDown(selector, {target: {value: '2'}}) // User fireEvent to change the value selected in the drop down

    // Assertions
    expect(selector.value).toBe("2")
    expect(selector.value).not.toBe(default_cp_level) // check if the option selected was different
})


// Test 6: Clicking Login calls a callback function (loginDir)
/* Reference 1 - taken from https://stackoverflow.com/questions/56813438/how-can-i-test-an-onclick-line-of-a-react-component-using-jest
Reference 2- taken from https://chat.openai.com/chat/0a49af14-adcc-41d3-afc6-5dab6c5b7de5 */
test("Verify if loginDir is called when login is clicked", ()=>{
    const fn = jest.fn();
    const { getByRole } = render(<Register loginDir={fn} />);
    const buttons = screen.getAllByRole('button')

    fireEvent.click(buttons[1]) // second button retrieved is the login button
    expect(fn).toHaveBeenCalled();
})
/* End of reference 1 and reference 2*/


// Test 7: Clicking next calls a callback function (onSubmit)
/* Reference 3- https://stackoverflow.com/questions/68060782/how-to-test-a-function-inside-react-functional-component-using-jest-spyon-with-r
Work around for nested functions*/
test("Verify if onSubmit is called when next is clicked", ()=>{
    render(<Register/>);
    const buttons = screen.getAllByRole('button')
    const logSpy = jest.spyOn(console, 'log')

    expect(logSpy).not.toHaveBeenCalled()
    fireEvent.click(buttons[0]) // first button retrieved is the next button
    expect(logSpy).toHaveBeenCalled() // Register.js prints all of the user's data via console.log()
   
})
/* End of reference 3 */