import userController from '../controller/controller.js';

export default app => {
    // API FOR REGISTRATION
    app.post('/signup', userController.register);
};

