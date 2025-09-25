<template>
    <div class="playground" ref="playgroundRef"></div>
</template>

<script setup lang="ts">
import { useEditor } from './hooks';


const { playgroundRef } = useEditor();

</script>


<style lang="scss" scoped>
.playground{
    height: 500px;
}
</style>
