<template>
    <my-quick-selector
            modelName="asset_type"
            modelNameZh="固定资产类型"
            :columns="columns" ref="selector" @select="onItemSelect"></my-quick-selector>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "编号",
                        key: "code"
                    },
                    {
                        title: "名称",
                        key: 'name'
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
