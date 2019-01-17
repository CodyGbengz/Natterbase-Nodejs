import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// login user route
router.post(
    '/login', (req, res) => {
        const { username, password } = req.body;

        if (username === 'admin') {
            if (password === 'admin') {

                const token = jwt.sign(
                    {
                      id: 'admin1',
                      username: username,
                    },
                    'secret',
                    { expiresIn: 86400 }
                  );

                return res.status(200).json({
                    status: 'Success',
                    message: 'Login successful',
                    token
                });
            }
            return res.status(401).json({
                status: 'Fail',
                message: 'Wrong Password'
            })
        }
        return res.status(401).json({
            status: 'Fail',
            message: 'Invalid username'
        })

    });

export default router;

