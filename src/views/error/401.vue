<template>
	<error-page :code="401" desc="认证失败，请重新登录！" />
</template>

<script setup lang="ts">
import ErrorPage from './components/error-page.vue'
</script>
