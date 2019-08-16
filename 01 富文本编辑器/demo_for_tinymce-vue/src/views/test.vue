<template>
    <div v-html='htmlData'></div>
</template>

<script>
export default {
    name: 'test',
    data() {
        return {

        }
    },
    computed: {
        htmlData() {
            return this.$store.getters.tinymceData
        }
    },
}
</script>