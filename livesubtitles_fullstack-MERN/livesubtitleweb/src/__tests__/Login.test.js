import { render, screen, fireEvent, cleanup, waitForElement } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import Login from "../Pages/Login"


test('Login page renders properly', ()=>{
    render(<Login/>)

    // should have a username and password input, next button, refresh button, logout button and register button
    const prompt = screen.getByText("Enter your details")
    const username_input = screen.getByPlaceholderText("Username")
    const password_input = screen.getByPlaceholderText("Password")
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(5)
})


test("Text changes when users types into the input for username or password", ()=>{
    render(<Login/>)

    const username = screen.getByPlaceholderText('Username')
    const password = screen.getByPlaceholderText('Password')

    // Simulate user typing: 
    userEvent.type(username, "Fred123") // Type username into the input
    userEvent.type(password, "1234") // Type password into the input

    // Assertions: 
    expect(username.value).toBe("Fred123")
    expect(password.value).toBe("1234")
})



// Tests for the 4 buttons

/* Reference 1 - taken from https://stackoverflow.com/questions/56813438/how-can-i-test-an-onclick-line-of-a-react-component-using-jest
Reference 2- taken from https://chat.openai.com/chat/0a49af14-adcc-41d3-afc6-5dab6c5b7de5 */
test("Verify if registerDir is called when the register button is clicked", ()=>{
    const fn = jest.fn();
    const { getByRole } = render(<Login registerDir={fn} />);
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[4]) // fourth button retrieved is the register button
    expect(fn).toHaveBeenCalled();
})
/* End of reference 1 and reference 2*/


/* Reference 3- https://stackoverflow.com/questions/68060782/how-to-test-a-function-inside-react-functional-component-using-jest-spyon-with-r
Work around for nested functions*/
test("Verify if onSubmit is called when the next button is clicked", ()=>{
    render(<Login/>);
    const buttons = screen.getAllByRole('button')
    const logSpy = jest.spyOn(console, 'log')

    expect(logSpy).not.toHaveBeenCalled()
    fireEvent.click(buttons[0]) // first button retrieved is the next button
    expect(logSpy).toHaveBeenCalled() // console logs username and password when logging in 
   
})
/* End of reference 3 */


// test("Verify if refreshToken is called when the refresh button is clicked", ()=>{
//     render(<Login/>);
//     const buttons = screen.getAllByRole('button')
//     fireEvent.click(buttons[1]) // second button retrieved is the refresh button
//     expect(AxiosError) // For test scripts, a mock of axios is created so error is expected
   
// })

// test("Verify if logout is called when the logout button is clicked", ()=>{
//     render(<Login/>);
//     const buttons = screen.getAllByRole('button')

//     fireEvent.click(buttons[2]) // third button retrieved is the logout button
//     expect(AxiosError) // For test scripts, a mock of axios is created so error is expected
   
// })