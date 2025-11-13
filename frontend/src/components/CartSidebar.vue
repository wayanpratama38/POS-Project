<script setup lang='ts'>
import { computed } from 'vue';
import { getCartData, countPrice } from '../database/product.ts';

const cartItems = getCartData();
console.log(cartItems);


const totalPrice = computed(()=>
  countPrice(cartItems)
)
</script>

<template>
  <aside class="dark:bg-black border-lg p-4 flex flex-col justify-between">
    <div>
      <h2 class="text-xl font-bold mb-4">Keranjang</h2>
      <ul>
        <li
          v-for="item in cartItems"
          :key="item.id"
          class="flex justify-between border-b py-2"
        >
          <span>{{ item.name }} x {{ item.qty }}</span>
          <span>Rp {{ item.price * item.qty }}</span>
        </li>
      </ul>
    </div>

    <div class="border-t pt-4 mt-4">
      <div class="flex justify-between font-semibold mb-3">
        <span>Total:</span>
        <span>Rp {{ totalPrice }}</span>
      </div>
      <button
        class="bg-blue-800 cursor-pointer text-white w-full py-2 rounded-lg font-semibold hover:bg-blue-600"
      >
        Checkout
      </button>
    </div>
  </aside>
</template>
