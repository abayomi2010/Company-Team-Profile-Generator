const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const teamMembers = [];
const idList = [];

const appMenu = () => {
    function buildTeam() {

    }

    function addIntern () {

    }


    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer name ?",
            },

            {
                type: "input",
                name: "engineerId",
                message: "What is your engineer id?",
            }, 

            {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer email?",
            }, 

            {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer github?",
            }
        ]).then (answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            idList.push(answers.engineerId);
            console.log(engineer);
            createTeam();
        })
    }


    function createTeam () {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "What type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I don't want to add any more team members"
                ]
            }
        ]).then(userChoice => {
            if (userChoice.memberChoice === "Engineer") {
                // Add Engineer to teamMembers array
                addEngineer();
            } else if (userChoice.memberChoice === "Intern") {
                // Add Intern to teamMembers array
                addIntern();
            } else {
                // build team function
                buildTeam();
            }
        })
    }




    function createManager() {
        console.log("Please build your team")
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is the team manager's name?",
                validate: answer => {
                    if (answer!== "") {
                        return true;
                    }
                    return "Please enter a name";
                }
            },

            {
                type: "input",
                name: "managerId",
                message: "What is the team manager's id?",
                validate: answer => {
                    if (answer!== "") {
                        return true;
                    }
                    return "Please enter an id";
                }
            },

            {
                type: "input",
                name: "managerEmail",
                message: "What is the team manager's email?",
                validate: answer => {
                    if (answer!== "") {
                        return true;
                    }
                    return "Please enter an email ";
                }
            },

            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the team manager's office number?",
                validate : answer => {
                    if (answer!== "") {
                        return true;
                    }
                    return "Please enter a number";
                }
            }

        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            console.log(manager);
            teamMembers.push(manager);
            idList.push(answers.managerId);
            createTeam();  
        });
    }
    createManager();
}

appMenu(); 