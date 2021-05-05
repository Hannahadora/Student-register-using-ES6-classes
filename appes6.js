class Student {
    constructor(firstName, lastName, age, phone, department, time){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.phone = phone;
        this.department = department;
        this.time = time;
    }
}

class UI {
    addStudentToList(student) {
        const list = document.getElementById('bigList');
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML =`
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        <td>${student.age}</td>
        <td>${student.phone}</td>
        <td>${student.department}</td>
        <td>${student.time}</td>
        <td><a href="#" class="delete">X</a></td>
        `;

        list.appendChild(row);
    }

    showAlert(message, className) {
        // Create Div
        const div = document.createElement('div');
        // Add Classes
        div.className = `alert ${className}`;
        // Add Text
        div.appendChild(document.createTextNode(message));
        // Get Parent
        const container = document.querySelector('.container');
        // Get Form
        const form = document.querySelector('#bigForm');
        // Insert alert
        container.insertBefore(div, form);

        // Timeout after 3 sec
        setTimeout(function(){
            document.querySelector('.alert').remove();
            }, 3000);
    }

    deleteStudent(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('age').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('department').value = '';
        document.getElementById('time').value = ''
    }
}

// Local Storage Class
class Store {
    static getStudent() {
        let students;
        if (localStorage.getItem('students') === null) {
           students = [];
        } else {
            students = JSON.parse(localStorage.getItem('books'));
        }
        return students;
    }

    static displayStudents() {

    }

    static addStudent(student) {
        const students = store.getStudents()

        students.push(student);

        localStorage.setItem('students', JSON.stringify(students));
    }

    static removeStudent() {

    }
}



// Event Listeners for add book
document.getElementById('bigForm').addEventListener('submit', function(e) {
    //    Get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const age = document.getElementById('age').value;
    const phone = document.getElementById('phone').value;
    const department = document.getElementById('department').value;
    const time = document.getElementById('time').value

    //    Instantiate student
    const student = new Student(firstName, lastName, age, phone, department, time);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if(firstName === '' || lastName === '' || age === '' || phone === '' || department === '' || time === '') {
    //    Error text
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add student to list
        ui.addStudentToList(student);

        // Add to LS
        Store.addStudent(student);

        //    Show success
        ui.showAlert('Registration complete', 'success')

        // Clear Fields
        ui.clearFields();
    }

    e.preventDefault();
    });


    // Event Listener For Delete
    document.getElementById('bigList').addEventListener('click', function(e) {

    // Instantiate UI
    const ui = new UI();

    // Delete student
    ui.deleteStudent(e.target);

    // Show Alert
    ui.showAlert('Profile Deleted', 'success')

    e.preventDefault();
    })