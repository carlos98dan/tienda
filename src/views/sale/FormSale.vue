<script setup>
import { computed, onMounted } from 'vue';
import { useSaleStore } from '@/stores/sale';
import { Notyf } from 'notyf'
import { useCurrency } from '@/composables/useCUrrency';

const { formatCurrency } = useCurrency();

const notyf = new Notyf()
const saleStore = useSaleStore();

const client = computed(() => saleStore.sale.client)
const products = computed(() => saleStore.sale.products)
const productsList = computed(() => saleStore.products)
const total = computed(() => saleStore.sale.total.toFixed(2))

onMounted(() => {
    saleStore.searchProducts()
})

const handleSearch = () => {
    saleStore.searchClient(saleStore.sale.client.doc);
}

const handleAdd = () => {
    saleStore.addProduct();
}

const handleRemove = (index) => {
    saleStore.removeProduct(index)
}

const handleProductChange = (item) => {
    const isRepeat = saleStore.sale.products.some(
        (prod) => prod !== item && prod.id === item.id
    )

    if (isRepeat) {
        notyf.error('El producto ya se agrego previamente')

        item.id = null
        item.name = ''
        item.quantity = 1
        item.price = 0

        return
    }

    const selected = productsList.value.find(p => p.id === item.id)
    if (selected) {
        item.name = selected.name
        item.price = selected.price
    }
}
</script>

<template>
    <div class="mb-3">
        <h3>Nuevo Pedido</h3>
    </div>

    <div class="mb-3">
        <h4>Cliente</h4>
    </div>

    <div class="mb-3 p-3 border rounded shadow-sm bg-light">
        <div class="d-flex gap-3 align-items-end">
            <div class="mb-3">
                <label for="doc" class="form-label">N° Documento</label>
                <input id="doc" v-model="client.doc" name="doc" type="text" class="form-control"
                    placeholder="Ej. 1234567890" required />
            </div>

            <div class="mb-3">
                <button class="btn btn-primary" @click="handleSearch">
                    <i class="bi bi-search"></i> Buscar
                </button>
            </div>
        </div>

        <div class="d-flex gap-3">
            <div class="mb-3 flex-fill">
                <label for="fname" class="form-label">Nombre</label>
                <input id="fname" v-model="client.fname" name="fname" type="text" class="form-control"
                    placeholder="Ej. Juan" required />
            </div>

            <div class="mb-3 flex-fill">
                <label for="lname" class="form-label">Apellido</label>
                <input id="lname" v-model="client.lname" name="lname" type="text" class="form-control"
                    placeholder="Ej. Pérez" required />
            </div>
        </div>
    </div>

    <div class="d-flex gap-3 mb-3">
        <h4>Productos</h4>
        <div>
            <button class="btn btn-primary btn-sm" @click="handleAdd">
                <i class="bi bi-plus"></i>
            </button>
        </div>
    </div>

    <div class="mb-3 p-3 border rounded shadow-sm bg-light">
        <div v-if="products.length > 0">
            <div v-for="(item, index) in products" :key="index" class="d-flex gap-3 align-items-end mb-3">

                <div class="flex-fill">
                    <label class="form-label">Producto</label>
                    <select v-model="item.id" class="form-select" @change="handleProductChange(item)">
                        <option value="" disabled>Seleccione</option>
                        <option v-for="p in productsList" :key="p.id" :value="p.id">
                            {{ p.name }}
                        </option>
                    </select>
                </div>

                <div>
                    <label class="form-label">Cantidad</label>
                    <input v-model.number="item.quantity" type="number" min="1" class="form-control" />
                </div>

                <div>
                    <label class="form-label">Precio</label>
                    <input v-model.number="item.price" type="number" min="0" class="form-control" disabled readonly />
                </div>

                <div>
                    <button class="btn btn-outline-danger" @click="handleRemove(index)">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
        <div v-else class="text-muted">No hay productos agregados.</div>
    </div>

    <div class="d-flex justify-content-between fw-bold fs-5">
        <div>
            Total: {{ formatCurrency(parseFloat(total)) }}
        </div>

        <button class="btn btn-success" @click="handleSubmit">
            <i class="bi bi-check-circle"></i> Crear Pedido
        </button>
    </div>
</template>