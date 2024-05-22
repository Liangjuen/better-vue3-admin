<template>
	<error-page :code="404" desc="找不到您要查找的资源" />
</template>

<script setup lang="ts">
import ErrorPage from './components/error-page.vue'
</script>
