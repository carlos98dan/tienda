<script setup>
import { onMounted, computed } from 'vue'
import { useClientStore } from '@/stores/client'
import { useRouter } from 'vue-router'

const clientStore = useClientStore()
const router = useRouter()

const clients = computed(() => clientStore.clients)

onMounted(() => {
  clientStore.searchClient()
})

const handleDelete = (clientId) => {
  clientStore.deleteClient(clientId)
}

const handleEdit = (client) => {
  clientStore.selectClient(client)
  router.push('/form-client')
}

const handleCreate = () => {
  clientStore.selectClient({})
  router.push('/form-client')
}
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Clientes</h3>
      <button class="btn btn-success btn-sm" @click="handleCreate">
        <i class="bi bi-plus"></i> Nuevo
      </button>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-bordered table-sm align-middle">
        <thead class="table-light">
          <tr>
            <th scope="col">N° Documento</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col" class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in clients" :key="index">
            <td>{{ item.doc }}</td>
            <td>{{ item.fname }}</td>
            <td>{{ item.lname }}</td>
            <td class="text-center">
              <button class="btn btn-outline-primary btn-sm me-2" @click="handleEdit(item)">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="handleDelete(item.id)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
          <tr v-if="clients.length === 0">
            <td colspan="4" class="text-center text-muted">No hay clientes registrados.</td>
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

td,
th {
  white-space: nowrap;
  width: 1%;
}
</style>