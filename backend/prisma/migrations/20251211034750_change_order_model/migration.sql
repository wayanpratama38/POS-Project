-- DropIndex
DROP INDEX "orders_type_key";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "customer_name" DROP NOT NULL;
