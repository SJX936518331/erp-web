<template>
    <div>
        <Button @click="selectBillType">选择单据类型</Button>

        <Modal v-model="modalVisible" title="选择单据类型" :width="800" okText="212" @on-ok="modalOk" @on-cancel="modalCancel">
            <Table :columns="columns" :data="billTypes"></Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modelName: 'bill_type',
                billTypes: [],
                modalVisible: false,
                columns: [
                    {
                        title: "单据编号",
                        key: "code"
                    },
                    {
                        title: "单据类型",
                        key: 'name'
                    },
                    {
                        title: '备注',
                        key: 'note',
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 240,
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.selectBillTypeItem(this.billTypes[params.index])
                                            }
                                        }
                                    },
                                    "选择"
                                )
                            ]);
                        }
                    }
                ],
            }
        },
        props: {
//            onSelect: {
//                type: Function
//            }
        },
        methods: {
            selectBillType() {
                this.modalVisible = true
                this.$http.get(`/${this.modelName}/all`).then(
                    response => {
                        let data = response.data
                        this.billTypes = data.data
                        console.log(this.billTypes)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            selectBillTypeItem(billType) {
                console.log('选择了', billType)
                this.modalVisible = false
                this.$emit('select', billType)
            },
            modalOk() {
            },
            modalCancel() {
            }
        }
    }
</script>

<style scoped>
</style>
