<template>
    <my-quick-selector
            modelName="account_type"
            modelNameZh="科目类型"
            :columns="columns" ref="selector" :filters="filters" @select="onItemSelect"></my-quick-selector>
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
        computed: {
            filters() {
                return {
                    type: this.type
                }
            }
        },
        props: {
            type: {
                type: Number,
                default: 1
            }
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
