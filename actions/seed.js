"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Realistic categories with typical ranges and descriptions
const EXPENSE_TEMPLATES = [
  {
    category: "housing",
    range: [1200, 2200],
    descriptions: ["Monthly Apartment Rent", "Mortgage Payment", "Property Maintenance", "Home Repair"],
  },
  {
    category: "transportation",
    range: [25, 80],
    descriptions: ["Shell Gas Station Refill", "Metro Transit Monthly Card", "Uber Ride", "City Parking", "EV Charging Station"],
  },
  {
    category: "groceries",
    range: [60, 260],
    descriptions: ["Trader Joe's Groceries", "Whole Foods Market", "Costco Wholesale Supplies", "Local Farmers Market"],
  },
  {
    category: "utilities",
    range: [90, 280],
    descriptions: ["Electricity & Power Grid", "High-Speed Fiber Internet", "Water & Sewage Utility", "Natural Gas Heating"],
  },
  {
    category: "entertainment",
    range: [20, 140],
    descriptions: ["Netflix & Spotify Subscription", "Movie Theater Tickets", "Steam Game Purchase", "Concert Ticket", "PlayStation Store"],
  },
  {
    category: "food",
    range: [15, 85],
    descriptions: ["Chipotle Mexican Grill", "Starbucks Coffee & Pastry", "Italian Bistro Dinner", "UberEats Delivery", "Sushi Bar Lunch"],
  },
  {
    category: "shopping",
    range: [35, 320],
    descriptions: ["Amazon Prime Order", "Apple App & Cloud Store", "Nike Sporting Goods", "Target Home Goods", "IKEA Furnishing"],
  },
  {
    category: "healthcare",
    range: [40, 250],
    descriptions: ["CVS Pharmacy Prescription", "Dental Checkup Copay", "Vision Care Glasses", "Gym & Fitness Membership"],
  },
  {
    category: "education",
    range: [50, 450],
    descriptions: ["Online Coursera / Udemy Certification", "Technical Books & Publications", "Workshop Seminar Fee"],
  },
  {
    category: "travel",
    range: [250, 1200],
    descriptions: ["Delta Airlines Flight Ticket", "Airbnb Weekend Getaway", "Hotel Stay & Lodging", "Car Rental Service"],
  },
  {
    category: "bills",
    range: [50, 180],
    descriptions: ["Mobile Wireless Bill", "Cloud Storage Subscription", "Software SaaS License"],
  },
  {
    category: "insurance",
    range: [110, 290],
    descriptions: ["Auto Insurance Monthly Premium", "Health & Dental Coverage", "Renter's Insurance Policy"],
  },
];

const INCOME_TEMPLATES = [
  {
    category: "salary",
    range: [4800, 7500],
    descriptions: ["Tech Corp Bi-Weekly Direct Deposit", "Monthly Base Salary Payout", "Engineering Payroll Credit"],
  },
  {
    category: "freelance",
    range: [600, 2400],
    descriptions: ["UI/UX Design Consulting Invoice", "Web Development Milestone", "Technical Advisory Consulting"],
  },
  {
    category: "investments",
    range: [200, 1100],
    descriptions: ["Index Fund Quarterly Dividend", "S&P 500 Stock Distribution", "High Yield Treasury Interest"],
  },
  {
    category: "other-income",
    range: [80, 500],
    descriptions: ["Cashback Rewards Credit", "Peer-to-Peer Transfer (Venmo)", "Marketplace Item Sold"],
  },
];

