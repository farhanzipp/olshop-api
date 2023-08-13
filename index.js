/*
    1. Tambahkan endpoint users untuk menghapus dan meakukan update
        - endpoint delete harus menggunakan method delete
        - endpoint update harus menggunakan method put
    2. Buat database tasks dengan kolom sebagai berikut : 
        task_id, user_id, task_name, is_completed,created_at, updated_at
    3. Buat endpoint CRUD lengkap untuk table task.
*/

/*
    1. Ketika login /auth selain memberikan informasi access token dan refresh token. 
    berikan data user kecuali password.
*/
import express from 'express';
import * as UserService from './services/user.js'
import * as ItemService from './services/item.js'
import * as CategoryService from './services/category.js'
import { errorResponse } from './utils/response.js';

const app = express();
const port = 8080;
const host = "localhost"

app.use(express.json())

app.get("/users", UserService.getAllUser);
app.get("/users/:id", UserService.getUserById);
app.post("/users", UserService.createUser);
app.post("/login", UserService.authUser);
app.put("/users/:id", UserService.updateUser);
app.delete("/users/:id", UserService.deleteUser);

app.get("/items", ItemService.getAllItem);
app.get("/items/:id", ItemService.getItemById);
app.post("/items", ItemService.createItem);
app.put("/items/:id", ItemService.updateItem);
app.delete("/items/:id", ItemService.deleteItem);

app.get("/categories", CategoryService.getAllCategory);
app.post("/categories", CategoryService.createCategory);
app.delete("/categories/:id", CategoryService.deleteCategory);


app.use((err, request, response, next) => {
    const message = "Internal server error";
    console.log(err.message);
    errorResponse(response, message, 500);
})

app.listen(port, host, () =>{
    console.log(`server REST API berjalan di http://${host}:${port}`);
})