<template>
    <my-quick-selector
            modelName="balance_io_type"
            modelNameZh="收支类型"
            :columns="columns" ref="selector" @select="onItemSelect" :filters="filters"></my-quick-selector>
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
                        render: (h, params)=>{
                            return h('div', {}, params.row.type === '1' ? '收入类型' : '支出类型')
                        }
                    },
                ],
            }
        },
        props: {
            type: {
                type: String,
                default: ''
            }
        },
        computed: {
            filters() {
                return {
                    type: this.type,
                    account_set_id: this.$util.getAccountSet().id,
                }
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