// Helper to generate random amount in range rounded to 2 decimal places
function getRandomAmount(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Generate static/dummy transactions spanning 2025-01-01 to 2026-08-01 for an account
function generateAccountTransactions(userId, accountId) {
  const transactions = [];
  let calculatedBalance = 5000; // Base starting balance

  const startDate = new Date(2025, 0, 1, 9, 0, 0); // Jan 1, 2025
  const endDate = new Date(2026, 7, 1, 18, 0, 0);   // Aug 1, 2026

  let curr = new Date(startDate.getTime());

  while (curr <= endDate) {
    const dayOfMonth = curr.getDate();
    const dayOfWeek = curr.getDay(); // 0 = Sun, 6 = Sat
    const month = curr.getMonth();
    const year = curr.getFullYear();

    // 1. Monthly Salary (1st and 15th)
    if (dayOfMonth === 1) {
      const salaryTemplate = INCOME_TEMPLATES[0]; // salary
      const amount = getRandomAmount(salaryTemplate.range[0], salaryTemplate.range[1]);
      const txDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate(), 9, 30, 0);
      transactions.push({
        id: crypto.randomUUID(),
        type: "INCOME",
        amount,
        description: getRandomItem(salaryTemplate.descriptions),
        date: txDate,
        category: salaryTemplate.category,
        status: "COMPLETED",
        userId,
        accountId,
        createdAt: txDate,
        updatedAt: txDate,
      });
      calculatedBalance += amount;

      // Rent/Housing Expense on the 1st
      const housingTemplate = EXPENSE_TEMPLATES[0];
      const rentAmount = getRandomAmount(housingTemplate.range[0], housingTemplate.range[1]);
      const rentDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate(), 11, 0, 0);
      transactions.push({
        id: crypto.randomUUID(),
        type: "EXPENSE",
        amount: rentAmount,
        description: getRandomItem(housingTemplate.descriptions),
        date: rentDate,
        category: housingTemplate.category,
        status: "COMPLETED",
        userId,
        accountId,
        createdAt: rentDate,
        updatedAt: rentDate,
      });
      calculatedBalance -= rentAmount;
    }

    if (dayOfMonth === 15) {
      // Secondary Income (Salary part 2 or freelance/investments)
      const incTemplate = Math.random() < 0.6 ? INCOME_TEMPLATES[0] : getRandomItem(INCOME_TEMPLATES.slice(1));
      const amount = getRandomAmount(incTemplate.range[0] * 0.8, incTemplate.range[1] * 0.9);
      const txDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate(), 10, 15, 0);
      transactions.push({
        id: crypto.randomUUID(),
        type: "INCOME",
        amount,
        description: getRandomItem(incTemplate.descriptions),
        date: txDate,
        category: incTemplate.category,
        status: "COMPLETED",
        userId,
        accountId,
        createdAt: txDate,
        updatedAt: txDate,
      });
      calculatedBalance += amount;
    }

    // 2. Fixed Recurring Monthly Bills
    if (dayOfMonth === 5) {
      // Utilities
      const utTemplate = EXPENSE_TEMPLATES.find((t) => t.category === "utilities");
      const amt = getRandomAmount(utTemplate.range[0], utTemplate.range[1]);
      const txDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate(), 14, 0, 0);
      transactions.push({
        id: crypto.randomUUID(),
        type: "EXPENSE",
        amount: amt,
        description: getRandomItem(utTemplate.descriptions),
        date: txDate,
        category: utTemplate.category,
        status: "COMPLETED",
        userId,
        accountId,
        createdAt: txDate,
        updatedAt: txDate,
      });
      calculatedBalance -= amt;
    }

    if (dayOfMonth === 20) {
      // Insurance & Bills
      const insTemplate = EXPENSE_TEMPLATES.find((t) => t.category === "insurance");
      const amt = getRandomAmount(insTemplate.range[0], insTemplate.range[1]);
      const txDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate(), 15, 30, 0);
      transactions.push({
        id: crypto.randomUUID(),
        type: "EXPENSE",
        amount: amt,
        description: getRandomItem(insTemplate.descriptions),
        date: txDate,
        category: insTemplate.category,
        status: "COMPLETED",
        userId,
        accountId,
        createdAt: txDate,
        updatedAt: txDate,
      });
      calculatedBalance -= amt;
    }

    // 3. Regular Day-to-Day Expenses
    // Groceries (typically on weekends or mid-week)
    if ((dayOfWeek === 6 || dayOfWeek === 3) && Math.random() < 0.75) {
      const grocTemplate = EXPENSE_TEMPLATES.find((t) => t.category === "groceries");
      const amt = getRandomAmount(grocTemplate.range[0], grocTemplate.range[1]);
      const txDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate(), 17, 45, 0);
      transactions.push({
        id: crypto.randomUUID(),
        type: "EXPENSE",
        amount: amt,
        description: getRandomItem(grocTemplate.descriptions),
        date: txDate,
        category: grocTemplate.category,
        status: "COMPLETED",
        userId,
        accountId,
        createdAt: txDate,
        updatedAt: txDate,
      });
      calculatedBalance -= amt;
    }

    // Food / Dining / Coffee
    if (Math.random() < 0.45) {
      const foodTemplate = EXPENSE_TEMPLATES.find((t) => t.category === "food");
      const amt = getRandomAmount(foodTemplate.range[0], foodTemplate.range[1]);
      const txDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate(), 12, 30, 0);
      transactions.push({
        id: crypto.randomUUID(),
        type: "EXPENSE",
        amount: amt,
        description: getRandomItem(foodTemplate.descriptions),
        date: txDate,
        category: foodTemplate.category,
        status: "COMPLETED",
        userId,
        accountId,
        createdAt: txDate,
        updatedAt: txDate,
      });
      calculatedBalance -= amt;
    }

    // Transportation on Weekdays
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && Math.random() < 0.35) {
      const transTemplate = EXPENSE_TEMPLATES.find((t) => t.category === "transportation");
      const amt = getRandomAmount(transTemplate.range[0], transTemplate.range[1]);
      const txDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate(), 8, 15, 0);
      transactions.push({
        id: crypto.randomUUID(),
        type: "EXPENSE",
        amount: amt,
        description: getRandomItem(transTemplate.descriptions),
        date: txDate,
        category: transTemplate.category,
        status: "COMPLETED",
        userId,
        accountId,
        createdAt: txDate,
        updatedAt: txDate,
      });
      calculatedBalance -= amt;
    }

    // Weekend Leisure: Entertainment or Shopping
    if ((dayOfWeek === 0 || dayOfWeek === 6) && Math.random() < 0.4) {
      const leisureCategory = Math.random() < 0.5 ? "entertainment" : "shopping";
      const template = EXPENSE_TEMPLATES.find((t) => t.category === leisureCategory);
      const amt = getRandomAmount(template.range[0], template.range[1]);
      const txDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate(), 19, 0, 0);
      transactions.push({
        id: crypto.randomUUID(),
        type: "EXPENSE",
        amount: amt,
        description: getRandomItem(template.descriptions),
        date: txDate,
        category: template.category,
        status: "COMPLETED",
        userId,
        accountId,
        createdAt: txDate,
        updatedAt: txDate,
      });
      calculatedBalance -= amt;
    }

    // Occasional Travel / Vacation (roughly every 2-3 months)
    if (dayOfMonth === 18 && (month === 2 || month === 5 || month === 7 || month === 11) && Math.random() < 0.65) {
      const travelTemplate = EXPENSE_TEMPLATES.find((t) => t.category === "travel");
      const amt = getRandomAmount(travelTemplate.range[0], travelTemplate.range[1]);
      const txDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate(), 13, 0, 0);
      transactions.push({
        id: crypto.randomUUID(),
        type: "EXPENSE",
        amount: amt,
        description: getRandomItem(travelTemplate.descriptions),
        date: txDate,
        category: travelTemplate.category,
        status: "COMPLETED",
        userId,
        accountId,
        createdAt: txDate,
        updatedAt: txDate,
      });
      calculatedBalance -= amt;
    }

    // Advance 1 day
    curr.setDate(curr.getDate() + 1);
  }

  return {
    transactions,
    finalBalance: Math.max(1200, Number(calculatedBalance.toFixed(2))),
  };
}

