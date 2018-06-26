<template>
    <div>
        <Select class="admin-select" v-model="branch" @on-change="onBranchChange">
            <Option value="">无</Option>
            <Option v-for="item in objectArr" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        <!---->
        <!---->
        <!--<Modal v-model="modalVisible" title="选择仓库" :width="800" okText="212" @on-ok="modalOk" @on-cancel="modalCancel">-->
            <!--<Table :columns="columns" :data="objectArr"></Table>-->
            <!--<div slot="footer"></div>-->
        <!--</Modal>-->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modelName: 'branch',
                branch: null,
                objectArr: [],
                modalVisible: false,
                columns: [
                    {
                        title: "分支机构编号",
                        key: "code"
                    },
                    {
                        title: "分支机构",
                        key: 'name'
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
                                                this.selectUserItem(this.objectArr[params.index])
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
        mounted() {
            this.getData()
        },
        methods: {
            onBranchChange() {
                if (this.branch) {
                    for (let item of this.objectArr) {
                        if (item.id === this.branch) {
                            this.$emit('select', item)
                        }
                    }
                } else {
                    this.$emit('select', null)
                }
            },
            getData() {
                this.$http.get(`/${this.modelName}/all`).then(
                    response => {
                        let data = response.data
                        this.objectArr = data.data
                        console.log('啦啦啦', this.objectArr)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            selectUserItem(user) {
                console.log('选择了', user)
                console.log(this.onSelect)
                this.modalVisible = false
//                this.onSelect && this.onSelect(user)
                this.$emit('select', user)
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
