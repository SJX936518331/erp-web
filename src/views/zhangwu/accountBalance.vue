<template>
    <div class="admin-page-container">
        <div class="admin-tool-bar">
            <div class="tool-left">
                <slot name="filter"></slot>
            </div>
            <div class="tool-right">
            </div>
        </div>

        <table class="ivu-table ivu-table-with-fixed-top">
            <tr>
                <th rowspan="2">科目编号</th>
                <th rowspan="2">科目名称</th>
                <th colspan="2">期初余额</th>
                <th colspan="2">本期发生额</th>
                <th colspan="2">期末余额</th>
            </tr>
            <tr>
                <th>借方</th>
                <th>贷方</th>
                <th>借方</th>
                <th>贷方</th>
                <th>借方</th>
                <th>贷方</th>
            </tr>
            <div v-if="!data.length">暂无数据</div>
            <tr v-for="item in data">
                <td>{{ item.account_code }}</td>
                <td>{{ item.account_name }}</td>
                <td>{{ item.begin_dbit_balance }}</td>
                <td>{{ item.begin_credit_balance }}</td>
                <td>{{ item.period_dbit_balance }}</td>
                <td>{{ item.period_credit_balance }}</td>
                <td>{{ item.ending_dbit_balance }}</td>
                <td>{{ item.ending_credit_balance }}</td>
            </tr>
            <tr>
                <td></td>
                <td>合计</td>
                <td>{{ total.begin_dbit_balance }}</td>
                <td>{{ total.begin_credit_balance }}</td>
                <td>{{ total.period_dbit_balance }}</td>
                <td>{{ total.period_credit_balance }}</td>
                <td>{{ total.ending_dbit_balance }}</td>
                <td>{{ total.ending_credit_balance }}</td>
            </tr>
        </table>

        <!--<my-pagination page="pagination" />-->

        <div class="debug">调试模式</div>
        <!--<p style="text-align:right;padding-right:40px;color:black;">-->
        <!--商品数量:-->
        <!--<span style="color:black;margin:5px;display:inline-block;">{{this.numberC}}</span>-->
        <!--</p>-->

        <my-footer />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                filters: {

                },
                data: [],
                total: {
                },
                pagination: {},
            }
        },
        props: {
            modelName: {
                type: String
            },
            modelNameZh: {
                type: String
            },
        },
        mounted() {
            this.getData()
        },
        methods: {
            filter(key, value) {
                this.filters[key] = value
                this.getData()
            },
            getData() {
                console.log(this.filters)

                let url = '/account_balance/all?'
                for (let key in this.filters) {
                    url += key + '=' + this.filters[key] + '&'
                }
                this.$http.get(url).then(
                    response => {
                        this.data = response.data.data
                        this.pagination = response.data.page
                        console.log(this.data)
                        // 合计
                        this.total = {
                            begin_dbit_balance: 0,
                            begin_credit_balance: 0,
                            period_dbit_balance: 0,
                            period_credit_balance: 0,
                            ending_dbit_balance: 0,
                            ending_credit_balance: 0
                        }
                        for (let item of this.data) {
                            this.total.begin_dbit_balance += item.begin_dbit_balance
                            this.total.begin_credit_balance += item.begin_credit_balance
                            this.total.period_dbit_balance += item.period_dbit_balance
                            this.total.period_credit_balance += item.period_credit_balance
                            this.total.ending_dbit_balance += item.ending_dbit_balance
                            this.total.ending_credit_balance += item.ending_credit_balance
                        }
                    },
                    response => {
                        console.log(response)
                    }
                )
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
        }
    }
</script>

<style lang="less" scoped>
    .debug {
        margin: 24px 0;
        color: #ccc;
    }
    .ivu-table {
        width: 100%;
        border: 1px solid #e9eaec;
        th {
            text-align: center;
            border-right: 1px solid #e9eaec;
        }
        td {
            padding: 0 8px;
            border-right: 1px solid #e9eaec;
        }
    }
</style>
