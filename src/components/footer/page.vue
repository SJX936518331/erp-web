<template>
    <div class="foot">
        <p>粤Icp备:14276767号 @个人版权所有，侵权必定追究啦啦啦</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: {
        },
        methods: {
        }
    }
</script>

<style scoped>
    .foot {
        width: 100%;
        position: fixed;
        bottom: 0px;
        left: 0px;
        text-align: center;
        background-color: gray;
        /* 固定在底部的三种方式 */
        /* 方法1：使用CSS绝对定位
           position:absolute;
           bottom:0px;
           left:0px; */
        /* 方法2：使用CSS固定定位
           position:fixed;
           bottom:0px;
           left:0px;  */
        /* 方法3：使用Float浮动定位(适用于div是body元素的子元素)
           float:right;
           bottom:0px; */
        /* 固定在顶部的三种方式跟这三种没区别，类似 */
    }

    .foot p {
        display: inline-block;
        color: white;
        height: 50px;
        line-height: 50px;
    }
</style>
