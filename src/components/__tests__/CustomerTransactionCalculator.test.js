import { CustomerTransactionCalculator } from "../../utils/CustomerTransactionCalculator";

describe("Calculate reward points, purchase and check correct dataset", ()=> {

    test("Reward points calculation for single transaction above 100", ()=>{
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

    test("Reward points calculation for multiple transaction with different customer with amount between 50 and 100 and amount below 50", ()=>{
        const transactionData = [{
            "transactionId": 1,
            "customerId": 1,
            "customerName": "Customer One",
            "transactionDate": "2024-01-12",
            "amount": 60
        },
        {
            "transactionId": 2,
            "customerId": 2,
            "customerName": "Customer Two",
            "transactionDate": "2024-02-14",
            "amount": 20
        }
        ];

        const expectedDataset = {
            1: {
                "customerName": "Customer One",
                "monthlyTransaction": {
                    "January": {
                        "monthlyAmount": 60,
                        "monthlyReward": 10
                    }
                },
                "totalRewards": 10,
                "totalPurchase": 60
            },
            2: {
                "customerName": "Customer Two",
                "monthlyTransaction": {
                    "February": {
                        "monthlyAmount": 20,
                        "monthlyReward": 0
                    }
                },
                "totalRewards": 0,
                "totalPurchase": 20
            },
        }

        expect(CustomerTransactionCalculator(transactionData)).toEqual(expectedDataset)
    });
    
    test("Reward points calculation for empty data set", ()=>{
        const transactionData = [];

        const expectedDataset = {};

        expect(CustomerTransactionCalculator(transactionData)).toEqual(expectedDataset)
    });
})