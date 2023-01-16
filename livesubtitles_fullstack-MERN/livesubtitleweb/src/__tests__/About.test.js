import { render, screen, fireEvent } from "@testing-library/react";
import About from "../Pages/About"


// Test 1: rendering the page:
test("About page renders", ()=>{
    render(<About/>)
    const sentence1 = screen.getByText("This tool is designed to take recordings from individuals with cerebral palsy to train a word recognition machine learning model.")
    const sentence2 = screen.getByText("The recordings are also available to the speech therapists of the users.")
})
