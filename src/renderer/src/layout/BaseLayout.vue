<template>
    <NLayout has-sider class="base-layout">
        <NLayoutSider
            collapse-mode="width"
            :collapsed-width="siderCollapsedWidth"
            :width="siderWidth"
            :collapsed="siderCollapsed"
        >
            <BaseLayoutSider></BaseLayoutSider>
        </NLayoutSider>
        <NLayout>
            <RouterView></RouterView>
        </NLayout>
    </NLayout>
</template>
<script lang="ts" setup>
import {  NLayout, NLayoutSider, } from 'naive-ui'
import BaseLayoutSider from './components/base/BaseLayoutSider.vue';
import { RouterView } from 'vue-router';
import { onMounted, ref } from 'vue';

const siderCollapsedWidth = ref(78);
const siderWidth = ref(200);
const siderCollapsed = ref(true);
onMounted(() => {
    siderCollapsedWidth.value = parseInt(
        getComputedStyle(document.documentElement)
            .getPropertyValue('--traffic-light-width')
            .trim()
            .replace('px', '')
    )
})
</script>

<style lang="scss" scoped>
.base-layout {
    height: 100%;
}
</style>
