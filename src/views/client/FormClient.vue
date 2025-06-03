<script setup>
import { computed } from 'vue'
import { useClientStore } from '@/stores/client'
import { useRouter } from 'vue-router'

const clientStore = useClientStore()
const router = useRouter()

const client = computed(() => clientStore.selectedClient)

const handleCancel = () => {
    clientStore.selectClient({})
    router.push('/client')
}

const handleSave = async () => {
    if (!clientStore.selectedClient.id) {
        await clientStore.createClient(clientStore.selectedClient)
    } else {
        await clientStore.updateClient(clientStore.selectedClient)
    }

    clientStore.selectClient({})
    router.push('/client')
}
</script>

<template>
    <div class="mb-3">
        <h3 v-if="client.id">Actualizar Cliente</h3>
        <h3 v-else>Crear Cliente</h3>
    </div>

    <form @submit.prevent="handleSave" class="p-3 border rounded shadow-sm bg-light">
        <div class="mb-3">
            <label for="doc" class="form-label">N° Documento</label>
            <input id="doc" v-model="client.doc" name="doc" type="text" class="form-control"
                placeholder="Ej. 1234567890" required />
        </div>

        <div class="mb-3">
            <label for="fname" class="form-label">Nombre</label>
            <input id="fname" v-model="client.fname" name="fname" type="text" class="form-control"
                placeholder="Ej. Juan" required />
        </div>

        <div class="mb-3">
            <label for="lname" class="form-label">Apellido</label>
            <input id="lname" v-model="client.lname" name="lname" type="text" class="form-control"
                placeholder="Ej. Pérez" required />
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
