<template>
    <div class="">
        <Row>
            <Col class="admin-col" span="18">
                <Card class="admin-card">
                    <p slot="title">产品管理</p>
                    <div class="admin-list">
                        <div class="item">
                            <router-link class="link" to="/products">
                                <i class="icon icon-bill"></i>
                                <div class="title">产品</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/packages">
                                <i class="icon icon-bill"></i>
                                <div class="title">套餐</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/product_categories">
                                <i class="icon icon-bill"></i>
                                <div class="title">产品类型</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/units">
                                <i class="icon icon-bill"></i>
                                <div class="title">单位</div>
                            </router-link>
                        </div>
                    </div>
                </Card>
                <Card class="admin-card">
                    <p slot="title">基础资料</p>
                    <ul class="admin-list2">
                        <!--<li class="item">-->
                            <!--<router-link class="link" to="/stores">-->
                                <!--<i class="icon icon-store"></i>-->
                                <!--<div class="title">仓库资料</div>-->
                            <!--</router-link>-->
                        <!--</li>-->
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
