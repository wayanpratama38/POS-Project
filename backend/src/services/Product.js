import prisma from '../config/DBConnection.js';


export default class ProductService {
    // POST Add New Product (singular)
    async addSingleProduct({name,image,price,status,type}) {
        const productData = await prisma.product.create({
            data : {
                name : name,
                image : image,
                price : price,
                status : status,
                type : type
            }
        })

        return {...productData}
    }

    // POST Add New Product (bulk)
    async addBulkProduct(productList) {
        const productsData = await prisma.product.createManyAndReturn({
            data : productList 
        });

        return productsData
    }

    // GET Get All Product
    async getAllProduct() {
        const productsData = await prisma.product.findMany();
        return productsData 
    }

    // GET Get Certain Product
    async getProductById({id}) {
        const productData = await prisma.product.findFirst({
            where : {
                id : id
            }
        })

        if(!productData){
            console.log("Produk tidak ditemukan")
        }

        return {...productData}
    }

    // PATCH Update Product Information

    // PATCH Update Product Availability

    // DELETE Delete Certain Product
}