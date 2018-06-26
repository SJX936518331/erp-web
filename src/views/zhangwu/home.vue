<template>
    <div class="">
        <Row>
            <Col class="admin-col" span="18">
            <Card class="admin-card">
                <p slot="title">账务系统</p>
                <div class="admin-list">
                    <div class="item">
                        <router-link class="link" to="/voucher/add">
                            <i class="icon icon-bill"></i>
                            <div class="title">凭证录入</div>
                        </router-link>
                    </div>
                    <!--<div class="item">-->
                        <!--<router-link class="link" to="/vouchers">-->
                            <!--<i class="icon icon-bill"></i>-->
                            <!--<div class="title">凭证审核</div>-->
                        <!--</router-link>-->
                    <!--</div>-->
                    <div class="item">
                        <router-link class="link" to="/purchase/purchase_orders">
                            <i class="icon icon-bill"></i>
                            <div class="title">凭证登账</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/purchase/purchase_orders">
                            <i class="icon icon-bill"></i>
                            <div class="title">期末结账</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/vouchers">
                            <i class="icon icon-bill"></i>
                            <div class="title">凭证查找</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/purchase/purchase_orders">
                            <i class="icon icon-bill"></i>
                            <div class="title">结转损益</div>
                        </router-link>
                    </div>

                </div>
            </Card>
            <Card class="admin-card">
                <p slot="title">基础资料</p>
                <ul class="admin-list2">
                    <li class="item">
                        <router-link class="link" to="/banks">
                            <i class="icon icon-bank"></i>
                            <div class="title">银行资料</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/banks">
                            <i class="icon icon-cashier"></i>
                            <div class="title">出纳账户</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/accounts">
                            <i class="icon icon-bill"></i>
                            <div class="title">会计科目</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/currencies">
                            <i class="icon icon-money"></i>
                            <div class="title">币种类别</div>
                        </router-link>
                    </li>
                    <div class="item">
                        <router-link class="link" to="/account_balances_edit">
                            <i class="icon icon-bill"></i>
                            <div class="title">期初设置</div>
                        </router-link>
                    </div>
                    <!--<li class="item">-->
                        <!--<router-link class="link" to="/customers">-->
                            <!--<i class="icon icon-customer"></i>-->
                            <!--<div class="title">客户资料</div>-->
                        <!--</router-link>-->
                    <!--</li>-->
                    <!--<li class="item">-->
                        <!--<router-link class="link" to="/suppliers">-->
                            <!--<i class="icon icon-customer"></i>-->
                            <!--<div class="title">供应商资料</div>-->
                        <!--</router-link>-->
                    <!--</li>-->
                </ul>
            </Card>
            <Card class="admin-card">
                <p slot="title">凭证基础资料</p>
                <ul class="admin-list2">
                    <li class="item">
                        <router-link class="link" to="/voucher_types">
                            <i class="icon icon-type"></i>
                            <div class="title">凭证类型</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/voucher_summaries">
                            <i class="icon icon-bill"></i>
                            <div class="title">凭证摘要</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/voucher_summary_types">
                            <i class="icon icon-type"></i>
                            <div class="title">凭证摘要类型</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/voucher_templates">
                            <i class="icon icon-bill"></i>
                            <div class="title">凭证模板</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/voucher_template_types">
                            <i class="icon icon-type"></i>
                            <div class="title">凭证模板类型</div>
                        </router-link>
                    </li>
                </ul>
            </Card>
            </Col>

            <Col class="admin-col" span="6">
            <Card class="admin-card">
                <p slot="title">新增资料</p>
                <ul class="admin-list3">
                    <li class="item">
                        <router-link class="link" to="/currency/add">新增币种</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/supplier/add">新增供应商</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/customer/add">新增客户</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/supplier/add">业务查找</router-link>
                    </li>
                </ul>
            </Card>
            <Card class="admin-card">
                <p slot="title">报表中心</p>
                <ul class="admin-list3">
                    <li class="item">
                        <router-link class="link" to="/voucher/total">凭证汇总表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/account_balances">科目余额表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">明细分类账</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">多栏账</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">总分类账</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">科目汇总表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/balance">试算平衡表</router-link>
                    </li>
                </ul>
            </Card>
            </Col>
        </Row>

        <my-footer/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
            },
        }
    };
</script>
