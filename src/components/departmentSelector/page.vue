<template>
    <my-quick-selector
            modelName="department"
            modelNameZh="部门"
            :columns="columns" ref="selector" @select="onItemSelect"></my-quick-selector>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "编号",
                        key: "code",
                        width: 120
                    },
                    {
                        title: "名称",
                        key: 'name',
                        width: 120
                    },
                    {
                        title: '分支机构',
                        key: 'branch_name',
                        width: 120
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
