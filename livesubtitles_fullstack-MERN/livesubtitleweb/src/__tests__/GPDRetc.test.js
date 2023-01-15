import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import GDPRetc from "../Pages/GDPRetc"

// Test 1: Page and components render correctly
test("GDPR page renders properly", ()=>{
    render(<GDPRetc/>)
    const button = screen.getAllByRole('button')
    const checkbox = screen.getAllByRole('checkbox')
   
    expect(button).toHaveLength(1)
    expect(checkbox).toHaveLength(1)
})


// Test 2: Functionality of the checkbox
test("See if the checkbox can be checked and unchecked", ()=>{
    render(<GDPRetc/>)
    const checkbox = screen.getByRole('checkbox')

   // See if the checkbox changes state when it is clicked
    expect(checkbox.checked).toBe(false) // checkbox is defaulted to unclicked
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(true)  
})


// Test 3: Check if the GDPR description is correct
// GDPR description can be checked and it'll be added here when the GDPR description is finalised
// test("GDPR statement is present", ()=>{
//     render(<GDPRetc/>)
//     const GDPR_text = screen.getAllByLabelText('GDPR statement')
// })


// Test 4: Functionality of the Next button
/* Reference 3- https://stackoverflow.com/questions/68060782/how-to-test-a-function-inside-react-functional-component-using-jest-spyon-with-r
Work around for nested functions*/

test("Verify if onSubmit is called when next is clicked", ()=>{
    render(<GDPRetc/>);
    const button = screen.getByRole('button')
    const logSpy = jest.spyOn(console, 'log')

    expect(logSpy).not.toHaveBeenCalled()
    fireEvent.click(button) // second button retrieved is the confirm-recording button
    expect(logSpy).toHaveBeenCalled() 
})

/* End of reference 3 */