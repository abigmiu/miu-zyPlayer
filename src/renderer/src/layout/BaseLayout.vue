<template>
    <NLayout has-sider class="base-layout">
        <BaseLayoutSider></BaseLayoutSider>
        <NLayout>
            <BaseLayoutHeader></BaseLayoutHeader>
            <NLayoutContent>
                <RouterView></RouterView>
            </NLayoutContent>
        </NLayout>
    </NLayout>
</template>
<script lang="ts" setup>
import { NLayout, NLayoutContent } from 'naive-ui'
import BaseLayoutSider from './components/base/BaseLayoutSider.vue';
import BaseLayoutHeader from './components/base/BaseLayoutHeader.vue';
import { RouterView } from 'vue-router';

</script>

<style lang="scss" scoped>
.base-layout {
    height: 100%;
}
</style>
