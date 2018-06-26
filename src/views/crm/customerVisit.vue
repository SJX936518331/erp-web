<template>
    <my-quick-table
            modelName="customer_visit"
            modelNameZh="回访记录"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '客户姓名',
                        key: 'customer_name'
                    },
                    {
                        title: '回访日期',
                        key: 'time'
                    },
                    {
                        title: "回访类型",
                        key: "visit_type_name"
                    },
                    {
                        title: '回访内容',
                        key: 'content'
                    },
                    {
                        title: '业务员',
                        key: 'business_user_name'
                    },
                    {
                        title: '回访结果',
                        key: 'result',
                        render: (h, params)=>{
                            let text = ''
                            let color = ''
                            if (params.row.result === '1') {
                                text = '需继续跟进'
                                color = 'yellow'
                            } else if (params.row.result === '2') {
                                text = '无需跟进'
                                color = 'blue'
                            } else if (params.row.result === '3') {
                                text = '问题解决'
                                color = 'green'
                            }
                            return h('div', {}, [
                                h('Tag', {attrs: {type: 'dot', color: color}}, text)
                            ])
                        }
                    },
                    {
                        title: "备注",
                        key: "note"
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
