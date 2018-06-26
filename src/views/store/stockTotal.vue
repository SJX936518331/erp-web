<template>
    <my-quick-table
            :addAble="false"
            url="/stock/total_stock"
            :columns="columns" ref="table">
        <Modal v-model="modalVisible" title="产品分仓库存" :width="800" okText="212" @on-ok="modalOk" @on-cancel="modalCancel">
            <Table border :columns="columns2" :height="480" :data="data"></Table>
        </Modal>
    </my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "产品编号",
                        key: "product_code",
                        width: 160
                    },
                    {
                        title: "产品名称",
                        key: "product_name",
                        width: 160
                    },
                    {
                        title: "规格",
                        key: "product_spec",
                        width: 160
                    },
                    {
                        title: "单位",
                        key: "product_unit",
                        width: 80
                    },
                    {
                        title: "总库存",
                        key: "number",
                        width: 160
                    },
                    {
                        title: "可用数量",
                        key: "lock_number",
                        width: 160,
                        render: (h, params)=>{
                            return h('div', {}, params.row.number - params.row.lock_number)
                        }
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 150,
                        align: "center",
                        render: (h, params) => {
                            if (this.curObject && this.curObject.check_state === '1') {
                                return null
                            }
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "default",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.viewItemDetail(params.index)
                                            }
                                        }
                                    },
                                    "详情"
                                )
                            ]);
                        }
                    }
                ],
                //
                modalVisible: false,
                data: [],
                columns2: [
//                    {
//                        title: "产品编号",
//                        key: "product_code",
//                        width: 160
//                    },
//                    {
//                        title: "产品名称",
//                        key: "product_name",
//                        width: 160
//                    },
//                    {
//                        title: "规格",
//                        key: "product_spec",
//                        width: 160
//                    },
//                    {
//                        title: "单位",
//                        key: "product_unit",
//                        width: 80
//                    },
                    {
                        title: "仓库编号",
                        key: "store_code",
                        width: 160
                    },
                    {
                        title: "仓库名称",
                        key: "store_name",
                        width: 160
                    },
                    {
                        title: "库存",
                        key: "number",
                    },
                ],
            }
        },
        mounted() {
        },
        methods: {
            viewItemDetail(index) {
                let item = this.$refs.table.data[index]
                this.$http.get(`/stock/all?sku_id=` + item.sku_id).then(
                    response => {
                        let data = response.data
                        this.data = data.data
                        this.modalVisible = true
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            modalOk() {},
            modalCancel() {}
        },
    }
</script>
