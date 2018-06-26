<template>
    <div class="home-main">
        <!--<span style="color:gray;font-size:20px;">{{userName}}</span>-->
        <!--</p>-->
        <!--<p style="padding:10px 0px 10px 20px;text-align:left;color:black;font-size:18px;">登录权限:-->
        <!--<span style="color:gray;font-size:20px;">{{type}}</span>-->
        <!--</p>-->
        <!--<p style="padding:10px 0px 10px 20px;text-align:left;color:black;font-size:18px;">登录时间:-->
        <!--<span style="color:gray;font-size:20px;">{{time}}</span>-->
        <!--</p>-->
        <!--</div>-->

        <Row>
            <Col class="admin-col" span="12">
            <div class="info">
                <div>
                    <span class="item">登录用户：{{ info.user }}</span>
                    <span class="item">分支机构：{{ info.branch.name }}{{ info.branch.id }}</span>
                    <span class="item">部门：{{ info.department }}</span>
                </div>
                <div>
                    <span class="item">帐套：{{ info.accountSet.name }}</span>
                    <span class="item">期间：{{ info.accountSet.cur_period_year }} 年第 {{ info.accountSet.cur_period_month }} 期</span>
                </div>
            </div>
            </Col>
        </Row>
        <Row>
            <Col class="admin-col" span="12">
            <Card class="admin-card">
                <p slot="title">供应链管理</p>
                <div class="admin-list2">
                    <div class="item">
                        <router-link class="link" to="/store/home">
                            <i class="icon icon-store"></i>
                            <div class="title">仓库管理</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/sale/home">
                            <i class="icon icon-sale"></i>
                            <div class="title">销售管理</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/purchase/home">
                            <i class="icon icon-purchase"></i>
                            <div class="title">采购管理</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/service/home">
                            <i class="icon icon-service"></i>
                            <div class="title">售后管理</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/shop/home">
                            <i class="icon icon-bill"></i>
                            <div class="title">产品管理</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/production/home">
                            <i class="icon icon-production"></i>
                            <div class="title">基本生产</div>
                        </router-link>
                    </div>
                </div>
            </Card>
            <!--<Card class="admin-card">-->
                <!--<p slot="title">生产管理</p>-->
                <!--<div class="admin-list2">-->
                    <!--<div class="item">-->
                        <!--<router-link class="link" to="/production/home">-->
                            <!--<i class="icon icon-production"></i>-->
                            <!--<div class="title">基本生产</div>-->
                        <!--</router-link>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</Card>-->
            <Card class="admin-card">
                <p slot="title">资金管理</p>
                <div class="admin-list2">
                    <div class="item">
                        <router-link class="link" to="/finance/home3">
                            <i class="icon icon-money"></i>
                            <div class="title">应收应付</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/bank/home">
                            <i class="icon icon-bank"></i>
                            <div class="title">现金银行</div>
                        </router-link>
                    </div>
                </div>
            </Card>
            <Card class="admin-card">
                <p slot="title">账务管理</p>
                <div class="admin-list2">
                    <div class="item">
                        <router-link class="link" to="/finance/home">
                            <i class="icon icon-finance"></i>
                            <div class="title">账务系统</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/finance/home2">
                            <i class="icon icon-cashier"></i>
                            <div class="title">出纳系统</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/asset/home">
                            <i class="icon icon-asset"></i>
                            <div class="title">固定资产</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/wage/home">
                            <i class="icon icon-wage"></i>
                            <div class="title">工资系统</div>
                        </router-link>
                    </div>
                </div>
            </Card>
            <Card class="admin-card">
                <p slot="title">企业管理</p>
                <div class="admin-list2">
                    <div class="item">
                        <router-link class="link" to="/hr/home2">
                            <i class="icon icon-company"></i>
                            <div class="title">分支机构</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/hr/home">
                            <i class="icon icon-hr"></i>
                            <div class="title">人力资源</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/oa/home">
                            <i class="icon icon-oa"></i>
                            <div class="title">办公管理</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/crm/home">
                            <i class="icon icon-customer"></i>
                            <div class="title">客户关系</div>
                        </router-link>
                    </div>
                    <div class="item">
                        <router-link class="link" to="/system/home">
                            <i class="icon icon-system"></i>
                            <div class="title">系统管理</div>
                        </router-link>
                    </div>
                </div>
            </Card>
            </Col>
            <Col class="admin-col" span="12">
            <Card class="admin-card">
                <p slot="title">公告</p>
                <ul class="notice-list">
                    <li class="item" v-for="notice in notices">
                        <router-link class="link" :to="'/notices/' + notice.id">
                            {{ notice.title }}
                            <span class="time">{{ notice.create_time }}</span>
                        </router-link>
                    </li>
                </ul>
            </Card>
            </Col>
        </Row>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                notices: [],
                info: {
                    user: '',
                    branch: '',
                    accountSet: {},
                }
            };
        },
        mounted() {
            this.info = {
                user: this.$util.getUser().name,
                branch: this.$util.getBranch(),
                department: this.$util.getDepartment().name,
                accountSet: this.$util.getAccountSet(),
            }
            // 查询公告
            this.$http.get(`/notice/all?page_size=8`).then(
                response => {
                    let data = response.data
                    this.notices = data.data
                    console.log(this.notices)
                },
                response => {
                    console.log(response)
                }
            )
        },
        methods: {
        },
    };
</script>


<style lang="less" scoped>
    .info {
        margin-bottom: 16px;
        .item {
            margin-right: 16px;
        }
    }
    .company-name {
        margin: 16px 0;
        font-size: 32px;
        text-align: center;
    }
    .notice-list {
        .item {
            margin-bottom: 8px;
        }
        .link {
            color: #666;
        }
        .time {
            margin-left: 16px;
            color: #999;
        }
    }
</style>