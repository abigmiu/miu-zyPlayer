<script setup lang="ts">
import SvgIcon from '@renderer/components/SvgIcon.vue';

</script>

<template>
    <div class="base-layout-sider">
        <div class="top">
            <img src="@renderer/assets/imgs/icon.png" alt="" class="icon">
        </div>

        <div class="footer">
            <SvgIcon name="setting" class="footer-icon" />
        </div>
    </div>
</template>
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

.icon {
    display: block;
    width: 40px;
    height: 40px;
    margin: 20px auto;
}

.footer {
    padding-bottom: 20px;
    &-icon {
        display: block;
        width: 30px;
        height: 30px;
        margin: 0 auto;
        cursor: pointer;
    }
}
</style>
