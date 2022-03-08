import jwt from 'jsonwebtoken'

class Helper {
    token = (data) => {
        const dataForToken = {
            id: data._id,
            phoneNo: data.phoneNo,
            email: data.email
        };
        return jwt.sign({ dataForToken }, process.env.JWT_SECRET, { expiresIn: '249H' });
    };
}

export default new Helper;

