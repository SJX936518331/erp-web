<template>
    <my-quick-selector
            modelName="industry"
            modelNameZh="行业"
            :filters="filters"
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
            type: {
                type: String.toString(),
                default: ''
            }
        },
        computed: {
            filters() {
                return {
                    account_set_id: this.$util.getAccountSet().id,
                    type: this.type
                }
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
