<template>
    <my-quick-table
            modelName="currency"
            modelNameZh="币种"
            :filters="filters"
            :columns="columns"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '编码',
                        key: 'code',
                        width: 160
                    },
                    {
                        title: '名称',
                        key: 'name',
                        width: 160
                    },
                    {
                        title: '汇率',
                        key: 'rate',
                        width: 160
                    },
                    {
                        title: '是否本位币',
                        key: 'is_default',
                        width: 160,
                        render: this.$util.getBoolRender('is_default')
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
                    account_set_id: this.$util.getAccountSet().id
                }
            },
        },
        mounted() {
        },
        methods: {
        },
    };
</script>
