// definign all the ui values

const form = document.querySelector('.form-inline');
const studentList = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const studentInput = document.getElementById('student');



// // Load all event listenerss
LoadEventListners();

// load all event listners

function LoadEventListners(){
  // Dom Load Events
  document.addEventListener('DOMContentLoaded', getStudents);
  // Addstudent event
  form.addEventListener('submit', addStudent);
  // remove task event 
  studentList.addEventListener('click', removeTask);
  // clear list 
  clearBtn.addEventListener('click', ClearList);
  // filter tasks

  filter.addEventListener('keyup', filterStudent);
}


// Get Students from local storage
function getStudents(){
  let students;
 if (localStorage.getItem('students') === null) {
    students = [];
 }else{
   students = JSON.parse(localStorage.getItem('students'));
 }
 students.forEach(function(students){
   // create Li element
  const li = document.createElement('li');
  // add class
  li.className = 'list-group-item ml-5';
 
  // create text node and append
  li.appendChild(document.createTextNode(students));
  // create new link element 
  const link =  document.createElement('a');
  // add class 
  link.className = 'delete-item text-dark ml-5';
  link.innerHTML = '<i class="fa fa-remove" ></i>';

  // append link to li
  li.appendChild(link);

  // append li to ol
  studentList.appendChild(li)

 })
}

// add student
function addStudent(e){
  if (studentInput.value === '') {
    alert('Please add Name');
  }

  // create Li element
  const li = document.createElement('li');
  // add class
  li.className = 'list-group-item ml-5';
 
  // create text node and append
  li.appendChild(document.createTextNode(studentInput.value));
  // create new link element 
  const link =  document.createElement('a');
  // add class 
  link.className = 'delete-item text-dark ml-5';
  link.innerHTML = '<i class="fa fa-remove" ></i>';

  // append link to li
  li.appendChild(link);

  // append li to ol
  studentList.appendChild(li)
  
  // add to localStorage
  addStudentToLocalStorage(studentInput.value);


  // clear input
  studentInput.value = '';
  


  e.preventDefault();
}


// store Students
function addStudentToLocalStorage(student){
 let students;
 if (localStorage.getItem('students') === null) {
    students = [];
 }else{
   students = JSON.parse(localStorage.getItem('students'));
 }
 students.push(student);

 localStorage.setItem('students', JSON.stringify(students));
 
}


// remove task

function removeTask(e){
  if (e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();

    // remove from Local Storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
   
  }
}

// remove ls

// remove from LS
function removeTaskFromLocalStorage(studentItem){
  let students;
  if (localStorage.getItem('students') === null) {
    students = [];   
  } else {
    students = JSON.parse(localStorage.getItem('students'));
  }

  students.forEach(function(student, index){
    if (studentItem.textContent === student) {
      students.splice(index, 1);
    }
  });

  localStorage.setItem('students', JSON.stringify(students));

  
}

// clear Students{}
clearStudentsFromLocalStorage();

// clear Students{}

function clearStudentsFromLocalStorage(){
  localStorage.clear();
}

// clear list
// method 1
function ClearList(){
  // studentList.innerHTML = '';
// method 2 - faster
while (studentList.firstChild) {
  studentList.removeChild(studentList.firstChild)
}

}

// filter Student
function filterStudent(e){
  const text  = e.target.value.toLowerCase();
  document.querySelectorAll('.list-group-item').forEach(
  function(student){
    const item = student.firstChild.textContent;
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      student.style.display = 'block';
    } else {
      student.style.display = 'none';
    }
  });
}