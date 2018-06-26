<template>
    <my-quick-table
            modelName="voucher"
            modelNameZh="凭证"
            :filters="filters"
            :columns="columns"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '日期',
                        key: 'date',
                        width: 160
                    },
                    {
                        title: '凭证字号',
                        key: 'type_type_code',
                        width: 160,
                        render: (h, params) => {
                            let item = params.row
                            return h('div', item.type_name + '-' + item.order_code)
                        }
                    },
                    {
                        title: "状态",
                        key: "check_state",
                        width: 160,
                        render: this.$util.getCheckStateRender()
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 200,
                        buttons: [
                            'BUTTON_EDIT',
                            'BUTTON_REMOVE'
                        ]
                    }
                ],
            };
        },
        computed: {
            filters() {
                return {
                    account_set_id: this.$util.getAccountSet().id,
                }
            },
        },
        mounted() {
        },
        methods: {
        },
    };
</script>
