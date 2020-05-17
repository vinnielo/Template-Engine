// TODO: Write code to define and export the Employee class
class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

// need to return name 
  getName() {
    return this.name;
  }

// need to return ID number
  getId() {
    return this.id;
  }

// need to return email
  getEmail() {
    return this.email;
  }

// need to return role
  getRole() {
    return "Employee";
  }
}

// need to export to other scripts
module.exports = Employee;
