<template>
    <my-quick-selector
            modelName="unit"
            modelNameZh="单位"
            :columns="columns" ref="selector" @select="onItemSelect"></my-quick-selector>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "单位名称",
                        key: "name"
                    },
                ],
            }
        },
        props: {
        },
        methods: {
            onItemSelect(item) {
                this.$emit('select', item)
            }
        }
    }
</script>

<style scoped>
</style>
