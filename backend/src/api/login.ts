import jwt from 'jsonwebtoken'
import { query_handler } from '../config/orma'

export const login_user = async (email, password) => {
    if (!email) {
        return Promise.reject('Must enter an email')
    }
    if (!password) {
        return Promise.reject('Must enter a password')
    }

    const $where: any = {
        $eq: ['email', { $escape: email }]
    }
    const query = {
        users: {
            id: true,
            email: true,
            password: true,
            first_name: true,
            user_info: {
                photo_url: true,
                max_match_dist: true,
                lastcheckmsg: true
            },
            $where
        }
    }

    const { users } = (await query_handler(query)) as any
    if (users.length !== 1) {
        return Promise.reject('Incorrect email')
    }
    if (users[0].password !== password) {
        return Promise.reject('Incorrect password')
    }

    const token = await new Promise((resolve, reject) => {
        jwt.sign(
            { email: email },
            process.env.jwt_secret,
            /*{expiresIn: 60},*/ (err, token) => {
                if (err) {
                    reject(err)
                } else {
                    console.log(`${email} Logged in`)
                    resolve(token)
                }
            }
        )
    })

    return { token, user: users[0] }
}
