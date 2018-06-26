<template>
    <div>
        <Row>
            <Col class="admin-col" span="18">
            <Card class="admin-card">
                <p slot="title">固定资产</p>
                <ul class="admin-list">
                    <li class="item">
                        <router-link class="link" to="/asset/add">
                            <i class="icon icon-bill"></i>
                            <div class="title">资产增加</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/asset/minus">
                            <i class="icon icon-bill"></i>
                            <div class="title">资产减少</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/asset/io">
                            <i class="icon icon-bill"></i>
                            <div class="title">资产变动</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/workload/add">
                            <i class="icon icon-bill"></i>
                            <div class="title">工作量录入</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/finance/pay_types">
                            <i class="icon icon-bill"></i>
                            <div class="title">计提折旧</div>
                        </router-link>
                    </li>
                </ul>
            </Card>
            <Card class="admin-card">
                <p slot="title">基础资料</p>
                <ul class="admin-list2">
                    <li class="item">
                        <router-link class="link" to="/asset_types">
                            <i class="icon icon-bill"></i>
                            <div class="title">资产类别</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/asset_io_types">
                            <i class="icon icon-bill"></i>
                            <div class="title">增减方式</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/asset_use_types">
                            <i class="icon icon-bill"></i>
                            <div class="title">使用情况</div>
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
                        <router-link class="link" to="/asset_type/add">添加资产类型</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/asset_io_type/add">添加增减方式</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/department/add">添加部门</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/asset_use_type/add">添加使用情况</router-link>
                    </li>
                </ul>
            </Card>
            <Card class="admin-card">
                <p slot="title">报表中心</p>
                <ul class="admin-list3">
                    <li class="item">
                        <router-link class="link" to="/assets">固定资产清单</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/depreciations">固定资产折旧表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/wages">固定资产及累计折旧余额表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/workloads">累计工作量查询</router-link>
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
