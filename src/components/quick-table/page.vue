<template>
    <div class="admin-page-container">
        <div class="admin-tool-bar">
            <div class="tool-left">
                <slot name="filter"></slot>
            </div>
            <div class="tool-right">
                <Button class="btn" type="primary" @click="add" v-if="addAble">添加{{ modelNameZh }}</Button>
                <Button class="btn" @click="exportData">导出数据</Button>
            </div>
        </div>
        <div class="table-box">
            <div class="loading-box">
                <Spin fix v-if="loading">
                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    <div>加载中</div>
                </Spin>
            </div>
            <Table :columns="columns" border :data="data" ref="table" :height="tableHeight"></Table>
        </div>
        <div class="admin-page-box">

            <Page :total="pagination.total" :page-size="pagination.pageSize"
                  @on-page-size-change="pageSizeChange"
                  @on-change="pageChange"
                  :page-size-opts="[20,40,60,80]"
                  show-elevator show-sizer></Page>
        </div>
        <slot></slot>
        <!--<my-pagination page="pagination" />-->

        <!--<div class="debug">调试模式</div>-->
        <!--<p style="text-align:right;padding-right:40px;color:black;">-->
            <!--商品数量:-->
            <!--<span style="color:black;margin:5px;display:inline-block;">{{this.numberC}}</span>-->
        <!--</p>-->

        <!--<my-footer />-->
    </div>
</template>

<script>
    import table2excel from '@/libs/table2excel.js'

    export default {
        data() {
            return {
                loading: false,
//                filters: {},
                data: [],
                tableHeight: 500,
                pagination: {
                    current: 1,
                    pageSize: 20,
                    total: 100
                },
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
            url: {
                type: String,
                default: ''
            },
            modelName: {
                type: String
            },
            modelNameZh: {
                type: String
            },
            addAble: {
                type: Boolean,
                default: true
            },
            addUrl: {
                type: String
            },
        },
        mounted() {
            this.tableHeight = window.innerHeight - 300
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

                let url = this.url ? this.url + '?' : this.modelName + '/all?'
                for (let key in this.filters) {
                    url += key + '=' + this.filters[key] + '&'
                }
                url += `page=${this.pagination.current}&page_size=${this.pagination.pageSize}`
                this.loading = true
                this.$http.get(url).then(
                    response => {
                        this.data = response.data.data
                        this.pagination.total = response.data.total
                        this.pagination.total = response.data.total
                        console.log(this.data)
                        this.loading = false
                    },
                    response => {
                        console.log(response)
                        this.loading = false
                    }
                )
            },
            add() {
                let url
                if (this.addUrl) {
                    url = this.addUrl
                } else {
                    url = `/${this.modelName}/add`
                }
                this.$router.push(url)
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
                                console.log('错误', response)
                                this.$Message.info(storage.get('requestError'));
                            }
                        ).catch(function (error) {
                            console.log('哈哈')
//                            this.$Message.info(storage.get('requestError'));
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
            exportData() {
                this.$refs.table.exportCsv({
                    filename: 'Custom data',
                    columns: this.columns.filter((col, index) => index < 4),
                    data: this.data.filter((data, index) => index < 4)
                })
//                table2excel.transform(this.$refs.table, 'hrefToExportTable', '下载.csv')
            },
            pageChange(page) {
                this.pagination.current = page
                this.getData()
                console.log('change', this)
            },
            pageSizeChange(pageSize) {
                this.pagination.pageSize = pageSize
                this.getData()
            }
        },
    }
</script>

<style scoped>
    .table-box {
        position: relative;
    }
    .loading-box {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .debug {
        margin: 24px 0;
        color: #ccc;
    }
    .admin-page-box {
        margin-top: 16px;
    }
</style>
