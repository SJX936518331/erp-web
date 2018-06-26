<template>
    <my-quick-selector
            modelName="sale_bill"
            modelNameZh="销售开单"
            :filters="filters"
            :columns="columns" ref="selector" @select="onItemSelect"></my-quick-selector>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "单号",
                        key: 'code',
                        width: 120
                    },
                    {
                        title: "日期",
                        key: 'make_time',
                        width: 180
                    },
                    {
                        title: "客户",
                        key: 'customer_name',
                        width: 180
                    },
                    {
                        title: "总金额",
                        key: 'total_money',
                        width: 120
                    },
                    {
                        title: "已结算金额",
                        key: 'receive_money',
                        width: 120
                    },
                    {
                        title: "待结算金额",
                        key: 'receive_money',
                        width: 120,
                        render: (h, params) => {
                            console.log(this.$refs.selector.objectArr)
                            let item = this.$refs.selector.objectArr[params.index]
                            return h('div', item.total_money - item.receive_money)
                        }
                    },
                ],
            }
        },
        props: {
        },
        computed: {
            filters() {
                return {
                    branch_id: this.$util.getBranch().id,
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
