import dbPool from "../utils/db.js";

export const getData = () => {
    const sql = "SELECT item_id, name, description, price, category_id, stock_quantity FROM items"
    const result = dbPool.query(sql);

    return result;
}

export const getDataById = (id) => {
    const sql = "SELECT name, description, price, category_id, stock_quantity FROM items WHERE item_id = ?"
    const result = dbPool.query(sql, [id]);

    return result;
}

export const createData = (name, description, price, categoryID, stockQuantity) => {
    const sql = "INSERT INTO items (name, description, price, category_id, stock_quantity) VALUE(?, ?, ?, ?, ?)"
    const value = [name, description, price, categoryID, stockQuantity]
    const result = dbPool.query(sql, value);

    return result;
}

export const updateData = (name, description, price, categoryID, id) => {
    const sql = "UPDATE items SET name = ?, description=?, price = ?, category = ? WHERE item_id = ?";
    const value = [name, description, price, categoryID, id];
    
    return dbPool.query(sql, value);
}

export const deleteData= (id) => {
    const sql = "DELETE FROM items WHERE item_id = ?";
    const value = [id];

    return dbPool.query(sql, value);
}