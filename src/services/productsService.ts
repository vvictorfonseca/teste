import { products } from "@prisma/client";

import productsRepository from "../repositories/productsRepository";

export type CreateProductData = Omit<products, "id">

async function createProduct(newProduct: CreateProductData) {
  await productsRepository.createProduct(newProduct)
}

async function getProducts() {
  const allProducts = await productsRepository.getProducts()

  const products = allProducts.filter((product) => product.units > 0)  

  allProducts.forEach((product) => {
    product.units == 0 ? productsRepository.deleteProductById(product.id) : null
  })
  
  return products
}

async function getProductById(productId: number) {
  const product = await productsRepository.getProductById(productId)

  return product
}

async function decrementProductUnits(id: number, units: number) {
  await productsRepository.decrementProductUnits(id, units)
}

const productsService = {
  createProduct,
  getProducts,
  decrementProductUnits,
  getProductById
}

export default productsService