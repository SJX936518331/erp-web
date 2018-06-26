<template>
    <my-quick-table
            modelName="branch"
            modelNameZh="分支机构"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "机构编号",
                        key: "code",
                        width: 160
                    },
                    {
                        title: "机构名称",
                        key: "name",
                        width: 160,
                        editable: true
                    },
                    {
                        title: "地址",
                        key: "address",
                        width: 320
                    },
                    {
                        title: "备注",
                        key: "note",
                        width: 160
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 240,
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
        }
    };
</script>