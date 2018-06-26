<template>
    <div class="">
        <Row>
            <Col class="admin-col" span="18">
            <Card class="admin-card">
                <p slot="title">基本生产</p>
                <div class="admin-list">
                    <div class="item">
                        <router-link class="link" to="/bom">
                            <i class="icon icon-bill"></i>
                            <div class="title">BOM 清单</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/purchase/purchase_plans">
                            <i class="icon icon-bill"></i>
                            <div class="title">MRP 运算</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/purchase/purchase_orders">
                            <i class="icon icon-bill"></i>
                            <div class="title">生产任务单</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/picks">
                            <i class="icon icon-bill"></i>
                            <div class="title">领料单</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/storage_returns">
                            <i class="icon icon-bill"></i>
                            <div class="title">退料单</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/purchase/purchase_orders">
                            <i class="icon icon-bill"></i>
                            <div class="title">产品进仓</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/purchase/purchase_orders">
                            <i class="icon icon-store"></i>
                            <div class="title">产品仓库</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/purchase/purchase_orders">
                            <i class="icon icon-bill"></i>
                            <div class="title">组装模板</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/storage_combines">
                            <i class="icon icon-bill"></i>
                            <div class="title">组装拆卸单</div>
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
                        <router-link class="link" to="/customers">
                            <i class="icon icon-stock"></i>
                            <div class="title">分仓库存</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/storage_io_types">
                            <i class="icon icon-type"></i>
                            <div class="title">库存变动类型</div>
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
                    <li class="item">
                        <router-link class="link" to="/product/add">添加产品</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/user/add">添加员工</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/product/add">业务查找</router-link>
                    </li>
                </ul>
            </Card>
            <Card class="admin-card">
                <p slot="title">报表中心</p>
                <ul class="admin-list3">
                    <li class="item">
                        <router-link class="link" to="/stocks">账面库存汇总表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">账面库存明细表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">账面库存数量汇总表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">账面库存数量明细表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">实际库存数量汇总表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">实际库存数量分类表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">实际库存数量明细表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/stocks">分仓库存报表</router-link>
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
