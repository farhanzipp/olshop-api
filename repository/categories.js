import dbPool from "../utils/db.js";

export const getData = () => {
    const sql = "SELECT category_id, category_name FROM categories"
    const result = dbPool.query(sql);

    return result;
}

export const createData = (categoryName) => {
    const sql = "INSERT INTO categories (category_name) VALUE(?)"
    const value = [categoryName]
    const result = dbPool.query(sql, value);

    return result;
}

export const deleteData= (id) => {
    const sql = "DELETE FROM categories WHERE category_id = ?";
    const value = [id];

    return dbPool.query(sql, value);
}