<template>
    <my-quick-table
            modelName="piecework_wage_item"
            modelNameZh="计件工资"
            :columns="columns" ref="table">
        工资计算方式：计件
        其他单据信息 TODO
    </my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "员工",
                        key: "user_name"
                    },
                    {
                        title: "部门",
                        key: "department_name"
                    },
                    {
                        title: "工种名称",
                        key: "work_type_name"
                    },
                    {
                        title: "工序名称",
                        key: "work_process_name"
                    },
                    {
                        title: "单位",
                        key: "name",
                        render: (h, params)=>{
                            return h('div', {}, '个')
                        }
                    },
                    {
                        title: "数量",
                        key: "number"
                    },
                    {
                        title: "单价",
                        key: "price"
                    },
                    {
                        title: "加班费",
                        key: "overtime_wage"
                    },
                    {
                        title: "金额",
                        key: "total",
                        render: (h, params)=>{
                            return h('div', {}, params.row.number * params.row.price + params.row.overtime_wage)
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
