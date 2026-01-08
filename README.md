Ini merupakan sebuah repository yang saya gunakan sebagai sarana mempelajari berbagai hal tentang _backend_ maupun _frontend_.


# Frontend
Hanya tampilan sederhana saja.

---
# Backend
Backendnya saya menggunakan Express.Js dengan struktur folder seperti ini
<br></br>
<img width="324" height="429" alt="image" src="https://github.com/user-attachments/assets/fc1075b1-5c07-4cbd-bd16-05ac947b60e5" />
<br></br>

Sementara untuk API Contract beserta API Documentationnya seperti di bawah ini

---
### 1. Envelope
Semua response nantinya akan memiliki standarisasi seperti ini.
#### Status Code `200` atau `201`
```
{
	status : 'success',
	message : 'operation success',
	data : {...} // Data disini
}
```
#### Status Code `4xx` atau `5xx`
```
{
	status : 'fail',
	message : 'Deskripsi error yang bisa dimanfaatkan frontend'
}
```
---

### 2. Resource
Disini semua endpoint, request body, request parameter, dan response dituliskan sehingga semuanya bisa di tracking dari bagian resource saja.

| No  | Method | Scenario                                    | Endpoint                         |
| :-: | :----: | ------------------------------------------- | -------------------------------- |
|  1  |  GET   | Get All Product List                        | /api/products                    |
|  2  |  GET   | Get Product By Id                           | /api/products/:id                |
|  3  |  POST  | Add One Product                             | /api/products                    |
|  4  |  POST  | Add Bulk Product                            | /api/products/bulk               |
|  5  | PATCH  | Update Product Information                  | /api/products/:id                |
|  6  | DELETE | Delete Product                              | /api/products/:id                |
|  7  |  POST  | Create New Order                            | /api/orders                      |
|  8  |  GET   | Get Order Detail                            | /api/orders/:id                  |
|  9  |  GET   | Get All Order                               | /api/orders                      |
| 10  |  POST  | Register New User                           | /api/users/register              |
| 11  |  POST  | Login                                       | /api/users/login                 |
| 12  |  POST  | Logout                                      | /api/users/logout                |
| 13  |  POST  | Refresh Token                               | /api/refresh                     |
| 14  |  GET   | Get All Ingredients                         | /api/ingredients                 |
| 15  |  GET   | Get Ingredient By Id                        | /api/ingredients/:id             |
| 16  |  POST  | Add One Ingredient                          | /api/ingredients                 |
| 17  |  POST  | Add Batch Ingredient                        | /api/ingredients/bulk            |
| 18  | PATCH  | Update Ingredient Information               | /api/ingredients/:id             |
| 19  | DELETE | Delete Ingridient                           | /api/ingredients/:id             |
| 20  |  POST  | Purchase Ingredient                         | /api/ingredients/:id/purchase    |
| 21  |  POST  | Adjust Ingredient (spoiled, expired, break) | /api/ingredients/:id/adjust      |
| 22  |  GET   | Get Transaction History                     | /api/ingredients/:id/transaction |
| 23  |  GET   | Get Low Stock Ingredient                    | /api/ingredients/low-stock       |


### 3. ERD Design 
Disini adalah bagaimana saya mendesain ERD untuk service yang akan dikembangkan, awalnya hanya sederhana saja, tetapi ditengah jalan saya menambahkan beberapa hal, jadi mungkin ini akan jadi catatan juga bagi saya dalam proses pengembangan arsitektur database.
| Version  | Design |
| :-: | :----: | 
|  1  | <img width="948" height="636" alt="image" src="https://github.com/user-attachments/assets/f3a7c9c1-e9cd-434d-8bee-5325b9d031d0" />   | 
|  2  |  <img width="959" height="682" alt="image" src="https://github.com/user-attachments/assets/e78936da-08a7-4b3b-8de2-b2c801f436fe" />  | 





---	










