<script lang="ts" setup>
// import { ref } from 'vue';
import ProductCard from './ProductCard.vue';
import { products } from '../database/product.ts';
console.log("VAlue of product : ",products.value);


</script>

<template>
  <div class="grid grid-cols-4 gap-4 p-4">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>
