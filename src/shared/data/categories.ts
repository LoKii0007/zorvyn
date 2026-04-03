export const CATEGORIES = {
  expense: [
    {
      name: "Food & Dining",
      subcategories: ["Groceries", "Restaurants", "Coffee", "Snacks", "Fast Food"],
    },
    {
      name: "Shopping",
      subcategories: ["Clothing", "Electronics", "Home Decor", "Gifts", "Personal Care"],
    },
    {
      name: "Transportation",
      subcategories: ["Fuel", "Public Transport", "Ride Sharing", "Maintenance", "Parking"],
    },
    {
      name: "Entertainment",
      subcategories: ["Movies", "Gaming", "Subscriptions", "Music", "Sporting Events"],
    },
    {
      name: "Health & Wellness",
      subcategories: ["Pharmacy", "Doctor", "Gym", "Personal Care", "Insurance"],
    },
    {
      name: "Bills & Utilities",
      subcategories: ["Rent", "Electricity", "Water", "Internet", "Phone", "Trash"],
    },
    {
      name: "Education",
      subcategories: ["Books", "Courses", "Tuition", "Supplies"],
    },
    {
      name: "Travel",
      subcategories: ["Flights", "Hotel", "Sightseeing", "Visas"],
    },
    {
      name: "Other",
      subcategories: ["Donations", "Fees", "Miscellaneous"],
    },
  ],
  income: [
    {
      name: "Salary",
      subcategories: ["Full-time", "Part-time", "Bonus"],
    },
    {
      name: "Freelance",
      subcategories: ["Project A", "Project B", "Consulting"],
    },
    {
      name: "Investments",
      subcategories: ["Dividends", "Interest", "Capital Gains"],
    },
    {
      name: "Gifts",
      subcategories: ["Birthday", "Holiday", "Other"],
    },
    {
      name: "Other Income",
      subcategories: ["Cashback", "Refunds", "Sale of items"],
    },
  ],
};

export type CategoryType = keyof typeof CATEGORIES;
