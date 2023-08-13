import * as ItemRepository from '../repository/items.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getAllItem = async (request, response, next) => {
    try {
        const [result] = await ItemRepository.getData();
        successResponse(response, "Ok",result)
    } catch (error) {
        next(error)
    }
}

export const getItemById = async(request, response, next) => {
    try {
        let id = request.params.id;
        const [result] = await ItemRepository.getDataById(id);
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

export const createItem = async (request, response, next) => {
    try {
        let name = request.body.name;
        let description = request.body.description;
        let price = request.body.price;
        let category = request.body.category_id;
        let stockQuantity = request.body.stock_quantity;
        const [result] = await ItemRepository.createData(name, description, price, category, stockQuantity);
        successResponse(response, "berhasil menambahkan data", result.insertId);
    } catch(error) {
        next(error);
    }
}

export const updateItem = async(request, response, next) => {
    try {
        let id = request.params.id;
        let name = request.body.name;
        let description = request.body.description;
        let price = request.body.price;
        let category = request.body.category_id;
        const [result] = await ItemRepository.updateData(name, description, price, category, id);
        console.log(result);
        successResponse(response, "berhasil merubah data", result[0])
    } catch(error) {
        next(error)
    }
}

export const deleteItem = async(request, response, next) => {
    try {
        let id = request.params.id;
        const [result] = await ItemRepository.deleteData(id);
        successResponse(response, "Data Berhasil dihapus", result[0]);
    } catch(error) {
        next(error)
    }
}