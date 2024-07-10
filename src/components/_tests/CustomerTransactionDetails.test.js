import { render, screen } from '@testing-library/react';
import CustomerTransactionDetails from "../CustomerTransactionDetails";

describe("Test Customer Transaction Details component", ()=>{
    test("Test Customer Transaction Details component properly loaded", ()=>{
        render(<CustomerTransactionDetails/>);
        const element = screen.getByTestText("Customer Transaction Details");
        expect(element).toBeInDocument();
    })
})