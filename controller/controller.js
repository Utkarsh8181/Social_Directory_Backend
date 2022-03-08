import httpStatusCode from "httpStatusCode-status";
import bcrypt from "bcryptjs";
import helper from "../helper/helper.js";
import { logger } from "../logger/logger.js";
import User from '../model/userSchema.js'
import validation from '../validation/validation.js'

class UserController {

    register = async (req, res) => {
        const { email, phoneNo, password } = req.body;

        if (!email || !phoneNo || !password) {
            return res.status(httpStatusCode.UNPROCESSABLE_ENTITY).json({ error: "Plz fill all the fields" })
        }
        try {
            const registerValidation = validation.registerValidation.validate(req.body);
            if (registerValidation.error) {
                logger.error('Wrong Input Validations');
                return res.status(httpStatusCode.UNPROCESSABLE_ENTITY).send({
                    success: false,
                    error: 'Wrong Input Validations',
                    data: registerValidation,
                });
            }
            const userExist = await User.findOne({ email: email });
            if (userExist) {
                return res.status(httpStatusCode.UNPROCESSABLE_ENTITY).json({ error: "User already Exist" })
            }
            else {
                const user = new User({ email, phoneNo, password })
                const data = await user.save();
                if (data) {
                    return res.status(httpStatusCode.CREATED).json({ message: "User Registered Successfully" })
                }
                else {
                    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: "Failed to Registered" })
                }
            }
        } catch (error) {
            console.log(error);
            logger.error(error);
        }
    }

    login = async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(httpStatusCode.UNPROCESSABLE_ENTITY).json({ error: "Plz fill the credential" })
        }
        try {
            const loginValidation = validation.loginValidation.validate(req.body);
            if (loginValidation.error) {
                res.status(httpStatusCode.UNPROCESSABLE_ENTITY).send({
                    success: false,
                    error: "Wrong input validation",
                    data: loginValidation
                })
            }
            const data = await User.findOne({ email: email })
            if (!data) {
                return res.status(httpStatusCode.NOT_FOUND).json({ error: "Invalid Credential" });
            }
            else if (data) {
                const dataResult = await bcrypt.compare(password, data.password);
                if (dataResult) {
                    const loginData = helper.token(data);
                    if (!loginData) {
                        res.status(httpStatusCode.BAD_REQUEST).json({ error: "Invalid credential / check your secret key" })
                    }
                    return res.status(httpStatusCode.OK).json({ message: "User Login Successfully", data: loginData })
                }
                else {
                    return res.status(httpStatusCode.NOT_FOUND).json({ error: "Invalid Credential" })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export default new UserController;