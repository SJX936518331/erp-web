<template>
    <div style="display: inline-block">
        <Button @click="showSelector" v-if="type === 'table'">选择{{ modelNameZh }}</Button>
        <Select class="admin-select" v-model="curObjectId" @on-change="oncurObjectIdChange" v-if="type === 'select'">
            <Option value="">无</Option>
            <Option v-for="item in objectArr" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>

        <Modal v-model="modalVisible" :title="'选择' + modelNameZh" :width="800" okText="212" @on-ok="modalOk" @on-cancel="modalCancel">
            <div class="admin-tool-bar">
                <div class="tool-left">
                    <slot name="filter"></slot>
                </div>
                <div class="tool-right">
                </div>
            </div>
            <Table :columns="columns" :height="480" :data="objectArr"></Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                curObjectId: '',
                objectArr: [],
                modalVisible: false,
            }
        },
        props: {
            filters: {
                type: Object,
                default() {
                    return {}
                }
            },
            columns: {
                type: Array,
                default() {
                    return []
                }
            },
            defaultValue: {
                type: String,
                default: '',
            },
            modelName: {
                type: String
            },
            type: {
                type: String,
                default: 'table'
            },
            modelNameZh: {
                type: String
            },
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
            getData() {
                console.log(this.filters)

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
                        if (this.defaultValue === 'FIRST') {
                            this.$emit('select', this.objectArr[0])
                        }
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            filter(key, value) {
                this.filters[key] = value
                this.getData()
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
        }
    }
</script>

<style scoped>
</style>
