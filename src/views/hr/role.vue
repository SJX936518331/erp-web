<template>
    <my-quick-table
            modelName="role"
            modelNameZh="角色"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                columns: [
                    {
                        title: "编号",
                        key: "code",
                        width: 160
                    },
                    {
                        title: "角色名称",
                        key: "name",
                        width: 160
                    },
                    {
                        title: "备注",
                        key: "note",
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
