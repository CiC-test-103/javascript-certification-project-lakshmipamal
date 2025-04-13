// Necessary Imports (you will need to use this)
const { Student } = require('./Student')

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    // TODO
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
    // TODO
    
    if (this.head == null){
      this.head = new Node(newStudent);
      this.length++;
    }
    else if (this.tail == null){
      let newstud = new Node(newStudent);
      this.tail = newstud;
      this.head.next = newstud;
      this.length++;
    } else {
      let newstud = new Node(newStudent);
      this.tail.next = newstud;
      this.tail = newstud;
      this.length++;
    }
    
  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    // TODO
    let node = this.head;
    let prev = null;

    if (node.next == null) {
      if (email == node.data.getEmail()){
        this.head = null;
        this.length = 0;
      }
    } else {

      while (node.next){
       if (email == node.data.getEmail()){
          if (prev == null){
            this.head = node.next;
            this.length--;
          } else {
            prev.next = node.next;
            this.length--;
         }
       }


       prev = node;
       node = node.next;
     }

     if (node.next == null){
       if (email == node.data.getEmail()){
          prev.next = null;
          this.tail = prev;
          this.length--;
       }
      
      }
    }

  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    // TODO
    let node =  this.head;
  
    while (node){
      if (email == node.data.getEmail()){
        return node.data;
      }
      node = node.next;

    }

    return -1
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  #clearStudents() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    // TODO
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    // TODO
    let node = this.head;
    
    let names= "";
    if (node == null){
      return "empty";
    }
    if (node.next == null){
      return node.data.getName();
    }

    names = names + node.data.getName();
    node = node.next;

    while (node != null){
      names = names + ", " + node.data.getName();
      node = node.next;
    }
  
    return names;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName() {
    // TODO
    let students = [];
    let node = this.head;
    while (node){
      students.push(node.data);
      node = node.next;
    }

    students.sort((student1, student2) => {
      let name1 = student1.getName();
      let name2 = student2.getName();

      if (name1 < name2) {
        return -1;
      } if (name1 > name2){
        return 1;
      } else {
        return 0;
      }
    });

    
    return students;
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    // TODO
    let studentsSpec= [];
    let students = this.#sortStudentsByName();

    for (let student of students){
      if (student.getSpecialization() == specialization) {
        studentsSpec.push(student);
      }
    }
    return studentsSpec;
  }

  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinAge(minAge) {
    // TODO
    let studentsAge = [];
    let students = this.#sortStudentsByName();
    
    for (let student of students){
      if (student.getYear() >= minAge){
        studentsAge.append(student);
      }
    }
    return studentsAge;
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson(fileName) {

    let node = this.head;
    let students = [];
    

    while (node != null){
      let name = node.data.getName();
      let year = node.data.getYear();
      let email = node.data.getEmail();
      let specialization  = node.data.getSpecialization();

      
      students.push({"name": name, "year": year, "email":email, "specialization":specialization});
      node = node.next;
    }


   

    let fs = require("fs");
    fs.writeFile(fileName, JSON.stringify(students), (err) => {
      if (err){

      } else { 

      }
    });

    // TODO
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    // TODO

    if (fileName == "") {
      this.#clearStudents();
    } else {
    let fs = require("fs");

    return new Promise(((accept, reject) => {
      fs.readFile(fileName, (err, data) => {
      
        let students = JSON.parse(data);
        this.#clearStudents();
      
        for (let student of students){
          let stud = new Student(student.name, student.year, student.email, student.specialization);
          this.addStudent(stud);
        }

        accept(); 
      });

    }));

  }

  }

}

module.exports = { LinkedList }
