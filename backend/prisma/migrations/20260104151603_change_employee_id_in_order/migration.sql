/*
  Warnings:

  - You are about to drop the column `employee_id` on the `order_detail` table. All the data in the column will be lost.
  - Added the required column `employee_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_detail" DROP CONSTRAINT "order_detail_employee_id_fkey";

-- AlterTable
ALTER TABLE "order_detail" DROP COLUMN "employee_id";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "employee_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
