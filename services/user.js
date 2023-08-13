import * as UserRepository from '../repository/users.js';
import { successResponse, errorResponse } from '../utils/response.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_AT = "kelas.com";
const SECRET_RT = "andika-wiyatno";

export const getAllUser = async (request, response, next) => {
    try {
        const [result] = await UserRepository.getData();
        successResponse(response, "Ok",result)
    } catch (error) {
        next(error)
    }
}

export const getUserById = async(request, response, next) => {
    try {
        let id = request.params.id;
        const [result] = await UserRepository.getDataById(id);
        console.log(result);
        if(result.length > 0) {
            successResponse(response, "Ok", result[0])
        } else {
            errorResponse(response, "data tidak ditemukan", 404);
        }
    } catch(error) {
        next(error)
        console.log(error)
    }
}

export const createUser = async (request, response, next) => {
    try {
        let name = request.body.name;
        let email = request.body.email;
        let password = request.body.password;
        const saltRound = 10;
        let hashedPassword = "";
        bcrypt.hash(password, saltRound, async (err, hash) => {
            const [result] = await UserRepository.createData(name, email, hash);
            successResponse(response, "berhasil menambahkan data", result.insertId);
        });
        
    } catch(error) {
        next(error);
    }
}


export const authUser = async (request, response, next) => {
    try {
        let email = request.body.email;
        let pass = request.body.password;
        const [result] = await UserRepository.getDataByEmail(email);
        const user = result[0];
        console.log(user);

        if (result.length > 0) {
            bcrypt.compare(pass, user.password, (err, result)=> {
                console.log(user.password);
                if (result) {
                    let claims = {
                        id: user.user_id,
                        email: user.email,
                    }
                    const accessToken = jwt.sign(claims, SECRET_AT, {expiresIn:'15m'});
                    const refreshToken = jwt.sign(claims, SECRET_RT, {expiresIn:'30m'});
                    let respData = {
                        email:user.email,
                        access_token: accessToken,
                        refresh_token: refreshToken
                    }
                    successResponse(response, "Ok", respData);
                } else {
                    errorResponse(response, "email atau password salah!",400);
                }
            } );
        } else {
            errorResponse(response, "email atau password salah!",400);
        }

    } catch(error) {
        next(error);
    }
}

export const updateUser = async(request, response, next) => {
    try {
        let id = request.params.id;
        let name = request.body.name;
        let email = request.body.email;
        const [result] = await UserRepository.updateData(name, email, id);
        console.log(result);
        successResponse(response, "berhasil merubah data", result[0])
    } catch(error) {
        next(error)
    }
}

export const deleteUser = async(request, response, next) => {
    try {
        let id = request.params.id;
        const [result] = await UserRepository.deleteData(id);
        successResponse(response, "Data Berhasil dihapus", result[0]);
    } catch(error) {
        next(error)
    }
}