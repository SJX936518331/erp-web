<template>
    <my-quick-selector
            modelName="bank"
            modelNameZh="现金银行"
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
                    {
                        title: '类型',
                        key: 'type',
                        render: (h, params) => {
                            return h('div', params.row.type === '1' ? '现金' : '银行')
                        },
                        editable: true
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
