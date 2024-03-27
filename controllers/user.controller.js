import User from "../models/user.model"
import AppError from "../utils/error.util"

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: true
}

const register = async (req, res, next) => {
    const { fullName, email, password } = req.body

    if(!fullName || !email || !password) {
        return next(new AppError ('All fields are required', 400))
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        return next (new AppError('Email already exists', 400))
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url: '',
        }
    })

    if (!User) {
        return next (new AppError('User registration failed, please try again', 400))
    }

    // TODO: File upload

    await user.save()

    user.password = undefined

    const token = await user.generateJWTToken()

    res.cookie('token', token, cookieOptions)

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user
    })
}

const login = (req, res) => {

}

const logout = (req, res) => {

}

const getProfile = (req, res) => {

}

export {
    register,
    login,
    logout,
    getProfile
}