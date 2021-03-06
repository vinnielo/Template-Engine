const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const outputPath1 = path.join(OUTPUT_DIR, "style.css");

const render = require("./lib/htmlRenderer");
const renderStyle = require("./lib/cssRender")

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const members = [];

const managerQs = [
  {
    type: "input",
    name: "managerName",
    message: "Who is your manager?",
  },
  {
    type: "input",
    name: "managerId",
    message: "What is your manager's id?",
  },
  {
    type: "input",
    name: "managerEmail",
    message: "What is their email?",
  },
  {
    type: "input",
    name: "managerNumber",
    message: "What is their office phone number?",
  }
];

const buildTeam = [
  {
    type: "checkbox",
    name: "choice",
    message: "Who's on your team?",
    choices: [
      "Engineer",
      "Intern",
      "I don't want to add any more team members",
    ]
  }
];

const engineerQs = [
  {
    type: "input",
    name: "engineerName",
    message: "What is the Engineer's name?",
  },
  {
    type: "input",
    name: "engineerId",
    message: "What is their ID number?",
  },
  {
    type: "input",
    name: "engineerEmail",
    message: "What is their email?",
  },
  {
    type: "input",
    name: "engineerGithub",
    message: "What is their GitHub username?",
  }
];

const internQs = [
  {
    type: "input",
    name: "internName",
    message: "What is your Intern's name?",
  },
  {
    type: "input",
    name: "internId",
    message: "What is their id?",
  },
  {
    type: "input",
    name: "internEmail",
    message: "What is their email?",
  },
  {
    type: "input",
    name: "internSchool",
    message: "What school do they attend?",
  }
];

function init() {
  function addManager() {
    inquirer.prompt(managerQs).then((answers) => {
      const manager = new Manager(
        answers.managerName,
        answers.managerId,
        answers.managerEmail,
        answers.managerNumber
      );
      members.push(manager);
      teamAdd();
    });
  }

  function teamAdd() {
    inquirer.prompt(buildTeam).then((choice) => {
      if (choice.choice == "Engineer") {
        engineerAdd();
      } else if (choice.choice == "Intern") {
        internAdd();
      } else {
        createTeam();
        createCss();
      }
    });
  }

  function engineerAdd() {
    inquirer.prompt(engineerQs).then((answers) => {
      const engineer = new Engineer(
        answers.engineerName,
        answers.engineerId,
        answers.engineerEmail,
        answers.engineerGithub
      );
      members.push(engineer);
      teamAdd();
    });
  }

  function internAdd() {
    inquirer.prompt(internQs).then((answers) => {
      const intern = new Intern(
        answers.internName,
        answers.internId,
        answers.internEmail,
        answers.internSchool
      );
      members.push(intern);
      teamAdd()
    });
  }

 function createTeam(){
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }
     fs.writeFileSync(outputPath, render(members));
    }

  function createCss(){
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }
     fs.writeFileSync(outputPath1, renderStyle());
    
  }  
    

  addManager();
}

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
