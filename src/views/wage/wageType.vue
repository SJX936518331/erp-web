<template>
    <my-quick-table
            modelName="wage_type"
            modelNameZh="工资项目"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "名称",
                        key: "name",
                        width: 160
                    },
                    {
                        title: "类型",
                        key: "type",
                        width: 160,
                        sortable: true,
                        render: (h, params)=>{
                            return h('div', {}, params.row.type === '1' ? '增项' : '减项')
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
        methods: {
        }
    };
</script>
