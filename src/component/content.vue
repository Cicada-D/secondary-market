<template>
    <div class="w-full p-3.5 min-w-96">
        <div name='order'>
            <slot name="order"></slot>
        </div>

        <div name='cart'>
            <slot name="cart"></slot>
        </div>
        <div >
            <slot name="push"></slot>
        </div>
    </div>
</template>
<script setup>

</script>