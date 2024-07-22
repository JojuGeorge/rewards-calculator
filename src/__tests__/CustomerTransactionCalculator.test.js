import { CustomerTransactionCalculator } from "../utils/CustomerTransactionCalculator";
import { calculateTotalRewards } from '../utils/configureDataset/CalculateTotalRewards'

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
          2024: {
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
      },
    };

    expect(
      calculateTotalRewards(CustomerTransactionCalculator(transactionData))
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
          2024: {
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
      },
    };

    expect(
      calculateTotalRewards(CustomerTransactionCalculator(transactionData))
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
          2024: {
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
      },
      2: {
        customerName: "Customer Two",
        yearlyTransaction: {
          2024: {
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
      },
    };

    expect(
      calculateTotalRewards(CustomerTransactionCalculator(transactionData))
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
          2024: {
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
      },
      2: {
        customerName: "Customer Two",
        yearlyTransaction: {
          2024: {
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
      },
    };

    expect(
      calculateTotalRewards(CustomerTransactionCalculator(transactionData))
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
          2024: {
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
      },
      2: {
        customerName: "Customer Two",
        yearlyTransaction: {
          2024: {
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
      },
    };

    expect(
      calculateTotalRewards(CustomerTransactionCalculator(transactionData))
    ).toEqual(expectedDataset);
  });

  test("Reward points calculation for empty data set", () => {
    const transactionData = [];

    const expectedDataset = {};

    expect(
      calculateTotalRewards(CustomerTransactionCalculator(transactionData))
    ).toEqual(expectedDataset);
  });
});
