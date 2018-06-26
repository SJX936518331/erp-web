<template>
    <my-quick-table
            modelName="store"
            modelNameZh="仓库"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                columns: [
                    {
                        title: "仓库编号",
                        key: "code",
                        width: 160
                    },
                    {
                        title: "仓库名称",
                        key: "name",
                        width: 160
                    },
                    {
                        title: "分支机构",
                        key: "branch_name",
                        width: 160
                    },
                    {
                        title: "地址",
                        key: "address",
                        width: 320
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
            }
        },
        mounted() {
        },
        methods: {
        },
    }
</script>
