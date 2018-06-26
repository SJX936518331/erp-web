<template>
    <div class="">
        <Row>
            <Col class="admin-col" span="18">
                <Card class="admin-card">
                    <p slot="title">仓库管理</p>
                    <div class="admin-list">
                        <div class="item">
                            <router-link class="link" to="/storage_ios">
                                <i class="icon icon-bill"></i>
                                <div class="title">出入库单</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/storage_moves">
                                <i class="icon icon-bill"></i>
                                <div class="title">调拨单</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/storage_modify_prices">
                                <i class="icon icon-bill"></i>
                                <div class="title">调价单</div>
                            </router-link>
                        </div>
                        <!--<div class="item">-->
                            <!--<router-link class="link" to="/storage_combines">-->
                                <!--<i class="icon icon-bill"></i>-->
                                <!--<div class="title">拆卸单</div>-->
                            <!--</router-link>-->
                        <!--</div>-->
                        <div class="item">
                            <router-link class="link" to="/storage_checks">
                                <i class="icon icon-bill"></i>
                                <div class="title">盘点单</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/storage_changes">
                                <i class="icon icon-bill"></i>
                                <div class="title">库存变动单</div>
                            </router-link>
                        </div>
                        <!--<div class="item">-->
                            <!--<router-link class="link" to="/warehouseManage">-->
                                <!--<i class="icon icon-bill"></i>-->
                                <!--<div class="title">报损单</div>-->
                            <!--</router-link>-->
                        <!--</div>-->
                        <div class="item">
                            <router-link class="link" to="/warehouseManage">
                                <i class="icon icon-bill"></i>
                                <div class="title">其他收货</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/warehouseManage">
                                <i class="icon icon-bill"></i>
                                <div class="title">其他发货单</div>
                            </router-link>
                        </div>
                    </div>
                </Card>
                <Card class="admin-card">
                    <p slot="title">基础资料</p>
                    <ul class="admin-list2">
                        <li class="item">
                            <router-link class="link" to="/stores">
                                <i class="icon icon-store"></i>
                                <div class="title">仓库资料</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/store_locations">
                                <!--<i class="icon icon-store_locations"></i>-->
                                <i class="icon icon-stock"></i>
                                <div class="title">货位资料</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/products">
                                <i class="icon icon-product"></i>
                                <div class="title">产品资料</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/storage_io_types">
                                <i class="icon icon-type"></i>
                                <div class="title">出入库类型</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/logistics">
                                <i class="icon icon-bill"></i>
                                <div class="title">物流</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/warehouseManage">
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
                            <router-link class="link" to="/store/add">添加仓库</router-link>
                        </li>
                    </ul>
                </Card>
                <Card class="admin-card">
                    <p slot="title">报表中心</p>
                    <ul class="admin-list3">
                        <li class="item">
                            <router-link class="link" to="/stocks/total">库存汇总查询</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">分仓库存查询</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks/warning">库存预警查询</router-link>
                        </li>
                        <!--<li class="item">-->
                            <!--<router-link class="link" to="/stocks">账面库存汇总表</router-link>-->
                        <!--</li>-->
                        <!--<li class="item">-->
                            <!--<router-link class="link" to="/stocks">账面库存明细表</router-link>-->
                        <!--</li>-->
                        <!--<li class="item">-->
                            <!--<router-link class="link" to="/stocks">实际库存汇总表</router-link>-->
                        <!--</li>-->
                        <!--<li class="item">-->
                            <!--<router-link class="link" to="/stocks">实际库存明细表</router-link>-->
                        <!--</li>-->
                        <!--<li class="item">-->
                            <!--<router-link class="link" to="/stocks">仓库开单汇总表</router-link>-->
                        <!--</li>-->
                        <!--<li class="item">-->
                            <!--<router-link class="link" to="/stocks">仓库开单明细表</router-link>-->
                        <!--</li>-->
                        <!--<li class="item">-->
                            <!--<router-link class="link" to="/stocks">库存分类汇总表</router-link>-->
                        <!--</li>-->
                        <!--<li class="item">-->
                            <!--<router-link class="link" to="/stocks/warning">库存报警明细表</router-link>-->
                        <!--</li>-->
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
            console.log('获取仓库')
            console.log(this.$store)
            this.getData();
        },
        methods: {
            getData() {
            },
        }
    };
</script>
