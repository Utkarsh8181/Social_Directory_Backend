import userController from '../controller/controller.js';

export default app => {

    // API FOR REGISTRATION
    app.post('/signup', userController.register);

    // API FOR LOGIN
    app.post('/signin', userController.login);
}

