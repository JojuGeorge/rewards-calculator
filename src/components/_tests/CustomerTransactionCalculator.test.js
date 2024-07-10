import { CustomerTransactionCalculator } from "../../utils/CustomerTransactionCalculator";

describe("Calculate reward points, purchase and check correct dataset", ()=> {

    test("Reward points calculation for singe transaction", ()=>{
        const transactionData = [{
            "transactionId": 1,
            "customerId": 1,
            "customerName": "Customer One",
            "transactionDate": "2024-01-12",
            "amount": 120
        }];

        const expectedDataset = {
            1: {
                "customerName": "Customer One",
                "monthlyTransaction": {
                    "January": {
                        "monthlyAmount": 120,
                        "monthlyReward": 90
                    }
                },
                "totalRewards": 90,
                "totalPurchase": 120
            },
        }

        expect(CustomerTransactionCalculator(transactionData)).toEqual(expectedDataset)
    });

    test("Reward points calculation for multiple transaction with different customer", ()=>{
        const transactionData = [{
            "transactionId": 1,
            "customerId": 1,
            "customerName": "Customer One",
            "transactionDate": "2024-01-12",
            "amount": 120
        },
        {
            "transactionId": 2,
            "customerId": 2,
            "customerName": "Customer Two",
            "transactionDate": "2024-02-14",
            "amount": 70
        }
        ];

        const expectedDataset = {
            1: {
                "customerName": "Customer One",
                "monthlyTransaction": {
                    "January": {
                        "monthlyAmount": 120,
                        "monthlyReward": 90
                    }
                },
                "totalRewards": 90,
                "totalPurchase": 120
            },
            2: {
                "customerName": "Customer Two",
                "monthlyTransaction": {
                    "February": {
                        "monthlyAmount": 70,
                        "monthlyReward": 20
                    }
                },
                "totalRewards": 20,
                "totalPurchase": 70
            },
        }

        expect(CustomerTransactionCalculator(transactionData)).toEqual(expectedDataset)
    });

    test("Reward points calculation for multiple transaction of customer", ()=>{
        const transactionData = [{
            "transactionId": 1,
            "customerId": 1,
            "customerName": "Customer One",
            "transactionDate": "2024-01-12",
            "amount": 120
        },
        {
            "transactionId": 11,
            "customerId": 1,
            "customerName": "Customer One",
            "transactionDate": "2024-03-10",
            "amount": 90
        },
        {
            "transactionId": 2,
            "customerId": 2,
            "customerName": "Customer Two",
            "transactionDate": "2024-02-14",
            "amount": 70
        }
        ];

        const expectedDataset = {
            1: {
                "customerName": "Customer One",
                "monthlyTransaction": {
                    "January": {
                        "monthlyAmount": 120,
                        "monthlyReward": 90
                    },
                    "March": {
                        "monthlyAmount": 90,
                        "monthlyReward": 40
                    }
                },
                "totalRewards": 130,
                "totalPurchase": 210
            },
            2: {
                "customerName": "Customer Two",
                "monthlyTransaction": {
                    "February": {
                        "monthlyAmount": 70,
                        "monthlyReward": 20
                    }
                },
                "totalRewards": 20,
                "totalPurchase": 70
            },
        }

        expect(CustomerTransactionCalculator(transactionData)).toEqual(expectedDataset)
    });

    test("Reward points calculation for empty data set", ()=>{
        const transactionData = [];

        const expectedDataset = {}

        expect(CustomerTransactionCalculator(transactionData)).toEqual(expectedDataset)
    });

})