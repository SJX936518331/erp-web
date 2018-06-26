<template>
    <my-quick-table
            modelName="pick"
            modelNameZh="领料单"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "单号",
                        key: "code",
                        width: 240
                    },
                    {
                        title: "日期",
                        key: "make_time",
                        width: 160
                    },
                    {
                        title: "仓库",
                        key: "store_name",
                        width: 160
                    },
                    {
                        title: "摘要",
                        key: "note",
                        width: 320
                    },
                    {
                        title: "状态",
                        key: "check_state",
                        width: 160,
                        render: this.$util.getCheckStateRender()
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 200,
                        buttons: [
                            'BUTTON_VIEW',
                            'BUTTON_EDIT',
                            'BUTTON_REMOVE'
                        ]
                    }
                ],
            };
        }
    };
</script>
