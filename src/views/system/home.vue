<template>
    <div>
        <Row>
            <Col class="admin-col" span="18">
            <Card class="admin-card">
                <p slot="title">系统管理</p>
                <div class="admin-list">
                    <div class="item">
                        <router-link class="link" to="/roles">
                            <i class="icon icon-bill"></i>
                            <div class="title">角色设置</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/account_sets">
                            <i class="icon icon-bill"></i>
                            <div class="title">成员角色设置</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/account_sets">
                            <i class="icon icon-bill"></i>
                            <div class="title">职位角色设置</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/account_sets">
                            <i class="icon icon-bill"></i>
                            <div class="title">系统信息</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/account_sets">
                            <i class="icon icon-bill"></i>
                            <div class="title">修改密码</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/account_sets">
                            <i class="icon icon-bill"></i>
                            <div class="title">打印设置</div>
                        </router-link>
                    </div>
                </div>
            </Card>
            <Card class="admin-card">
                <p slot="title">基础资料</p>
                <ul class="admin-list2">
                </ul>
            </Card>
            <Card class="admin-card">
                <p slot="title">高级设置</p>
                <ul class="admin-list2">
                    <div class="item">
                        <router-link class="link" to="/account_sets">
                            <i class="icon icon-type"></i>
                            <div class="title">帐套</div>
                        </router-link>
                    </div>
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
                        <router-link class="link" to="/stocks">XXX</router-link>
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
