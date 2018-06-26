<template>
    <my-quick-table
            modelName="department"
            modelNameZh="部门"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "部门编号",
                        key: "code",
                        width: 160
                    },
                    {
                        title: "部门名称",
                        key: "name",
                        width: 160
                    },
                    {
                        title: "分支机构",
                        key: "branch_name",
                        width: 160
                    },
                    {
                        title: "备注",
                        key: "note",
                        width: 320
                    },
                    {
                        title: "部门负责人",
                        key: "manager_name",
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
            }
        },
        mounted() {
        },
        methods: {
        }
    }
</script>
