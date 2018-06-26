<template>
    <my-quick-selector
            modelName="voucher_type"
            modelNameZh="凭证类型"
            :filters="filters"
            :columns="columns"
            ref="selector"
            defaultValue="FIRST"
            @select="onItemSelect"></my-quick-selector>
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
        computed: {
            filters() {
                return {
                    account_set_id: this.$util.getAccountSet().id,
                }
            },
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
