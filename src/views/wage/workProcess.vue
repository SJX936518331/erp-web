<template>
    <my-quick-table
            modelName="work_process"
            modelNameZh="计件工序"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "编号",
                        key: "code",
                        width: 160
                    },
                    {
                        title: "名称",
                        key: "name",
                        width: 160
                    },
                    {
                        title: "工价",
                        key: "price",
                        width: 160
                    },
                    {
                        title: "工种",
                        key: "work_type_name",
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
        methods: {
        }
    };
</script>
