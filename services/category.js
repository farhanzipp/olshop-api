import * as CategoryRepository from '../repository/categories.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getAllCategory = async (request, response, next) => {
    try {
        const [result] = await CategoryRepository.getData();
        successResponse(response, "Ok",result)
    } catch (error) {
        next(error)
    }
}

export const createCategory = async (request, response, next) => {
    try {
        let category = request.body.category_name;
        const [result] = await CategoryRepository.createData(category);
        successResponse(response, "berhasil menambahkan data", result.insertId);
    } catch(error) {
        next(error);
    }
}

export const deleteCategory = async(request, response, next) => {
    try {
        let id = request.params.id;
        const [result] = await CategoryRepository.deleteData(id);
        successResponse(response, "Data Berhasil dihapus", result[0]);
    } catch(error) {
        next(error)
    }
}
