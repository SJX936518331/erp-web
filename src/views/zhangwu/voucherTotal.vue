<template>
    <!--凭证汇总表-->
    <my-quick-table
            :addAble="false"
            url="/voucher/total"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "科目编号",
                        key: "account_code",
                        width: 160
                    },
                    {
                        title: "科目名称",
                        key: "account_name",
                        width: 160
                    },
                    {
                        title: "借方金额",
                        key: "total_in_price",
                        width: 160
                    },
                    {
                        title: "贷方金额",
                        key: "total_out_price",
                        width: 160
                    }
                ],
            }
        },
        mounted() {
        },
        methods: {
        }
    }
</script>
