<script setup lang="ts">
import ProductGrid from '../components/ProductGrid.vue'
import CartSidebar from '../components/CartSidebar.vue'
</script>

<template>
  <div class="flex">
    <div class="w-3/4">
      <ProductGrid />
    </div>
    <CartSidebar class="w-1/4 sticky top-0 h-screen overflow-y-auto"/>
  </div>
</template>
