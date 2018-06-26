<template>
    <my-quick-table
            modelName="voucher_summary"
            modelNameZh="凭证摘要"
            :columns="columns"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '编号',
                        key: 'code',
                        width: 160
                    },
                    {
                        title: '名称',
                        key: 'name',
                        width: 160
                    },
                    {
                        title: '类型',
                        key: 'type_name',
                        width: 160
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
