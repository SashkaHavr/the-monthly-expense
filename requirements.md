# Requirements for The Monthly Expense

## 1.0 Introduction

The Monthly Expense is a mobile and web application designed for effortless personal finance tracking. Its core philosophy is **simplicity and speed**. To facilitate rapid entry, the app opens directly to the "Add Transaction" screen. It helps users quickly log transactions and understand their spending habits through a clean, visual interface, avoiding the complexity of traditional accounting tools by focusing on what matters most: providing a clear, immediate picture of one's financial health.

## 2.0 Functional Requirements

### 2.1 User Authentication

- Users sign up or log in instantly using third-party providers (e.g., Google, Apple).
- Account data is automatically synchronized across all of the user's devices.
- Users can log out or permanently delete their account and all associated data from the Profile page.

### 2.2 Expense and Income Management

- Users can create, edit, and delete transactions.
- Each transaction must have:
  - **Amount:** Numeric value.
  - **Category & Subcategory:** Selected from a predefined list.
  - **Month:** Defaults to the current month, but can be changed.
  - **Description:** Optional text (max 100 characters).
- From the transaction list, users can swipe on an entry to quickly edit or delete it.

### 2.3 Category Management

- The system provides a fixed, curated set of categories and subcategories to ensure a consistent and simple user experience.
- Users cannot create, edit, or delete categories.

#### 2.3.1 Pre-defined Categories and Subcategories

1.  **Housing & Utilities**: Rent/Mortgage, Utilities, Internet & Phone, Maintenance, Furniture.
2.  **Daily Spending**: Groceries, Dining Out, Transportation, Shopping, Entertainment, Personal Care.
3.  **Financial & Savings**: Savings, Investments, Loan Repayments, Bank Fees.
4.  **Insurance & Health**: Health Insurance, Car Insurance, Home Insurance, Medical.
5.  **Income**: Salary/Wages, Freelance, Gifts, Other.

### 2.4 Reporting and Visualization

- The dashboard provides an interactive summary for a selected month and year.
- It includes a pie chart showing spending distribution by main category.
- It displays a list of spending subcategories, sorted from highest to lowest amount.
- Users can export their transaction history for a selected period to a CSV file.

### 2.5 Chat Assistant

- An assistant provides a conversational way to manage finances.
- **Add:** Users can add transactions by typing natural language (e.g., "spent $25 on groceries"). The assistant confirms the details before saving.
- **Query:** Users can ask simple questions about their spending (e.g., "how much did I spend on food this month?").
- **Edit:** Users can ask the assistant to find and modify a recent transaction (e.g., "change my last transaction to $50").

### 2.6 Profile & Settings

- **Account:** Displays the user's email and provides a "Delete Account" option.
- **Data:** Provides an option to "Export All Data" to CSV.

## 3.0 User Interface and Experience Flow

### 3.1 Main Navigation

- **Purpose:** To provide simple, immediate access to the app's core functions.
- **UX Flow:**
  - A navigation bar is fixed at the bottom of the screen, containing four clear icons. The app opens to the "Add" screen by default.
    - **Add (+):** The primary landing screen for adding a new transaction.
    - **Dashboard:** The screen for viewing financial summaries.
    - **Chat:** Opens the Chat Assistant.
    - **Profile:** Opens the Profile page.

### 3.2 Add Transaction Page (Multi-Step Flow)

- **Purpose:** To serve as the app's main landing page, making adding a transaction fast and error-proof by breaking it into simple, focused steps.
- **UX Flow:** A clean, modal-like flow that guides the user.
  - **Step 1: Select Main Category:** A full-screen grid of large, tappable icons for each main category (e.g., Housing, Daily Spending, Income).
  - **Step 2: Select Subcategory:** A simple list of subcategories corresponding to the previous selection.
  - **Step 3: Enter Details:** The final screen focuses on the amount.
    - A large input field for the **Amount** with a numeric keypad.
    - The **Month** is pre-selected but can be changed.
    - An optional one-line field for a **Description**.
    - A "Save" button completes the process and returns the user to the Dashboard.

### 3.3 Dashboard Page

- **Purpose:** To give a clear, interactive overview of finances for a specific month.
- **UX Flow:** The page is a single, scrollable screen.
  1.  **Month Filter:** Simple controls (e.g., arrows and text) at the top allow the user to switch between months and years.
  2.  **Summary:** Three key figures are prominently displayed: Total Income, Total Expenses, and Net Savings.
  3.  **Expense Pie Chart:** A visual breakdown of spending by main category. Tapping a slice filters the lists below.
  4.  **Subcategories List:** A list of subcategories, sorted by amount. Tapping an item also filters the transaction list.
  5.  **Transactions List:** A chronological list of all transactions for the filtered period. Tapping an item allows the user to edit it.

### 3.4 Chat Assistant Page

- **Purpose:** To offer a fast, conversational alternative for core tasks.
- **UX Flow:**
  - The interface is clean and minimal, resembling a modern messaging app.
  - A text input field is at the bottom for user queries.
  - Suggested actions (e.g., "Add Expense," "Monthly total?") appear as tappable chips above the input field to guide the user.
  - The conversation history is displayed above. The assistant's responses are clear and concise, confirming actions or providing requested data in a simple format.

### 3.5 Profile Page

- **Purpose:** To house essential, but less frequently used, settings and account actions.
- **UX Flow:**
  - A simple, single-page list view, not organized into complex sections.
  - **Account:** Displays user's email.
  - **Settings:**
    - Currency: Tapping opens a selection list.
    - Notifications: A single toggle switch for the monthly summary.
  - **Data & Actions:**
    - Export Data
    - Log Out
    - Delete Account (requires confirmation)
