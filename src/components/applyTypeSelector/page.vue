<template>
    <my-quick-selector
            modelName="apply_type"
            modelNameZh="申请类型"
            :columns="columns" ref="selector" @select="onItemSelect"></my-quick-selector>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "名称",
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
            },
        }
    }
</script>

<style scoped>
</style>
