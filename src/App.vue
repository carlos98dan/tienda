<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <div class="sidebar bg-light border-end p-3">
      <div class="d-flex align-items-center mb-4">
        <i class="bi bi-person-circle fs-4 me-2"></i>
        <span class="fw-bold">Admin</span>
      </div>
      <ul class="nav flex-column">
        <li class="nav-item mb-2">
          <RouterLink class="nav-link text-dark fw-bold link-hover" to="/">
            <i class="bi bi-house-door me-2"></i> Home
          </RouterLink>
        </li>
        <li class="nav-item mb-2">
          <RouterLink class="nav-link text-dark fw-bold link-hover" to="/product">
            <i class="bi bi-box-seam me-2"></i> Product
          </RouterLink>
        </li>
        <li class="nav-item mb-2">
          <RouterLink class="nav-link text-dark fw-bold link-hover" to="/client">
            <i class="bi bi-person me-2"></i> Client
          </RouterLink>
        </li>
      </ul>
    </div>

    <!-- Main content -->
    <div class="flex-grow-1 p-4">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 250px;
  min-height: 100vh;
}

.link-hover:hover {
  background-color: #d6d6d6;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;
}
</style>
