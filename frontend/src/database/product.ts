import { ref } from 'vue';

interface Product {
  id : number,
  name : string,
  price : number,
  image : string,
  qty : number
}

// Product
export const products  = ref<Product[]>([
  {id : 1, name : 'Coffee',price : 21000, image : 'https://placehold.co/600x400', qty : 10},
  {id : 2, name : 'Tea',price : 21000, image : 'https://placehold.co/600x400', qty : 12},
  {id : 3, name : 'Matcha',price : 21000, image : 'https://placehold.co/600x400', qty : 15},
  {id : 4, name : 'Nasi Goreng',price : 21000, image : 'https://placehold.co/600x400', qty : 11},
  {id : 5, name : 'Nasi Padang',price : 21000, image : 'https://placehold.co/600x400', qty : 18},
  {id : 6, name : 'Nasi Sambal',price : 21000, image : 'https://placehold.co/600x400', qty : 21},
  {id : 7, name : 'Extra Joss Susu',price : 21000, image : 'https://placehold.co/600x400', qty : 25},
  {id : 8, name : 'Kuku Bima Energi',price : 21000, image : 'https://placehold.co/600x400', qty : 19},
  {id : 9, name : 'Milku',price : 21000, image : 'https://placehold.co/600x400', qty : 33},
]);

// Initialize cart item
const cart = ref<Product[]>([
  {id : 1, name : 'Coffee',price : 21000, image : 'https://placehold.co/600x400', qty : 10}
]);

// Add Cart Data
export function addToCart(product : Product) {
  const {id ,name,price,image,qty} = {...product};
  console.log("IN ADD CART",id,name,price,image,qty)
  cart.value.push(product)
  console.log('Ref itself:', cart)
  console.log('Real value:', cart.value)
}

// Delete Cart Data
export function deleteDataCart(id : number){
  cart.value.filter((product) => product.id != id)
}

// Get Cart Data
export function getCartData(){

  return cart.value;
}

// Count Price
export function countPrice(cart : Product[]) {
  return cart.reduce((sum,item) => sum + item.price * item.qty,0);
}
