<template>
    <my-quick-selector
            modelName="branch"
            modelNameZh="分支机构"
            :columns="columns" ref="selector" @select="onItemSelect" :type="type"></my-quick-selector>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "分支机构编号",
                        key: "code"
                    },
                    {
                        title: "分支机构",
                        key: 'name'
                    }
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
