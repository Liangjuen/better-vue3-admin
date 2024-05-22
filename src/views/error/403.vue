<template>
	<error-page :code="403" desc="您没有操作权限" />
</template>

<script setup lang="ts">
import ErrorPage from './components/error-page.vue'
</script>
