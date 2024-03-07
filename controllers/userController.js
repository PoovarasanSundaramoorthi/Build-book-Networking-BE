import User from '../models/userModel.js';
import UserBook from '../models/userBookModel.js';
import axios from 'axios';

// export const createBook = createOne(Book);
// export const getAllBook = getAll(Book);
// export const getOneBook = getOne(Book);
// export const updateBook = updateOne(Book);
// export const deleteBook = deleteOne(Book);

export async function GetAllUsers(req, res, next) {
    try {
        const { data } = req.query;
        const query = data ? { username: { $regex: data, $options: 'i' } } : {};
        // Fetch users from the database based on the constructed query
        const users = await User.find(query);

        return res.json({
            message: 'User fetched successfully',
            user: users
        });
    } catch (err) {
        next(err);
        console.log('err', err);
    }
}

export async function CreateUser(req, res, next) {
    try {
        const accessToken = req.query.access_token;

        // Make request to Google userinfo endpoint to fetch user profile
        const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        // Extract user profile data from the response
        const userProfile = response.data;

        // Search for a user in the database using the access token
        const existingUser = await User.findOne({ email: userProfile.email, });
        if (existingUser) {
            // If the user already exists, send their details in the response
            return res.json({
                message: 'User Already found',
                user: existingUser
            });
        } else {
            // If the user doesn't exist, create a new user record in the database
            const createdUser = await User.create({
                username: userProfile.name,
                email: userProfile.email,
                image: userProfile.picture,
                access_token: accessToken
            });

            // Send the created user's details in the response
            return res.json({
                message: 'User created',
                user: createdUser
            });
        }

    } catch (error) {
        // Handle error
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Failed to create user' });
    }
}

export async function searchUsers(req, res, next) {
    try {

    } catch (err) {
        next(err);
        console.log('err', err);
    }
}


export async function getUserBooks(req, res, next) {
    try {

    } catch (err) {
        next(err);
        console.log('err', err);
    }
}