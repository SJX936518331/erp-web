<template>
    <my-quick-selector
            modelName="store"
            modelNameZh="仓库"
            :columns="columns" ref="selector" @select="onItemSelect" :type="type"></my-quick-selector>
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
                    {
                        title: '分支机构',
                        key: 'branch_name',
                    },
                ],
            }
        },
        props: {
            type: {
                type: String,
                default: 'table'
            },
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
