<template>
    <my-quick-selector
            modelName="purchase_bill"
            modelNameZh="采购开单"
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
                        title: "供应商",
                        key: 'supplier_code',
                        width: 120
                    },
                    {
                        title: "总金额",
                        key: 'total_money',
                        width: 120
                    },
                    {
                        title: "已结算金额",
                        key: 'pay_money',
                        width: 120
                    },
                    {
                        title: "待结算金额",
                        key: 'receive_money',
                        width: 120,
                        render: (h, params) => {
                            console.log(this.$refs.selector.objectArr)
                            let item = this.$refs.selector.objectArr[params.index]
                            return h('div', item.total_money - item.pay_money)
                        }
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
