<template>
    <div class="admin-page-container">
        <div class="admin-tool-bar">
            <div class="tool-left">
                <slot name="filter">
                    <Button-group>
                        <i-button :type="type === 1 ? 'primary' : 'default'" @click="setType(1)">资产</i-button>
                        <i-button :type="type === 2 ? 'primary' : 'default'" @click="setType(2)">负债</i-button>
                        <i-button :type="type === 3 ? 'primary' : 'default'" @click="setType(3)">权益</i-button>
                        <i-button :type="type === 4 ? 'primary' : 'default'" @click="setType(4)">成本</i-button>
                        <i-button :type="type === 5 ? 'primary' : 'default'" @click="setType(5)">损益</i-button>
                    </Button-group>
                </slot>
            </div>
            <div class="tool-right">
                <Button class="btn" @click="add" v-if="addAble">添加{{ modelNameZh }}</Button>
            </div>
        </div>

        <Table :columns="columns" :data="data" ref="table" :height="500"></Table>
        <div class="admin-tip">
            * 提示：按 Ctrl + F 键并输入科目编码或者科目名称可以查找科目。
        </div>
        <!--<div class="layout-left">-->

        <!--</div>-->
        <!--<div class="layout-right">-->

        <!--</div>-->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                type: 1,
                modelName: 'account',
                modelNameZh: '会计科目',
                columns: [
                    {
                        title: '科目编码',
                        key: 'code',
                        width: 160
                    },
                    {
                        title: '科目名称',
                        key: 'name',
                        width: 160,
                        render: (h, params) => {
                            let item = params.row
                            let space = ''
                            for (let i = 0; i < item.level - 1; i++) {
                                space += '　　'
                            }
                            return h('div', space + item.name)
                        }
                    },
                    {
                        title: '助记码',
                        key: 'key',
                        width: 160
                    },
                    {
                        title: '类型',
                        key: 'type_name',
                        width: 160
                    },
                    {
                        title: '余额方向',
                        key: 'direction',
                        width: 160,
                        render: (h, params) => {
                            let item = params.row
                            return h('div', item.direction === '1' ? '借' : '贷')
                        }
                    },
                    {
                        title: '备注',
                        key: 'note',
                        width: 160
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 200,
                        buttons: (h, params)=> {
                            return [
                                'BUTTON_EDIT',
                                'BUTTON_REMOVE'
                            ]
                        }
                    }
                ],
                filters: {},
                data: [],
                pagination: {},
            }
        },
        props: {
            addAble: {
                type: Boolean,
                default: true
            }
        },
        mounted() {
            this.getData()
            for (let i = 0; i < this.columns.length; i++) {
                let column = this.columns[i]
                if (column.key === 'action' && column.buttons) {
                    this.columns.splice(i, 1, {
                        title: "操作",
                        key: "action",
                        width: column.width || 150,
                        render: (h, params) => {
                            let buttons = typeof column.buttons === 'function' ? column.buttons(params) : column.buttons
                            return h("div", this.getButtons(h, params, buttons));
                        }
                    })
                }
            }
        },
        methods: {
            setType(type) {
                this.type = type
            },
            filter(key, value) {
                this.filters[key] = value
                this.getData()
            },
            // 单词的复数形式
            getPlural(name) {
                let editUrl = name
                if (name.match(/y$/)) {
                    editUrl = editUrl.substring(0, editUrl.length - 1) + 'ies'
                } else if (name.match(/s$/)) {
                    editUrl += 'es'
                } else {
                    editUrl += 's'
                }
                return editUrl
            },
            getButtons(h, params, btns) {
                let buttons = []
                for (let item of btns) {
                    if (item === 'BUTTON_VIEW') {
                        buttons.push(h(
                            "Button",
                            {
                                props: {
                                    type: "default",
                                    size: "small"
                                },
                                style: {
                                    marginRight: "8px"
                                },
                                on: {
                                    click: () => {
                                        this.$router.push(`/${this.getPlural(this.modelName)}/${this.data[params.index].id}`)
                                    }
                                }
                            },
                            "查看"
                        ))
                    }
                    else if (item === 'BUTTON_EDIT') {
                        buttons.push(h(
                            "Button",
                            {
                                props: {
                                    type: "default",
                                    size: "small"
                                },
                                style: {
                                    marginRight: "8px"
                                },
                                on: {
                                    click: () => {
                                        this.$router.push(`/${this.getPlural(this.modelName)}/${this.data[params.index].id}/edit`)
                                    }
                                }
                            },
                            "修改"
                        ))
                    }
                    else if (item === 'BUTTON_REMOVE') {
                        buttons.push(h(
                            "Button",
                            {
                                props: {
                                    type: "error",
                                    size: "small"
                                },
                                style: {
                                    marginRight: "8px"
                                },
                                on: {
                                    click: () => {
                                        this.removeItem(this.data[params.index], params.index)
                                    }
                                }
                            },
                            "删除"
                        ))
                    }
                    else {
                        buttons.push(
                            h(
                                "Button",
                                {
                                    props: {
                                        type: item.type,
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "8px"
                                    },
                                    on: {
                                        click: () => {
                                            item.click && item.click(params)
                                        }
                                    }
                                },
                                item.text
                            ))
                    }
                }
                return buttons
            },
            getData() {
                console.log(this.filters)

                let accounSetId = this.$util.getAccountSet().id
                let url = this.modelName + '/all?account_set_id=' + accounSetId + '&type=' + this.type

                this.$http.get(url).then(
                    response => {
                        this.data = response.data.data
                        this.pagination = response.data.page
                        console.log(this.data)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            add() {
                this.$router.push(`/${this.modelName}/add?type=` + this.type)
            },
            removeItem(item, index) {
                this.$Modal.confirm({
                    title: '提示信息',
                    content: '确定删除数据？',
                    onOk: () => {
                        this.$http.post(`/${this.modelName}/remove?id=` + item.id).then(
                            response => {
                                this.getData()
                            },
                            response => {
                                console.log(response)
                            }
                        ).catch(function (error) {
                            console.log('哈哈')
                            console.log(error.response.data)
                            if (error.response) {
                                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                                console.log(error.response.data);
                                console.log(error.response.status);
                                console.log(error.response.headers);
                            } else {
                                // Something happened in setting up the request that triggered an Error
                                console.log('Error', error);
                                console.log('Error', error.message);
                            }
                            console.log(error.config);
                        });
                    }
                })
            },
        },
        watch: {
            type() {
                this.getData()
            }
        }
    }
</script>

<style scoped>
    .layout-left {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 500px;
        padding: 56px 16px 0 16px;
    }
    .layout-right {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 500px;
        padding: 0 16px 0 0;
    }
    .debug {
        margin: 24px 0;
        color: #ccc;
    }
    .admin-tip {
        margin-top: 16px;
        color: #999;
    }
</style>
