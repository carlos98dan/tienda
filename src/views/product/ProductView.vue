<script setup>
import { onMounted, computed } from 'vue'
import { useProductStore } from '@/stores/product'
import { useRouter } from 'vue-router'

const productStore = useProductStore()
const router = useRouter()

const products = computed(() => productStore.products)

onMounted(() => {
  productStore.searchProduct()
})

const handleDelete = (productId) => {
  productStore.deleteProduct(productId)
}

const handleEdit = (product) => {
  productStore.selectProduct(product)
  router.push('/form-product')
}

const handleCreate = () => {
  productStore.selectProduct({})
  router.push('/form-product')
}
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Productos</h3>
      <button class="btn btn-success btn-sm" @click="handleCreate">
        <i class="bi bi-plus"></i> Nuevo
      </button>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-bordered table-sm align-middle">
        <thead class="table-light">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col" class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in products" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td class="text-center">
              <button
                class="btn btn-outline-primary btn-sm me-2"
                @click="handleEdit(item)"
              >
                <i class="bi bi-pencil"></i>
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="handleDelete(item.id)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
          <tr v-if="products.length === 0">
            <td colspan="3" class="text-center text-muted">No hay productos registrados.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
table {
  table-layout: auto !important;
  width: auto !important;
}

td, th {
  white-space: nowrap;
  width: 1%;
}
</style>