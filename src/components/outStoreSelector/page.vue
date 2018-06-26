<template>
    <div>
        <Button @click="selectOutStore">选择调出仓库</Button>

        <Modal v-model="modalVisible" title="选择调出仓库" :width="800" okText="212" @on-ok="modalOk" @on-cancel="modalCancel">
            <Table :columns="columns" :data="outStore"></Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modelName: 'store',
                outStore: [],
                modalVisible: false,
                columns: [
                    {
                        title: "仓库编号",
                        key: "code"
                    },
                    {
                        title: "仓库名称",
                        key: 'name'
                    },
                    {
                        title: '地址',
                        key: 'address',
                    },
                    {
                        title: "仓库管理员",
                        key: "manager_name",
                        width: 240,
                    },
                    {
                        title: '分支机构',
                        key: 'branch_name',
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
                                                this.selectOutStoreItem(this.outStore[params.index])
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
            selectOutStore() {
                this.modalVisible = true
                this.$http.get(`/${this.modelName}/all`).then(
                    response => {
                        let data = response.data
                        this.outStore = data.data
                        console.log(this.outStore)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            selectOutStoreItem(outStore) {
                console.log('选择了', outStore)
                this.modalVisible = false
                this.$emit('select', outStore)
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
