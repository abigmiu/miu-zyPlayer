
<template>
    <NLayoutSider
        collapse-mode="width"
        :collapsed-width="siderCollapsedWidth"
        :width="siderWidth"
        :collapsed="siderCollapsed"
    >
        <div class="base-layout-sider">
            <div class="top">
                <img src="@renderer/assets/imgs/icon.png" alt="" class="logo" />

                <div>
                    <SvgIcon name="home" class="menu-icon" />
                </div>
            </div>

            <div class="footer">
                <SvgIcon name="setting" class="menu-icon" />
            </div>
        </div>
    </NLayoutSider>
</template>
<script lang="ts" setup>
import { NLayoutSider } from 'naive-ui'
import { onMounted, ref } from 'vue'
import SvgIcon from '@renderer/components/SvgIcon.vue'

const siderCollapsedWidth = ref(78)
const siderWidth = ref(200)
const siderCollapsed = ref(true)
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
.base-layout-sider {
    max-width: 100%;
    width: 100%;
    background-color: #f6f7f8;
    height: 100%;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.logo {
    display: block;
    width: 40px;
    height: 40px;
    margin: 20px auto;
}

.menu-icon {
    color: #62656d;
    display: block;
    width: 30px;
    height: 30px;
    margin: 0 auto;
    cursor: pointer;
}

.footer {
    padding-bottom: 20px;
}
</style>
