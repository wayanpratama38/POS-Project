<script setup lang="ts">
import { addToCart } from '../database/product.ts';

const props = defineProps<{
  product: {
    id: number
    name: string
    price: number
    image: string
    qty: number
  }
}>();


</script>
<template>
  <div class="border rounded-lg flex flex-col p-2">
    <img
      :src="props.product.image"
      alt="product-photo"
      class="rounded-lg mb-2 w-full h-fit object-cover"
    />
    <h3 class="dark:text-white font-bold ">{{ props.product.name }}</h3>
    <p class="dark:text-white text-grey-600 mb-2 ">Rp {{ props.product.price }}</p>
    <button class="dark:text-white justify-items-center bg-blue-800 p-2 rounded-lg font-bold cursor-pointer hover:bg-blue-600" @click="addToCart(props.product)">Tambahkan</button>
  </div>
</template>
