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
`Disini semua endpoint, request body, request parameter, dan response dituliskan sehingga semuanya bisa di tracking dari bagian resource saja.`

| No  | Method | Scenario                   | Endpoint        |
| :-: | :----: | -------------------------- | --------------- |
|  1  |  GET   | Get All Product List       | /products       |
|  2  |  GET   | Get Product By Id          | /products/:id   |
|  3  |  POST  | Add One Product            | /products       |
|  4  |  POST  | Add Bulk Product           | /products/bulk  |
|  5  | PATCH  | Update Product Information | /products/:id   |
|  6  | DELETE | Delete Product             | /products/:id   |
|  7  |  POST  | Create New Order           | /orders         |
|  8  |  GET   | Get Order Detail           | /orders/:id     |
|  9  |  GET   | Get All Order              | /orders         |
| 10  |  POST  | Register New User          | /users/register |
| 11  |  POST  | Login                      | /users/login    |
| 12  |  POST  | Logout                     | /users/logout   |
| 13  |  POST  | Refresh Token              | /refresh        |


---










