import CustomerRewardCalculator from "../../utils/CustomerRewardCalculator";

describe("Testcase calculating Reward points based on Transaction", ()=>{
    test("Correct reward point for transaction between 50 to 100", ()=>{
        expect(CustomerRewardCalculator(70)).toBe(20)
    });

    test("Correct reward point for transaction above 100", ()=>{
        expect(CustomerRewardCalculator(120)).toBe(90)
    });

    test("Correct reward point for transaction below 50", ()=>{
        expect(CustomerRewardCalculator(30)).toBe(0)
    });

    test("Correct reward point for transaction of 50", ()=>{
        expect(CustomerRewardCalculator(50)).toBe(0)
    });

    test("Correct reward point for transaction of 100", ()=>{
        expect(CustomerRewardCalculator(100)).toBe(50)
    });
})