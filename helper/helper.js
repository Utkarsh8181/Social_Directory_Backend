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

    tokenValidation = async (req, res, next) => {
        const header = req.headers.authorization;
        const myArr = header.split(' ');
        const token = myArr[1];
        try {
            if (token) {
                const data = await jwt.verify(token, process.env.JWT_SECRET);
                if (!data) {
                    return res.status(400).send({ success: false, message: 'Invalid Token' });
                }
                req.user = data;
                next();
            } else {
                return res.status(401).send({ success: false, message: 'Authorisation failed! Invalid user' });
            }
        } catch (error) {
            return res.status(500).send({ success: false, message: 'Something went wrong!' });
        }
    };
}

export default new Helper;

