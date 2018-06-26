<template>
    <div>
        <Button @click="selectInStore">选择调入仓库</Button>

        <Modal v-model="modalVisible" title="选择仓库" :width="800" okText="212" @on-ok="modalOk" @on-cancel="modalCancel">
            <Table :columns="columns" :data="inStore"></Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modelName: 'store',
                inStore: [],
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
                                                this.selectInStoreItem(this.inStore[params.index])
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
            selectInStore() {
                this.modalVisible = true
                this.$http.get(`/${this.modelName}/all`).then(
                    response => {
                        let data = response.data
                        this.inStore = data.data
                        console.log(this.inStore)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            selectInStoreItem(inStore) {
                console.log('选择了', inStore)
                this.modalVisible = false
                this.$emit('select', inStore)
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
