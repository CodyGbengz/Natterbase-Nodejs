import express from 'express';
import jwt from 'jsonwebtoken';
import auth from '../middlewares/auth'

const router = express.Router();
let countries = [];

// login user route
router.post('/login', (req, res) => {
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
            )
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

// fetch countries endpoint
router.get('/countries', auth, (req, res) => {
    return res.status(200).json({
        status: 'Success',
        countries
    }) 
});

// Add country endpoint
router.put('/countries/:country', auth, (req, res) => {
    const { country } = req.params;
    countries = [country, ...countries];
    return res.status(201).json({
        status: 'Success',
        countries
    })
})

// Delete country endpoint
router.delete('/countries/:country', auth, (req, res) =>{
    const { country } = req.params;

    const index = countries.indexOf(country);
    if (index > -1) {
        countries.splice(index, 1);
    }
    return res.status(200).json({
        status: 'Success',
        countries
    })
})
export default router;

