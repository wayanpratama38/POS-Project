import ProductService from "../services/Product.js";


export default class ProductController {
  constructor () {
    // binding function
    this.addSingleProduct = this.addSingleProduct.bind(this);
    this.addBulkProduct = this.addBulkProduct.bind(this);
    this.getAllProduct = this.getAllProduct.bind(this);
    this.getProductById = this.getProductById.bind(this);

    this.service = new ProductService();
  }


  // POST Add New Product (singluar)
  async addSingleProduct(req,res,next) {
    // Get request body 
    const body = req.body;

    //TODO Validate body

    // Service
    const data = await this.service.addSingleProduct({...body});

    // Response
    return res.status(201).json({
        status : "success",
        message : "Berhasil menambahkan produk baru",
        data : {...data}
    })
  }

  // POST Add New Product (bulk)
  async addBulkProduct(req,res,next) {
    // Get request body
    const body = req.body;
    
    // TODO Validate body

    // Service
    const allData = await this.service.addBulkProduct(body)        
    
    // Response
    return res.status(201).json({
        status : "success",
        message : "Berhasil menambahkan banyak produk",
        data : allData
    })
  }

  // GET Get All Product
  async getAllProduct(req,res,next) {
    // Service
    const allData = await this.service.getAllProduct();
    
    // Response
    return res.status(200).json({
        status : "success",
        message : "Berhasil mendapatkan semua data produk",
        data : allData
    })
  }

  // GET Get Certain Product
  async getProductById(req,res,next) {
    // Get request param
    const { id } = req.params;

    // Service
    const data = await this.service.getProductById({id})

    // Response
    return res.status(200).json({
        status : "success",
        message : "Berhasil mendapatkan data produk",
        data : data
    })
  }
}