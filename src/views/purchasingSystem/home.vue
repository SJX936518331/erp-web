<template>
    <div class="">
        <Row>
            <Col class="admin-col" span="18">
            <Card class="admin-card">
                <p slot="title">销售管理</p>
                <div class="admin-list">
                    <div class="item">
                        <router-link class="link" to="/purchase_plan/add">
                            <i class="icon icon-bill"></i>
                            <div class="title">采购计划</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/purchase_order/add">
                            <i class="icon icon-bill"></i>
                            <div class="title">采购订单</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/purchase_bill/add">
                            <i class="icon icon-bill"></i>
                            <div class="title">采购开单</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/storage_modify_price/add">
                            <i class="icon icon-bill"></i>
                            <div class="title">采购费用分摊</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/purchase_applies">
                            <i class="icon icon-bill"></i>
                            <div class="title">请购单</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/storage_combins">
                            <i class="icon icon-bill"></i>
                            <div class="title">估价入库</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/purchase_pays">
                            <i class="icon icon-bill"></i>
                            <div class="title">采购付款</div>
                        </router-link>
                    </div>
                </div>
            </Card>
            <Card class="admin-card">
                <p slot="title">基础资料</p>
                <ul class="admin-list2">
                    <li class="item">
                        <router-link class="link" to="/stores">
                            <i class="icon icon-bill"></i>
                            <div class="title">地区资料</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/suppliers">
                            <i class="icon icon-customer"></i>
                            <div class="title">供应商资料</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/supplier_types">
                            <i class="icon icon-type"></i>
                            <div class="title">供应商类型</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/products">
                            <i class="icon icon-product"></i>
                            <div class="title">产品资料</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/pay_types">
                            <i class="icon icon-type"></i>
                            <div class="title">结算方式</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/pay_types">
                            <i class="icon icon-bill"></i>
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
                        <router-link class="link" to="/customer/add">XXX</router-link>
                    </li>
                </ul>
            </Card>
            <Card class="admin-card">
                <p slot="title">报表中心</p>
                <ul class="admin-list3">
                    <li class="item">
                        <router-link class="link" to="/purchase_plans">采购计划汇总表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">采购计划明细表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/purchase_orders">采购订单汇总表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">采购订单明细表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/purchase_bills">采购开单汇总表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">采购开单明细表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">估价入库汇总表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">估价入库明细表</router-link>
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
