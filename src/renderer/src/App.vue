<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';
import { RouterView } from 'vue-router';
</script>

<template>
    <NConfigProvider>
        <RouterView />
    </NConfigProvider>
</template>