/**
 * Seed transactions for all existing user accounts covering 2025 whole year + 2026 up to Aug 1, 2026.
 * Newly created accounts later will NOT inherit any dummy transactions.
 */
export async function seedTransactions() {
  try {
    // 1. Authenticate or retrieve user
    let user = null;
    try {
      const { userId } = await auth();
      if (userId) {
        user = await db.user.findUnique({
          where: { clerkUserId: userId },
        });
      }
    } catch {
      // Auth context may not be present in background/API invocation
    }

    if (!user) {
      user = await db.user.findFirst();
    }

    if (!user) {
      throw new Error("No user found in database. Please log in to create your user profile first.");
    }

    // 2. Fetch all EXISTING accounts already created in the website for this user
    const existingAccounts = await db.account.findMany({
      where: { userId: user.id },
    });

    if (!existingAccounts || existingAccounts.length === 0) {
      throw new Error(
        "No accounts found for user. Please create your account in the website first before seeding transactions."
      );
    }

    let totalCreatedCount = 0;
    const seededAccountNames = [];

    // 3. Process each already existing account in an atomic transaction
    for (const account of existingAccounts) {
      const { transactions, finalBalance } = generateAccountTransactions(user.id, account.id);

      await db.$transaction(async (tx) => {
        // Remove existing transactions for this specific account
        await tx.transaction.deleteMany({
          where: { accountId: account.id },
        });

        // Batch insert new transactions covering 2025 to Aug 1, 2026
        await tx.transaction.createMany({
          data: transactions,
        });

        // Update account balance
        await tx.account.update({
          where: { id: account.id },
          data: { balance: finalBalance },
        });
      });

      totalCreatedCount += transactions.length;
      seededAccountNames.push(`${account.name} ($${finalBalance.toFixed(2)})`);
    }

    // 4. Invalidate cache paths so dashboard and accounts immediately display updated ledger
    revalidatePath("/dashboard");
    existingAccounts.forEach((acc) => revalidatePath(`/account/${acc.id}`));

    return {
      success: true,
      message: `Successfully seeded ${totalCreatedCount} transactions across existing account(s): ${seededAccountNames.join(", ")} spanning Jan 1, 2025 to Aug 1, 2026. Any new account created in the future will remain clean with only its own transactions.`,
      accountsCount: existingAccounts.length,
      transactionsCount: totalCreatedCount,
    };
  } catch (error) {
    console.error("Error seeding transactions:", error);
    return { success: false, error: error.message };
  }
}