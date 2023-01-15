import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import Settings from "../Settings"


// Test 1: Setting page and buttons renders correctly
test("Settings page renders", ()=>{
    render(<Settings/>)
    const buttons = screen.getAllByRole('radio')
    expect(buttons).toHaveLength(5) // 5 buttons total on the page
})


// Test 2: Test that the font radio buttons have different states
test("Only 1 Font button can be checked", ()=>{
    render(<Settings/>)
    const buttons = screen.getAllByRole('radio') // first 2 are font radio buttons

    expect(buttons[0].checked).not.toBe(buttons[1].checked) // first font button is set to true
})


// Test 3: Test that the font size radio buttons have different states
test("Only 1 Font size button is checked", ()=>{
    render(<Settings/>)
    const buttons = screen.getAllByRole('radio') // last 3 are font radio buttons
   
    expect(buttons[3].checked).not.toBe(buttons[2].checked)
    expect(buttons[3].checked).not.toBe(buttons[4].checked)
})

