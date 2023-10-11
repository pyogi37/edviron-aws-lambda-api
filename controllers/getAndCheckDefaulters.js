const mongoose = require("mongoose");
const Student = require("../models/student"); // Replace with your actual student model
const FeeHead = require("../models/feeHead"); // Replace with your actual fee head model
const Dues = require("../models/dues"); // Replace with your actual dues model
const Payment = require("../models/payment"); // Replace with your actual payment model
const School = require("../models/school");

async function getAndCheckDefaulters(req, res) {
  console.log(req.params.schoolId);
  const schoolId = req.params.schoolId;

  try {
    const school = await School.findById(schoolId).exec();

    if (!school) {
      return res.status(404).json({ message: "School not found." });
    }

    const currentDate = new Date();
    const defaulters = [];

    // Calculate due date based on feeHeadStartDate and frequencyMonths
    function calculateDueDate(feeHeadStartDate, frequencyMonths) {
      const startDate = new Date(feeHeadStartDate);
      const currentDate = new Date(); // Current date
      const monthsDiff =
        (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
        (currentDate.getMonth() - startDate.getMonth());
      const monthsUntilDue = frequencyMonths - (monthsDiff % frequencyMonths);
      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + monthsUntilDue);
      return dueDate;
    }

    // Step 1: Fetch students corresponding to the given school ID
    const students = await Student.find({
      school_id: schoolId,
    }).exec();

    if (!students || students.length === 0) {
      return res.status(404).json({ message: "Student not found." });
    } else {
      console.log("STUDENTS FOUND");
    }

    // Step 2: Create dues from fee heads for those students
    for (const student of students) {
      const feeHeads = await FeeHead.find({ school_id: schoolId }).exec();
      if (feeHeads) {
        for (const feeHead of feeHeads) {
          const dueDate = calculateDueDate(
            feeHead.start_date,
            feeHead.frequency_months
          );

          const newDue = new Dues({
            fee_head: feeHead._id,
            student: student._id,
            due_date: dueDate,
            timestamp: new Date(),
          });

          await newDue.save();
        }
      }
    }

    console.log("Dues created");

    // Step 3: Check if dues that are due today or earlier are paid using payment collection in the database
    for (const student of students) {
      const unpaidDues = await Dues.find({
        student: student._id,
        due_date: { $lte: currentDate },
      }).exec();
      for (const due of unpaidDues) {
        const payment = await Payment.findOne({
          fee_head: due.fee_head,
          student: student._id,
        }).exec();
        if (!payment) {
          defaulters.push({ student: student.name });
        }
      }
    }

    return res.json({ defaulters }); // Respond with the list of defaulters
  } catch (error) {
    console.error("Error fetching and checking defaulters:", error.message);
    return res.status(500).json({ error: error.message });
  }
}

module.exports = { getAndCheckDefaulters };
