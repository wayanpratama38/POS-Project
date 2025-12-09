/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "table_number" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orders_type_key" ON "orders"("type");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");
