<template>
    <my-quick-table
            modelName="bill"
            modelNameZh="票据"
            :columns="columns"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '票据状态',
                        key: 'make_time',
                        width: 160,
                        render: this.$util.getDateRender('make_time')
                    },
                    {
                        title: '票据号',
                        key: 'code',
                        width: 160,
                    },
                    {
                        title: '购买日期',
                        key: 'code',
                        width: 160,
                    },
                    {
                        title: '领用人',
                        key: 'code',
                        width: 160,
                    },
                    {
                        title: '领用日期',
                        key: 'code',
                        width: 160,
                    },
                    {
                        title: '用途',
                        key: 'code',
                        width: 160,
                    },
                    {
                        title: '使用限额',
                        key: 'code',
                        width: 160,
                    },
                    {
                        title: '报销人',
                        key: 'code',
                        width: 160,
                    },
                    {
                        title: '日期',
                        key: 'make_time',
                        width: 160,
                        render: this.$util.getDateRender('make_time')
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
        mounted() {
        },
        methods: {
        },
    };
</script>
