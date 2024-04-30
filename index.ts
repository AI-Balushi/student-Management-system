import inquirer from "inquirer";

// Define the Student class
class Student {
  private static counter = 10000;
  id: number;
  name: string;
  courses: string[];
  balance: number;

  constructor(name: string) {
    this.id = Student.counter++;
    this.name = name;
    this.courses = [];
    this.balance = 100;
  }

  enrollCourse(course: string) {
    this.courses.push(course);
  }

  viewBalance() {
    console.log(`Balance for ${this.name}: ${this.balance}`);
  }

  payFees(amount: number) {
    if (amount > this.balance) {
      console.log(`Insufficient balance. Fees not paid for ${this.name}`);
      return;
    }
    this.balance -= amount;
    console.log(`$${amount} fees paid successfully for ${this.name}`);
  }

  showStatus() {
    console.log(`ID: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log(`Courses: ${this.courses}`);
    console.log(`Balance: ${this.balance}`);
  }
}

// Main program logic
async function main() {
  const students: { [key: string]: Student } = {};

  while (true) {
    const { choice } = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "Choose an action:",
        choices: ["Add student", "Enroll in course", "View balance", "Pay fees", "Show status", "Exit"],
      },
    ]);

    if (choice === "Exit") {
      break;
    }

    switch (choice) {
      case "Add student": {
        const { name } = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "Enter student name:",
          },
        ]);
        students[name] = new Student(name);
        console.log(`Student ${name} added with ID ${students[name].id}`);
        break;
      }
      case "Enroll in course": {
        const { name, course } = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "Enter student name:",
          },
          {
            type: "input",
            name: "course",
            message: "Enter course name:",
          },
        ]);
        students[name].enrollCourse(course);
        console.log(`${name} enrolled in ${course}`);
        break;
      }
      case "View balance": {
        const { name } = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "Enter student name:",
          },
        ]);
        students[name].viewBalance();
        break;
      }
      case "Pay fees": {
        const { name, amount } = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "Enter student name:",
          },
          {
            type: "number",
            name: "amount",
            message: "Enter amount to pay:",
          },
        ]);
        students[name].payFees(amount);
        break;
      }
      case "Show status": {
        const { name } = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "Enter student name:",
          },
        ]);
        students[name].showStatus();
        break;
      }
    }
  }
}

// Run the main program
main();
