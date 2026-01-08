-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('gram', 'kilogram', 'mililiter', 'liter', 'piece', 'tablespoon', 'cup', 'teaspoon');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('purchase', 'consumption', 'wastage', 'adjusment');

-- CreateTable
CREATE TABLE "ingredients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" "UnitType" NOT NULL,
    "current_stock" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "minimum_stock" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "cost_per_unit" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipes" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "ingredient_id" TEXT NOT NULL,
    "quantity_required" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredient_transactions" (
    "id" TEXT NOT NULL,
    "ingredient_id" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "reference_id" TEXT,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ingredient_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_adjustments" (
    "id" TEXT NOT NULL,
    "ingredient_id" TEXT NOT NULL,
    "adjusted_by" TEXT NOT NULL,
    "quantity_delta" DECIMAL(65,30) NOT NULL,
    "reason" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_adjustments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_name_key" ON "ingredients"("name");

-- CreateIndex
CREATE INDEX "recipes_product_id_idx" ON "recipes"("product_id");

-- CreateIndex
CREATE INDEX "recipes_ingredient_id_idx" ON "recipes"("ingredient_id");

-- CreateIndex
CREATE UNIQUE INDEX "recipes_product_id_ingredient_id_key" ON "recipes"("product_id", "ingredient_id");

-- CreateIndex
CREATE INDEX "ingredient_transactions_ingredient_id_idx" ON "ingredient_transactions"("ingredient_id");

-- CreateIndex
CREATE INDEX "ingredient_transactions_reference_id_idx" ON "ingredient_transactions"("reference_id");

-- CreateIndex
CREATE INDEX "ingredient_transactions_type_idx" ON "ingredient_transactions"("type");

-- CreateIndex
CREATE INDEX "stock_adjustments_ingredient_id_idx" ON "stock_adjustments"("ingredient_id");

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredient_transactions" ADD CONSTRAINT "ingredient_transactions_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_adjustments" ADD CONSTRAINT "stock_adjustments_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_adjustments" ADD CONSTRAINT "stock_adjustments_adjusted_by_fkey" FOREIGN KEY ("adjusted_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
