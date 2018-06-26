<template>
    <my-quick-selector
            modelName="pay_type"
            modelNameZh="支付类型"
            :filters="filters"
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
        computed: {
            filters() {
                return {
                    account_set_id: this.$util.getAccountSet().id,
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
