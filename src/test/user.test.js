const chai      = require('chai');
const expect    = chai.expect;
const UserModel = require('../models/User');

describe('Login feature', () => {
    describe('validation_login_form', () => {
        it("Given email and password as input, it should return success when email and password are not empty", () => {
            let params = {
                body: {
                    "email": "kean@test.com", 
                    "password": "12345678"
                }
            }
            let result = UserModel.validation_login_form(params);

            expect(result).to.be.equal("success");
        });
        it("Given email as input, it should return an error message saying: Password is required, when password is missing", () => {
            let params = {
                body: {
                    "email": "kean@test.com", 
                    "password": ""
                }
            }
            let result = UserModel.validation_login_form(params);

            expect(result[0]).to.be.equal("Password is required");
        });
        it("Given password as input, it should return an error message saying: Email is required, when email is missing", () => {
            let params = {
                body: {
                    "email": "", 
                    "password": "12345678"
                }
            }
            let result = UserModel.validation_login_form(params);

            expect(result[0]).to.be.equal("Email is required");
        });
        it("Given password as input, it should return an error message saying: Password must be atleast 8 characters", () => {
            let params = {
                body: {
                    "email": "kean@test.com", 
                    "password": "12345"
                }
            }
            let result = UserModel.validation_login_form(params);

            expect(result[0]).to.be.equal("Password minimum length should be 8");
        });
        it("Given empty input, it should return an error message saying: Email and Password is required, when all fields are missing", () => {
            let params = {
                body: {
                    "email": "", 
                    "password": ""
                }
            }
            let result = UserModel.validation_login_form(params);

            expect(result).to.have.lengthOf(3);
        });
    });
});
