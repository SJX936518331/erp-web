<template>
    <my-quick-table
            modelName="purchase_plan"
            modelNameZh="采购计划单"
            :columns="columns">
    </my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "单号",
                        key: "id",
                        width: 240
                    },
                    {
                        title: "日期",
                        key: "make_time",
                        width: 160
                    },
                    {
                        title: "摘要",
                        key: "note",
                        width: 320
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 150,
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "25px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Modal.info({
                                                    title: "查看明细",
                                                    content: `单号:${this.data1[params.index].id}<br>
                        日期:${this.data1[params.index].date}<br>
                        摘要:${this.data1[params.index].abstract}`
                                                });
                                            }
                                        }
                                    },
                                    "查看明细"
                                )
                            ]);
                        }
                    }
                ],
            };
        },
        methods: {
        }
    };
</script>
