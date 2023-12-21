const JH_Model = require('../system/core/JH_Model');
const bcrypt = require('bcrypt');

class Student extends JH_Model{
    constructor() {
        super();
        this.form_validation = this.load.Validation();
    }
    
    /*  This method is fetching all the data in database table students.
     */
    get_all_students = () => {
        return this.query("SELECT * FROM students").result_array();
    }

    /* This method is fetching the specific row of data in databe by email.
     */
    get_student_by_email = (email) => {
        return this.query("SELECT * FROM students WHERE email = ?", email).row_array();
    }

    /* This method is adding user to the database students.
     */
    add_user = (req) => {
        let query = `INSERT INTO students (first_name, last_name, email, password, hash, created_at) 
                        VALUES (?,?,?,?,?,?)`;
        let values = [
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            req.body.password,
            bcrypt.hashSync(req.body.password, 10),
            new Date()
        ];
        return this.query(query, values).row_array();
    }

    /* This function is validate the register form that submitted by the user and it return string of "success"
        if the process is success.
     */ 
    validate_register_form = (req) => {
        this.form_validation.set_rules(req.body.first_name, 'First name', ['required', 'alpha']);
        this.form_validation.set_rules(req.body.last_name, 'Last name', ['required'], 'alpha');
        this.form_validation.set_rules(req.body.email, 'Email', ['required']);
        this.form_validation.set_rules(req.body.password, 'Password', ['required', 'min_length[4]']);
        this.form_validation.set_rules(req.body.confirm_password, 'Confirm password', ['required', 'min_length[4]']);
        this.form_validation.password_matches(req.body.password, req.body.confirm_password);

        console.log("test");
        if(this.form_validation.run()) {
            return this.form_validation.validation_errors();
        } else {
            return "success";
        }
    }

    /* This function is validate the signin form that submitted by the user and it return string of "success"
        if the process is success.
     */ 
    validate_signin_form = (req) => {
        this.form_validation.set_rules(req.body.email, 'email', ['required']);
        this.form_validation.set_rules(req.body.password, 'password', ['required', 'min_length[4]']);

        if(this.form_validation.run()) {
            return this.form_validation.validation_errors();
        } else {
            return "success";
        }
    }

    /* This method is validate the password by the user if the user is successfully validate the email.
     */
    validate_signin_match = (user, password) => {
        return bcrypt.compareSync(password, user.hash);
    }
}

module.exports = new Student();