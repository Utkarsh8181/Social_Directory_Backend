import userController from '../controller/controller.js';
import helper from '../helper/helper.js';

export default app => {

    // API FOR REGISTRATION
    app.post('/signup', userController.register);

    // API FOR LOGIN
    app.post('/signin', userController.login);

    // API FOR ADDING PROFILE
    app.post('/profile', helper.tokenValidation, userController.profile);

}

