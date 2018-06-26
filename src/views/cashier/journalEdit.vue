<template>
    <div>
        <div class="admin-tool-bar">
            <div class="tool-left">
                <Select v-model="bank.id" style="width:200px">
                    <Option v-for="bank in banks" :value="bank.id" :key="bank.id">{{ bank.name }}</Option>
                </Select>
            </div>
            <div class="tool-right">
            </div>
        </div>

        <Card v-if="curObject">

            <admin-table>
                <tr>
                    <th>单据编号</th>
                    <th width="140">日期</th>
                    <th>摘要</th>
                    <th>收支类别</th>
                    <th width="140">收入（借方）</th>
                    <th width="140">支出（贷方）</th>
                    <th width="140">余额</th>
                    <th>操作</th>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>初始化余额</td>
                    <td></td>
                    <td></td>
                    <td>
                        <input/>
                    </td>
                    <td>{{ initMoney }}</td>
                    <td></td>
                </tr>
                <tr v-for="item, index in items">
                    <td>{{ item.code }}</td>
                    <td>
                        <DatePicker v-model="item.date" type="date" format="yyyy-MM-dd" placeholder="Select date"></DatePicker>
                    </td>
                    <td>
                        <Input v-model="item.summary" ></Input>
                    </td>
                    <td>{{ item.balance_io_type_name }}
                        <my-balance-io-type-selector @click.native="selectIndex(index)" @select="onBalanceIoTypeSelect" />
                    </td>
                    <td>
                        <div v-if="item.balance_io_type_type === '2'"> {{ item.out_money }}</div>
                        <Input v-model="item.in_money" v-if="item.balance_io_type_type === '1'" ></Input>
                    </td>
                    <td>
                        <div v-if="item.balance_io_type_type === '1'"> {{ item.out_money }}</div>
                        <Input v-model="item.out_money" v-if="item.balance_io_type_type === '2'" ></Input>
                    </td>
                    <td>{{ item.balance }}
                        <!--（{{ item.out_money }}）-->
                    </td>
                    <td>
                        <a href="#" @click.prevent="save(item)">保存</a>
                        <a href="">插入</a>
                        <a href="" @click.prevent="remove(item, index)">删除</a>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>合计</td>
                    <td></td>
                    <td>{{ total.in_money }}</td>
                    <td>{{ total.out_money }}</td>
                    <td>{{ total.balance }}</td>
                </tr>
            </admin-table>

            <!--<Form class="admin-form" ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">-->

                <!--<FormItem label="编号" prop="code">-->
                    <!--<Input v-model="curObject.code" placeholder=""></Input>-->
                <!--</FormItem>-->
                <!--<FormItem label="名称" prop="name">-->
                    <!--<Input v-model="curObject.name" placeholder=""></Input>-->
                <!--</FormItem>-->
                <!--<FormItem label="会计科目" prop="account_id">-->
                    <!--<div class="form-selector">-->
                        <!--<div class="value">{{ curObject.account_name }}</div>-->
                        <!--<div class="selector">-->
                            <!--<my-account-selector @select="onAccountSelect" />-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</FormItem>-->
                <!--<FormItem label="备注" prop="note">-->
                    <!--<Input v-model="curObject.note" placeholder=""></Input>-->
                <!--</FormItem>-->
                <!--<FormItem>-->
                    <!--<Button type="primary" @click="save">保存</Button>-->
                    <!--<Button type="ghost" style="margin-left: 8px">取消</Button>-->
                <!--</FormItem>-->
            <!--</Form>-->
        </Card>
    </div>
</template>

<script>
    import {format} from '../../util/time'

    export default {
        data() {
            return {
                initMoney: 100,
                bank: {},
                banks: [],
                items: [],
                total: {
                    in_money: 0,
                    out_money: 0,
                    balance: 0
                },
                modelName: 'bank',
                curObject: {
                    account_id: '',
                    account_name: '',
                },
                validate: {
                    code: [
                        {
                            required: true,
                            message: "编号不能为空",
                        }
                    ],
                    name: [
                        {
                            required: true,
                            message: "名称不能为空",
                        }
                    ],
                    account_id: [
                        {
                            required: true,
                            message: "会计科目不能为空",
                        }
                    ]
                },
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                this.$http.get(`/bank/all?account_set_id=` + this.$util.getAccountSet().id).then(
                    response => {
                        let data = response.data
                        this.banks = data.data
                        this.bank = this.banks[0]
                        console.log(this.banks)
                    },
                    response => {
                        console.log(response)
                    }
                )
                this.$http.get(`/journal_item/all?account_set_id=` + this.$util.getAccountSet().id).then(
                    response => {
                        let data = response.data
                        this.items = data.data
                        this.total = {
                            in_money: 0,
                            out_money: 0,
                            balance: 0
                        }
                        let balance = this.initMoney
                        for (let item of this.items) {
                            if (item.money > 0) {
                                item.in_money = item.money
                                item.out_money = 0
                                this.total.in_money += item.in_money
                            } else {
                                item.in_money = 0
                                item.out_money = 0 - item.money;
                                this.total.out_money += item.out_money
                            }
                            balance += item.money
                            item.balance = balance
                        }
                        this.items.push({
                            code: '',
                            summary: '',
                            date: null,
                            money: 0,
                            balance_io_type_id: 0,
                            balance_io_type_name: '',
                        })
                        this.total.balance = balance
                    },
                    response => {
                        console.log(response)
                    }
                )

                this.curObjectId = this.$route.params.id
                if (!this.curObjectId) {
                    return
                }
                this.$http.get(`/${this.modelName}/detail?id=` + this.curObjectId).then(
                    response => {
                        let data = response.data
                        this.curObject = data.data
                        console.log(this.curObject)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            save(item) {
                let url = item.id ? `/journal_item/update` : `/journal_item/add`
                item.money = item.balance_io_type_type === '1' ? item.in_money : 0 -item.out_money
                console.log('bac是诗句', item.date)
                item.date = format(item.date, 'yyyy-MM-dd')
                console.log('bac是诗句', item.date)
                this.$http.post(url, item).then(
                    response => {
                        this.$Message.success('保存成功')
                        this.getData()
                    },
                    response => {
                        this.$Message.error('系统出错')
                    }
                )
            },
            remove(item, index) {
                if (item.id) {
                    let url = `/journal_item/remove?id=${item.id}`
                    this.$http.post(url).then(
                        response => {
                            this.$Message.success('删除成功')
                            this.getData()
                        },
                        response => {
                            this.$Message.error('系统出错')
                        }
                    )
                } else {
                    this.items.splice(index, 1)
                }
            },
            onBalanceIoTypeSelect(type) {
                this.items[this.selectIndex].balance_io_type_id = type.id
                this.items[this.selectIndex].balance_io_type_name = type.name
                this.items[this.selectIndex].balance_io_type_type = type.type
            },
            selectIndex(index) {
                this.selectIndex = index
            },
        }
    }
</script>
