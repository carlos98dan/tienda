<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleNewSale = () => {
  router.push('/form-sale')
}
</script>

<template>
  <h3>
    <button class="btn btn-success btn-sm" @click="handleNewSale">
      <i class="bi bi-plus"></i> Nueva Venta
    </button>
  </h3>
</template>
