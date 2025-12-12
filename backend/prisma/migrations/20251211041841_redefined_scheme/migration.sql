-- AlterTable
ALTER TABLE "order_detail" ALTER COLUMN "employee_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
