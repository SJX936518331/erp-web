<template>
    <div class="">
        <Row>
            <Col class="admin-col" span="18">
                <Card class="admin-card">
                    <p slot="title">应收应付</p>
                    <div class="admin-list">
                        <div class="item">
                            <router-link class="link" to="/purchase/purchase_plans">
                                <i class="icon icon-bill"></i>
                                <div class="title">往来账销核</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/purchase/purchase_plans">
                                <i class="icon icon-bill"></i>
                                <div class="title">应收款单</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/purchase/purchase_orders">
                                <i class="icon icon-bill"></i>
                                <div class="title">应付款单</div>
                            </router-link>
                        </div>
                    </div>
                </Card>
                <Card class="admin-card">
                    <p slot="title">基础资料</p>
                    <ul class="admin-list2">
                        <li class="item">
                            <router-link class="link" to="/customers">
                                <i class="icon icon-customer"></i>
                                <div class="title">客户资料</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/suppliers">
                                <i class="icon icon-customer"></i>
                                <div class="title">供应商资料</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/products">
                                <i class="icon icon-bank"></i>
                                <div class="title">出纳账户</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/pay_types">
                                <i class="icon icon-type"></i>
                                <div class="title">结算方式</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/finance/pay_types">
                                <i class="icon icon-bill_search"></i>
                                <div class="title">业务查找</div>
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
                            <router-link class="link" to="/customer_type/add">XXX</router-link>
                        </li>
                    </ul>
                </Card>
                <Card class="admin-card">
                    <p slot="title">报表中心</p>
                    <ul class="admin-list3">
                        <li class="item">
                            <router-link class="link" to="/stocks">应付账款汇总表</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">应收账款汇总表</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">采购付款一览表</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">销售收款一览表</router-link>
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
