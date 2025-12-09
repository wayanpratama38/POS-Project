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

| Method | Scenario                    | Endpoint       | Request                         | Response                | Status |
| ------ | --------------------------- | -------------- | ------------------------------- | ----------------------- | ------ |
| POST   | Create New Order            | /orders        | [[Request Body#Request Body 1]] | [[Response#Response 3]] |        |
| GET    | Get Order Detail            | /orders/:id    |                                 | [[Response#Response 4]] |        |
| GET    | Get All Product List        | /products      |                                 | [[Response#Response 1]] | ✅      |
| POST   | Add One Product             | /products      | [[Request Body#Request Body 2]] | [[Response#Response 5]] | ✅      |
| POST   | Add Bulk Product            | /products/bulk | [[Request Body#Request Body 3]] | [[Response#Response 6]] | ✅      |
| PATCH  | Update Product Availability | /products/:id  |                                 | [[Response#Response 2]] |        |



---










