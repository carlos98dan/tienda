import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/plugins/axios'

export const useProductStore = defineStore('product', () => {
    // state
    const products = ref([])
    const loading = ref(false)
    const error = ref(null)
    const selectedProduct = ref({})

    // getters
    const productCount = computed(() => products.value.length)

    // actions
    const searchProduct = async () => {
        loading.value = true
        error.value = null

        try {
            const response = await api.get('/products')
            products.value = response.data
        } catch (e) {
            error.value = e.message || 'Error Search Products'
        } finally {
            loading.value = false
        }
    }

    const createProduct = async (product) => {
        loading.value = true
        error.value = null
        try {
            const response = await api.post('/products', product)
            products.value.push(response.data)
        } catch (e) {
            error.value = e.message || 'Error creating product'
        } finally {
            loading.value = false
        }
    }

    const updateProduct = async (product) => {
        loading.value = true
        error.value = null
        try {
            const response = await api.put(`/products/${product.id}`, product)
            const index = products.value.findIndex(p => p.id === product.id)

            if (index !== -1) {
                products.value[index] = response.data
            }
        } catch (e) {
            error.value = e.message || 'Error updating product'
        } finally {
            loading.value = false
        }
    }

    const deleteProduct = async (productId) => {
        loading.value = true
        error.value = null
        try {
            await api.delete(`/products/${productId}`)
            products.value = products.value.filter(p => p.id !== productId)
        } catch (e) {
            error.value = e.message || 'Error deleting product'
        } finally {
            loading.value = false
        }
    }

    const selectProduct = (product) => {
        selectedProduct.value = product
    }

    return {
        products,
        loading,
        error,
        productCount,
        selectedProduct,
        searchProduct,
        createProduct,
        deleteProduct,
        updateProduct,
        selectProduct,
    }
}, {
    persist: true,
})