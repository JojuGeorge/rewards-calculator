import { CustomerTransactionCalculator } from "../utils/CustomerTransactionCalculator";
import { CalculateTotalRewardsAndPurchase } from "../utils/configureDataset/CalculateTotalRewardsAndPurchase";

describe("Calculate reward points, purchase and check correct dataset", () => {
  test("Reward points calculation for single transaction above 100", () => {
    const transactionData = [
      {
        transactionId: 1,
        customerId: 1,
        customerName: "Customer One",
        transactionDate: "2024-01-12",
        amount: 120,
      },
    ];

    const expectedDataset = {
      1: {
        customerName: "Customer One",
        yearlyTransaction: {
          "2024 ": {
            totalRewardsPerYear: 90,
            totalPurchasePerYear: 120,
            monthlyTransaction: {
              January: {
                monthlyAmount: 120,
                monthlyReward: 90,
              },
            },
          },
        },
        totalRewards: 90,
        totalTransaction: 120,
      },
    };

    expect(
      CalculateTotalRewardsAndPurchase(
        CustomerTransactionCalculator(transactionData)
      )
    ).toEqual(expectedDataset);
  });

  test("Calculate transaction with purchases with a decimal point 200.3", () => {
    const transactionData = [
      {
        transactionId: 1,
        customerId: 1,
        customerName: "Customer One",
        transactionDate: "2024-01-12",
        amount: 200.3,
      },
    ];

    const expectedDataset = {
      1: {
        customerName: "Customer One",
        yearlyTransaction: {
          "2024 ": {
            totalRewardsPerYear: 251,
            totalPurchasePerYear: 200,
            monthlyTransaction: {
              January: {
                monthlyAmount: 200.3,
                monthlyReward: 251,
              },
            },
          },
        },
        totalRewards: 251,
        totalTransaction: 200,
      },
    };

    expect(
      CalculateTotalRewardsAndPurchase(
        CustomerTransactionCalculator(transactionData)
      )
    ).toEqual(expectedDataset);
  });

  test("Reward points calculation for multiple transaction with different customer", () => {
    const transactionData = [
      {
        transactionId: 1,
        customerId: 1,
        customerName: "Customer One",
        transactionDate: "2024-01-12",
        amount: 120,
      },
      {
        transactionId: 2,
        customerId: 2,
        customerName: "Customer Two",
        transactionDate: "2024-02-14",
        amount: 70,
      },
    ];

    const expectedDataset = {
      1: {
        customerName: "Customer One",
        yearlyTransaction: {
          "2024 ": {
            totalRewardsPerYear: 90,
            totalPurchasePerYear: 120,
            monthlyTransaction: {
              January: {
                monthlyAmount: 120,
                monthlyReward: 90,
              },
            },
          },
        },
        totalRewards: 90,
        totalTransaction: 120,
      },
      2: {
        customerName: "Customer Two",
        yearlyTransaction: {
          "2024 ": {
            totalRewardsPerYear: 20,
            totalPurchasePerYear: 70,
            monthlyTransaction: {
              February: {
                monthlyAmount: 70,
                monthlyReward: 20,
              },
            },
          },
        },
        totalRewards: 20,
        totalTransaction: 70,
      },
    };

    expect(
      CalculateTotalRewardsAndPurchase(
        CustomerTransactionCalculator(transactionData)
      )
    ).toEqual(expectedDataset);
  });

  test("Reward points calculation for multiple transaction of customer", () => {
    const transactionData = [
      {
        transactionId: 1,
        customerId: 1,
        customerName: "Customer One",
        transactionDate: "2024-01-12",
        amount: 120,
      },
      {
        transactionId: 11,
        customerId: 1,
        customerName: "Customer One",
        transactionDate: "2024-03-10",
        amount: 90,
      },
      {
        transactionId: 2,
        customerId: 2,
        customerName: "Customer Two",
        transactionDate: "2024-02-14",
        amount: 70,
      },
    ];

    const expectedDataset = {
      1: {
        customerName: "Customer One",
        yearlyTransaction: {
          "2024 ": {
            totalRewardsPerYear: 130,
            totalPurchasePerYear: 210,
            monthlyTransaction: {
              March: {
                monthlyAmount: 90,
                monthlyReward: 40,
              },
              January: {
                monthlyAmount: 120,
                monthlyReward: 90,
              },
            },
          },
        },
        totalRewards: 130,
        totalTransaction: 210,
      },
      2: {
        customerName: "Customer Two",
        yearlyTransaction: {
          "2024 ": {
            totalRewardsPerYear: 20,
            totalPurchasePerYear: 70,
            monthlyTransaction: {
              February: {
                monthlyAmount: 70,
                monthlyReward: 20,
              },
            },
          },
        },
        totalRewards: 20,
        totalTransaction: 70,
      },
    };

    expect(
      CalculateTotalRewardsAndPurchase(
        CustomerTransactionCalculator(transactionData)
      )
    ).toEqual(expectedDataset);
  });

  test("Reward points calculation for multiple transaction with different customer with amount between 50 and 100 and amount below 50", () => {
    const transactionData = [
      {
        transactionId: 1,
        customerId: 1,
        customerName: "Customer One",
        transactionDate: "2024-01-12",
        amount: 60,
      },
      {
        transactionId: 2,
        customerId: 2,
        customerName: "Customer Two",
        transactionDate: "2024-02-14",
        amount: 20,
      },
    ];

    const expectedDataset = {
      1: {
        customerName: "Customer One",
        yearlyTransaction: {
          "2024 ": {
            totalRewardsPerYear: 10,
            totalPurchasePerYear: 60,
            monthlyTransaction: {
              January: {
                monthlyAmount: 60,
                monthlyReward: 10,
              },
            },
          },
        },
        totalRewards: 10,
        totalTransaction: 60,
      },
      2: {
        customerName: "Customer Two",
        yearlyTransaction: {
          "2024 ": {
            totalRewardsPerYear: 0,
            totalPurchasePerYear: 20,
            monthlyTransaction: {
              February: {
                monthlyAmount: 20,
                monthlyReward: 0,
              },
            },
          },
        },
        totalRewards: 0,
        totalTransaction: 20,
      },
    };

    expect(
      CalculateTotalRewardsAndPurchase(
        CustomerTransactionCalculator(transactionData)
      )
    ).toEqual(expectedDataset);
  });

  test("Get only latest transaction data of Period of N months, where transaction data contains more than N consecutive months  of transaction within the same year ", () => {
    const transactionData = [
      {
        transactionId: 22,
        customerId: 1,
        customerName: "Customer One",
        transactionDate: "2024-05-20",
        amount: 100,
      },
      {
        transactionId: 3,
        customerId: 1,
        customerName: "Customer One",
        transactionDate: "2024-04-05",
        amount: 101,
      },
      {
        transactionId: 12,
        customerId: 1,
        customerName: "Customer One",
        transactionDate: "2024-03-01",
        amount: 130,
      },
      {
        transactionId: 1,
        customerId: 1,
        customerName: "Customer One",
        transactionDate: "2024-01-12",
        amount: 200.3,
      },
    ];

    const expectedDataset = {
      1: {
        customerName: "Customer One",
        yearlyTransaction: {
          "2024 ": {
            totalRewardsPerYear: 212,
            totalPurchasePerYear: 331,
            monthlyTransaction: {
              May: {
                monthlyAmount: 100,
                monthlyReward: 50,
              },
              April: {
                monthlyAmount: 101,
                monthlyReward: 52,
              },
              March: {
                monthlyAmount: 130,
                monthlyReward: 110,
              },
            },
          },
        },
        totalTransaction: 331,
        totalRewards: 212,
      },
    };

    expect(
      CalculateTotalRewardsAndPurchase(
        CustomerTransactionCalculator(transactionData)
      )
    ).toEqual(expectedDataset);
  });

  test("Transaction dataset with multiple transaction within the same month", () => {
    const transactionData = [
      {
        transactionId: 4,
        customerId: 2,
        customerName: "Customer Two",
        transactionDate: "2024-03-12",
        amount: 100,
      },
      {
        transactionId: 4,
        customerId: 2,
        customerName: "Customer Two",
        transactionDate: "2024-03-14",
        amount: 100,
      },
    ];

    const expectedDataset = {
      2: {
        customerName: "Customer Two",
        yearlyTransaction: {
          "2024 ": {
            totalRewardsPerYear: 100,
            totalPurchasePerYear: 200,
            monthlyTransaction: {
              March: {
                monthlyAmount: 200,
                monthlyReward: 100,
              },
            },
          },
        },
        totalTransaction: 200,
        totalRewards: 100,
      },
    };

    expect(
      CalculateTotalRewardsAndPurchase(
        CustomerTransactionCalculator(transactionData)
      )
    ).toEqual(expectedDataset);
  });

  test("Get only latest transaction of N month period from dataset containing consecutive transaction of N months with different years", () => {
    const transactionData = [
      {
        transactionId: 5,
        customerId: 3,
        customerName: "Customer Three",
        transactionDate: "2024-01-25",
        amount: 120,
      },
      {
        transactionId: 5,
        customerId: 3,
        customerName: "Customer Three",
        transactionDate: "2023-12-25",
        amount: 120,
      },
      {
        transactionId: 5,
        customerId: 3,
        customerName: "Customer Three",
        transactionDate: "2023-11-25",
        amount: 120,
      },
    ];

    const expectedDataset = {
      3: {
        customerName: "Customer Three",
        yearlyTransaction: {
          "2024 ": {
            totalRewardsPerYear: 90,
            totalPurchasePerYear: 120,
            monthlyTransaction: {
              January: {
                monthlyAmount: 120,
                monthlyReward: 90,
              },
            },
          },
          "2023 ": {
            totalRewardsPerYear: 180,
            totalPurchasePerYear: 240,
            monthlyTransaction: {
              December: {
                monthlyAmount: 120,
                monthlyReward: 90,
              },
              November: {
                monthlyAmount: 120,
                monthlyReward: 90,
              },
            },
          },
        },
        totalTransaction: 360,
        totalRewards: 270,
      },
    };

    expect(
      CalculateTotalRewardsAndPurchase(
        CustomerTransactionCalculator(transactionData)
      )
    ).toEqual(expectedDataset);
  });

  test("Get only latest transaction of N month period from dataset containing non consecutive transaction of N months with different years", () => {
    const transactionData = [
      {
        transactionId: 68,
        customerId: 4,
        customerName: "Customer Four",
        transactionDate: "2024-01-02",
        amount: 44,
      },
      {
        transactionId: 68,
        customerId: 4,
        customerName: "Customer Four",
        transactionDate: "2023-04-02",
        amount: 44,
      },
      {
        transactionId: 66,
        customerId: 4,
        customerName: "Customer Four",
        transactionDate: "2023-01-25",
        amount: 80,
      },
    ];

    const expectedDataset = {
      4: {
        customerName: "Customer Four",
        yearlyTransaction: {
          "2024 ": {
            totalRewardsPerYear: 0,
            totalPurchasePerYear: 44,
            monthlyTransaction: {
              January: {
                monthlyAmount: 44,
                monthlyReward: 0,
              },
            },
          },
        },
        totalTransaction: 44,
        totalRewards: 0,
      },
    };

    expect(
      CalculateTotalRewardsAndPurchase(
        CustomerTransactionCalculator(transactionData)
      )
    ).toEqual(expectedDataset);
  });

  test("Get only latest transaction of N month period from dataset containing non consecutive transaction of N months within same year", () => {
    const transactionData = [
      {
        transactionId: 66,
        customerId: 5,
        customerName: "Customer Five",
        transactionDate: "2024-07-01",
        amount: 80,
      },
      {
        transactionId: 66,
        customerId: 5,
        customerName: "Customer Five",
        transactionDate: "2024-06-01",
        amount: 80,
      },
      {
        transactionId: 66,
        customerId: 5,
        customerName: "Customer Five",
        transactionDate: "2024-01-25",
        amount: 80,
      },
    ];

    const expectedDataset = {
      5: {
        customerName: "Customer Five",
        yearlyTransaction: {
          "2024 ": {
            totalRewardsPerYear: 60,
            totalPurchasePerYear: 160,
            monthlyTransaction: {
              July: {
                monthlyAmount: 80,
                monthlyReward: 30,
              },
              June: {
                monthlyAmount: 80,
                monthlyReward: 30,
              },
            },
          },
        },
        totalTransaction: 160,
        totalRewards: 60,
      },
    };

    expect(
      CalculateTotalRewardsAndPurchase(
        CustomerTransactionCalculator(transactionData)
      )
    ).toEqual(expectedDataset);
  });

  test("Reward points calculation for empty data set", () => {
    const transactionData = [];

    const expectedDataset = {};

    expect(
      CalculateTotalRewardsAndPurchase(
        CustomerTransactionCalculator(transactionData)
      )
    ).toEqual(expectedDataset);
  });
});
