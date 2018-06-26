<template>
    <div class="">
        <Row>
            <Col class="admin-col" span="18">
            <Card class="admin-card">
                <p slot="title">采购管理</p>
                <div class="admin-list">
                    <div class="item">
                        <router-link class="link" to="/sale_orders">
                            <i class="icon icon-bill"></i>
                            <div class="title">销售订单</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/sale_bills">
                            <i class="icon icon-bill"></i>
                            <div class="title">销售开单</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/sale_receives">
                            <i class="icon icon-bill"></i>
                            <div class="title">销售收款</div>
                        </router-link>
                    </div>
                    <!--<div class="item">-->
                        <!--<router-link class="link" to="/shop//storage_modify_prices">-->
                            <!--<i class="icon icon-bill"></i>-->
                            <!--<div class="title">现款销售</div>-->
                        <!--</router-link>-->
                    <!--</div>-->
                    <!--<div class="item">-->
                        <!--<router-link class="link" to="/store/storage_combins">-->
                            <!--<i class="icon icon-bill"></i>-->
                            <!--<div class="title">委托代销</div>-->
                        <!--</router-link>-->
                    <!--</div>-->
                    <!--<div class="item">-->
                        <!--<router-link class="link" to="/store/storage_combins">-->
                            <!--<i class="icon icon-bill"></i>-->
                            <!--<div class="title">代销结算</div>-->
                        <!--</router-link>-->
                    <!--</div>-->
                    <div class="item">
                        <router-link class="link" to="/sale_returns">
                            <i class="icon icon-bill"></i>
                            <div class="title">销售退货</div>
                        </router-link>
                    </div>
                </div>
            </Card>
            <Card class="admin-card">
                <p slot="title">基础资料</p>
                <ul class="admin-list2">
                    <li class="item">
                        <router-link class="link" to="/areas">
                            <i class="icon icon-bill"></i>
                            <div class="title">地区资料</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/customers">
                            <i class="icon icon-customer"></i>
                            <div class="title">客户资料</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/product_categories">
                            <i class="icon icon-type"></i>
                            <div class="title">产品类别</div>
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
                            <div class="title">收付款方式</div>
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
                        <router-link class="link" to="/customer/add">添加客户</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/area/add">添加地区</router-link>
                    </li>
                </ul>
            </Card>
            <Card class="admin-card">
                <p slot="title">报表中心</p>
                <ul class="admin-list3">
                    <li class="item">
                        <router-link class="link" to="/sale/customer">客户销售汇总表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">客户销售明细表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/sale/sku">商品销售汇总表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">商品销售明细表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/sale/business_user">业务员销售汇总表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">业务员销售明细表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/sale/branch">门店销售汇总表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">销售毛利汇总表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">销售毛利明细表</router-link>
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
