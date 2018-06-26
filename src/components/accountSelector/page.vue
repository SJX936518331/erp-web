<template>
    <div>
        <Button @click="showSelector" v-if="type === 'table'">选择会计科目</Button>
        <Select class="admin-select" v-model="curObjectId" @on-change="oncurObjectIdChange" v-if="type === 'select'">
            <Option value="">无</Option>
            <Option v-for="item in objectArr" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>

        <Modal v-model="modalVisible" title="选择会计科目" :width="800" okText="212" @on-ok="modalOk" @on-cancel="modalCancel">
            <Button-group class="type-selector">
                <i-button :type="accountType === 1 ? 'primary' : 'default'" @click="setType(1)">资产</i-button>
                <i-button :type="accountType === 2 ? 'primary' : 'default'" @click="setType(2)">负债</i-button>
                <i-button :type="accountType === 3 ? 'primary' : 'default'" @click="setType(3)">权益</i-button>
                <i-button :type="accountType === 4 ? 'primary' : 'default'" @click="setType(4)">成本</i-button>
                <i-button :type="accountType === 5 ? 'primary' : 'default'" @click="setType(5)">损益</i-button>
            </Button-group>
            <Table :columns="columns" :height="500" :data="objectArr"></Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                accountType: 1,
                modelName: 'account',
                curObjectId: '',
                objectArr: [],
                modalVisible: false,
                columns: [
                    {
                        title: "编号",
                        key: "code"
                    },
                    {
                        title: "名称",
                        key: 'name'
                    },
                    {
                        title: "助记码",
                        key: 'key'
                    },
                    {
                        title: '类型',
                        key: 'type',
                    }
                ]
            }
        },
        props: {
            type: {
                type: String,
                default: 'table'
            },
            modelNameZh: {
                type: String
            },
        },
        computed: {
        },
        mounted() {
            if (this.type === 'select') {
                this.getData()
            }
            this.columns.unshift(
                {
                    title: "操作",
                    key: "action",
                    width: 80,
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
                                            this.selectItem(this.objectArr[params.index])
                                        }
                                    }
                                },
                                "选择"
                            )
                        ]);
                    }
                })
        },
        methods: {
            setType(type) {
                this.accountType = type
            },
            getData() {
                console.log('过滤器')
                console.log(this.filters)
                this.filters = {
                    account_set_id: this.$util.getAccountSet().id,
                    type: this.accountType
                }
                let url = this.modelName + '/all?'
                for (let key in this.filters) {
                    url += key + '=' + this.filters[key] + '&'
                }

                this.$http.get(url).then(
                    response => {
                        let data = response.data
                        this.objectArr = data.data
                        console.log('获取')
                        console.log(this.objectArr)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            oncurObjectIdChange() {
                console.log('便利')
                console.log(this.curObjectId)
                if (this.curObjectId) {
                    for (let item of this.objectArr) {
                        if (item.id === this.curObjectId) {
                            this.$emit('select', item)
                        }
                    }
                } else {
                    this.$emit('select', null)
                }
            },
            showSelector() {
                console.log(this)
                this.modalVisible = true
                this.getData()
            },
            selectItem(item) {
                this.modalVisible = false
                this.$emit('select', item)
            },
            modalOk() {
            },
            modalCancel() {
            }
        },
        watch: {
            accountType() {
                this.getData()
            }
        }
    }
</script>

<style scoped>
    .type-selector {
        margin-bottom: 16px;
    }
</style>
