import prisma from "../config/db.js";

export const createExpense = async (req, res) => {
  try {
    const {
      amount,
      currency,
      category,
      description,
      date,
      employeeId,
      companyId,
    } = req.body;

    const expense = await prisma.expense.create({
      data: {
        amount,
        currency,
        category,
        description,
        date: new Date(date),
        employee_id: employeeId,
        company_id: companyId,
      },
    });

    res.json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
