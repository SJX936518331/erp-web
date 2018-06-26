<template>
    <my-quick-selector
            modelName="work_process"
            modelNameZh="计件工序"
            :columns="columns" ref="selector" @select="onItemSelect"></my-quick-selector>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "编号",
                        key: 'code'
                    },
                    {
                        title: "名称",
                        key: 'name'
                    },
                    {
                        title: "工种",
                        key: 'work_type_name'
                    },
                    {
                        title: "工价",
                        key: 'price'
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
