<script setup>
import { computed } from 'vue'
import { useProductStore } from '@/stores/product'
import { useRouter } from 'vue-router'

const productStore = useProductStore()
const router = useRouter()

const product = computed(() => productStore.selectedProduct)

const handleCancel = () => {
    productStore.selectProduct({})
    router.push('/product')
}

const handleSave = async () => {
    if (!productStore.selectedProduct.id) {
        await productStore.createProduct(productStore.selectedProduct)
    } else {
        await productStore.updateProduct(productStore.selectedProduct)
    }

    productStore.selectProduct({})
    router.push('/product')
}
</script>

<template>
    <div class="mb-3">
        <h3 v-if="product.id">Actualizar Producto</h3>
        <h3 v-else>Crear Producto</h3>
    </div>

    <form @submit.prevent="handleSave" class="p-3 border rounded shadow-sm bg-light">
        <div class="mb-3">
            <label for="name" class="form-label">Nombre del producto</label>
            <input id="name" v-model="product.name" name="name" type="text" class="form-control"
                placeholder="Ej. Cuaderno" required />
        </div>

        <div class="mb-3">
            <label for="price" class="form-label">Precio</label>
            <input id="price" v-model="product.price" name="price" type="number" class="form-control"
                placeholder="Ej. 2500" min="0" required />
        </div>

        <div class="d-flex justify-content-end">
            <button class="btn btn-secondary btn-sm me-2" type="button" @click="handleCancel">
                <i class="bi bi-x"></i> Cancelar
            </button>
            <button class="btn btn-success btn-sm" type="submit">
                <i class="bi bi-check"></i> Guardar
            </button>
        </div>
    </form>
</template>