class Form_Validator {
    constructor() {
        this.to_validate = [];
        this.errors = [];
    }

    /*  This function set all the parameters need to be validate.
     */
    set_rules (form, name, rules) {
        this.errors = [];
        this.to_validate.push({form, name, rules});
    }

    /*  This function is for forms that is required or not empty.
     */
    required (form, name) {
        if(form === null || form == "") {
            this.errors.push(`${name} is required`);
        }
    }

    /*  This function is minimum length of the specific form parameters
     */
    min_length(form, name, min_length) {
        min_length = min_length.replace(/[^0-9]/g, "");
        if(form.length < min_length) {
            this.errors.push(`${name} minimum length should be ${min_length}`);
        } else if(form.length > min_length) {
            this.errors.push(`${name} minimum length should be ${min_length}`);
        }
    }

    /*  This function is for reading letters only.
     */
    alpha(form, name) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~/\d/]/;
        if(specialChars.test(form)){
            this.errors.push(`${name} is invalid`);  
        };
    }

    /*  This function is for reading numbers only.
     */
    number(form, name) {
        const regExp = /[a-zA-Z]/g;
        if(regExp.test(form)){
            this.errors.push(`${name} is invalid`);  
        };
    }

    /* This function is for password and confirm password is they are matched.
     */
    password_matches(password, confirm_password) {
        if(password != confirm_password) {
            this.errors.push(`passowrd isn't match`);  
        }
    }

    /* This function is to run all parameters that pass from model 
     */
    run () {
        for(let i=0; i<this.to_validate.length; i++) {
            let form = this.to_validate[i].form;
            let name = this.to_validate[i].name;
            let rules = this.to_validate[i].rules;
            for(let j=0; j<rules.length; j++) {
                if(rules[j] === "required") {
                    this.required(form, name);
                }
                else if(rules[j].includes('min_length')) {
                    this.min_length(form, name, rules[j]);
                }
                else if(rules[j].includes('max_length')) {
                    this.min_length(form, name, rules[j]);
                }
                else if(rules[j] === "alpha") {
                    this.alpha(form, name);
                }
                else if(rules[j] === "number") {
                    this.number(form, name);
                }
            }
        }
        this.to_validate = [];

        return this.errors.length;
    }

    /* This function is returning the value of this.errors
     */
    validation_errors() {
        return this.errors;
    }
}

module.exports = new Form_Validator();