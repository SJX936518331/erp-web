<template>
    <my-quick-table
            modelName="supplier"
            modelNameZh="供应商"
            :columns="columns" ref="table"></my-quick-table>
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
                        title: '姓名',
                        key: 'name',
                        width: 160
                    },
                    {
                        title: '客户类型',
                        key: 'type_name',
                        width: 160
                    },
                    {
                        title: '手机号',
                        key: 'phone',
                        width: 160
                    },
                    {
                        title: "地址",
                        key: "address",
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
    }
</script>
