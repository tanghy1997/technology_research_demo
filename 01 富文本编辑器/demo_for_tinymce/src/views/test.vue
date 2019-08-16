<template>
    <div v-html='commentData'></div>
</template>

<script>
export default {
    name: 'test',
    props: ['commentData'],
    data() {
        return {

        }
    }
}
</script>