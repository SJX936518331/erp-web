<template>
    <my-quick-selector
            modelName="sale_order"
            modelNameZh="销售订单"
            :columns="columns" ref="selector" @select="onItemSelect"></my-quick-selector>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "名称",
                        key: 'name'
                    },
                    {
                        title: "备注",
                        key: 'note'
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
