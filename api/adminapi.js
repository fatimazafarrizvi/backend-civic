const Admin = require('../Models/admin');

const insert_admin = async (req, res) => {
    try {
        const { fullname, phoneNumber, email, password, confirmPassword} = req.body;

        if (password !== confirmPassword) {
    return res.status(400).json({ message: "Password and Confirm Password do not match" });
}


        const existingAdmin = await Admin.findOne({
            $or: [{ email }, { password }]
        });

        if (existingAdmin) {
            return res.status(400).json({
                message: "Admin already exists with the same email."
            });
        }

        const admin = new Admin({
            fullname,
            phoneNumber,
            email,
            password,
            confirmPassword
            
        });

        const savedAdmin = await admin.save();
        console.log('Admin inserted successfully');
        res.status(201).json(savedAdmin);
    } catch (error) {
        console.log('Insert Admin Error:', error);
        res.status(400).json(error);
    }
};

//
const adminfind = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email }).exec();

        if (admin) {
            if (admin.password === password) {
                console.log('Auth Success');
                res.json({ auth: 'success' });
            } else {
                console.log('Auth Failed - Incorrect Password');
                res.json({ auth: 'failed', message: 'Incorrect password' });
            }
        } else {
            console.log('Auth Failed - User Not Found');
            res.json({ auth: 'failed', message: 'User not found' });
        }
    } catch (error) {
        console.log('Fetch error :-', error);
        res.status(500).json({ message: 'An error occurred during authentication', error });
    }
};

module.exports = {
    adminfind,
    insert_admin
};
