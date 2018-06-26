<template>
    <my-quick-table
            modelName="apply_type"
            modelNameZh="申请类型"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '申请类型',
                        key: 'name',
                        width: 160
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
