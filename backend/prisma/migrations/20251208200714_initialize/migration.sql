-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'employee');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('available', 'unavailable');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('snack', 'drink', 'food');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('dine_in', 'take_out');

-- CreateEnum
CREATE TYPE "OrderPaymentMethod" AS ENUM ('qris', 'cash', 'card');

-- CreateEnum
CREATE TYPE "OrderTransactionStatus" AS ENUM ('success', 'fail');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'employee',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" "ProductStatus" NOT NULL DEFAULT 'unavailable',
    "type" "ProductType" NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "table_number" INTEGER NOT NULL,
    "total_price" DECIMAL(65,30) NOT NULL,
    "transaction_status" "OrderTransactionStatus" NOT NULL,
    "payment_method" "OrderPaymentMethod" NOT NULL DEFAULT 'cash',
    "type" "OrderType" NOT NULL DEFAULT 'dine_in',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderDetail" (
    "product_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "current_price" DECIMAL(65,30) NOT NULL,
    "sub_total_price" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "note" TEXT,

    CONSTRAINT "OrderDetail_pkey" PRIMARY KEY ("product_id","order_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
