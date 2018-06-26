<template>
    <my-quick-table
            modelName="voucher_type"
            modelNameZh="凭证类型"
            :filters="filters"
            :columns="columns"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '凭证字',
                        key: 'name',
                        width: 160
                    },
                    {
                        title: '凭证标题',
                        key: 'print_name',
                        width: 160
                    },
                    {
                        title: '是否默认',
                        key: 'is_default',
                        width: 160,
                        render: (h, params)=>{
                            return h('div', {}, params.row.is_default === '1' ? '是' : '否')
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
