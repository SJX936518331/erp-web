<template>
    <my-quick-table
            modelName="apply"
            modelNameZh="申请"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '申请类型',
                        key: 'type_name',
                        width: 160
                    },
                    {
                        title: '员工姓名',
                        key: 'apply_user_name',
                        width: 160
                    },
                    {
                        title: '分支机构',
                        key: 'branch_name',
                        width: 160
                    },
                    {
                        title: '职位',
                        key: 'position_name',
                        width: 160
                    },
                    {
                        title: '申请内容',
                        key: 'content',
                        width: 320
                    },
                    {
                        title: '状态',
                        key: 'check_state',
                        width: 160,
                        render: this.$util.getCheckStateRender()
                    },
                    {
                        title: '审批人',
                        key: 'check_user_name',
                        width: 160,
                        render: (h, params)=>{
                            return h('div', {}, params.row.check_state === '0' ? '' : params.row.check_user_name)
                        }
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 200,
                        buttons: params=> {
                            let buttons = [
                                'BUTTON_EDIT',
                                'BUTTON_REMOVE'
                            ]
                            if (params.row.check_state === '0') {
                                buttons.push({
                                    type: 'default',
                                    text: '审批',
                                    click: params => {
                                        console.log(this)
                                        console.log('审批', this.$refs.table)
                                        alert(params)
                                    }
                                })
                            }
                            return buttons
                        }
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
