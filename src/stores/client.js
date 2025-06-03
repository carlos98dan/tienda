import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/plugins/axios'

export const useClientStore = defineStore('client', () => {
    // state
    const clients = ref([])
    const loading = ref(false)
    const error = ref(null)
    const selectedClient = ref({})

    // getters
    const clientCount = computed(() => clients.value.length)

    // actions
    const searchClient = async () => {
        loading.value = true
        error.value = null

        try {
            const response = await api.get('/clients')
            clients.value = response.data
        } catch (e) {
            error.value = e.message || 'Error Search clients'
        } finally {
            loading.value = false
        }
    }

    const createClient = async (client) => {
        loading.value = true
        error.value = null
        try {
            const response = await api.post('/clients', client)
            clients.value.push(response.data)
        } catch (e) {
            error.value = e.message || 'Error creating client'
        } finally {
            loading.value = false
        }
    }

    const updateClient = async (client) => {
        loading.value = true
        error.value = null
        try {
            const response = await api.put(`/clients/${client.id}`, client)
            const index = clients.value.findIndex(p => p.id === client.id)

            if (index !== -1) {
                clients.value[index] = response.data
            }
        } catch (e) {
            error.value = e.message || 'Error updating client'
        } finally {
            loading.value = false
        }
    }

    const deleteClient = async (clientId) => {
        loading.value = true
        error.value = null
        try {
            await api.delete(`/clients/${clientId}`)
            clients.value = clients.value.filter(p => p.id !== clientId)
        } catch (e) {
            error.value = e.message || 'Error deleting client'
        } finally {
            loading.value = false
        }
    }

    const selectClient = (client) => {
        selectedClient.value = client
    }

    return {
        clients,
        loading,
        error,
        clientCount,
        selectedClient,
        searchClient,
        createClient,
        deleteClient,
        updateClient,
        selectClient,
    }
}, {
    persist: true,
})