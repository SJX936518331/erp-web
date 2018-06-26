<template>
    <div class="">
        <Row>
            <Col class="admin-col" span="18">
                <Card class="admin-card">
                    <p slot="title">出纳管理</p>
                    <div class="admin-list">
                        <div class="item">
                            <router-link class="link" to="/journal/add">
                                <i class="icon icon-bill"></i>
                                <div class="title">日记账录入</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/bills">
                                <i class="icon icon-bill"></i>
                                <div class="title">票据管理</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/purchase/purchase_orders">
                                <i class="icon icon-bill"></i>
                                <div class="title">出纳会计对账</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/purchase/purchase_orders">
                                <i class="icon icon-bill"></i>
                                <div class="title">出纳结账</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/purchase/purchase_orders">
                                <i class="icon icon-bill"></i>
                                <div class="title">银行对账单录入</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/purchase/purchase_orders">
                                <i class="icon icon-bill"></i>
                                <div class="title">出纳银行对账</div>
                            </router-link>
                        </div>
                    </div>
                </Card>
                <Card class="admin-card">
                    <p slot="title">基础资料</p>
                    <ul class="admin-list2">
                        <li class="item">
                            <router-link class="link" to="/banks">
                                <i class="icon icon-bill"></i>
                                <div class="title">银行资料</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/banks">
                                <i class="icon icon-bill"></i>
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
                                <i class="icon icon-bill"></i>
                                <div class="title">币种类别</div>
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
                            <router-link class="link" to="/stocks">出纳日记总账</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">出纳日记账</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">出纳账户余额表</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">资金日报表</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">银行对账单余额表</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">银行存款余额调节表</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">票据购买清单</router-link>
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
