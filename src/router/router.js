import Main from '@/views/Main.vue';
// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@/views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    title: "家",
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') },

        // 公司
        { path: '/companies', title: '公司', name: 'companies', icon: 'ribbon-b', component: () => import('@/views/hr/company.vue') },
        { path: '/companies/:id/edit', title: '公司', name: 'company', icon: 'ribbon-b', component: () => import('@/views/hr/companyEdit.vue') },
        // 部门
        { path: '/departments/:id', title: '部门详情', name: 'department_detail', icon: 'ribbon-b', component: () => import('@/views/hr/departmentDetail.vue') },
        { path: '/departments/:id/edit', title: '部门编辑', name: 'departmentEdit', icon: 'ribbon-b', component: () => import('@/views/hr/departmentEdit.vue') },
        { path: '/department/add', title: '添加部门', name: 'departmentEdit', icon: 'ribbon-b', component: () => import('@/views/hr/departmentEdit.vue') },
        // 员工
        { path: '/users', title: '员工', name: 'employee', icon: 'trophy', component: () => import('@/views/hr/user.vue') },
        { path: '/users/:id/edit', title: '员工编辑', name: 'employeeEdit', icon: 'trophy', component: () => import('@/views/hr/userEdit.vue') },
        { path: '/user/add', title: '添加员工', name: 'departmentAdd', icon: 'ribbon-b', component: () => import('@/views/hr/userEdit.vue') },
        // 职位
        { path: '/positions', title: '职位', name: 'positions', icon: 'trophy', component: () => import('@/views/hr/position.vue') },
        { path: 'position/add', title: '添加职位', name: 'positions_add', icon: 'trophy', component: () => import('@/views/hr/positionEdit.vue') },
        { path: 'positions/:id/edit', title: '职位编辑', name: 'positions_edit', icon: 'trophy', component: () => import('@/views/hr/positionEdit.vue') },
        // 角色
        { path: '/roles', title: '角色', name: 'roles', icon: 'trophy', component: () => import('@/views/hr/role.vue') },
        { path: '/roles/:id/edit', title: '角色编辑', name: 'roleEdit', icon: 'trophy', component: () => import('@/views/hr/roleEdit.vue') },
        { path: '/role/add', title: '添加角色', name: 'roleAdd', icon: 'trophy', component: () => import('@/views/hr/roleEdit.vue') },
        // 仓库
        { path: '/stores', title: '仓库管理', name: 'stores', icon: 'home', component: () => import('@/views/store/store.vue') },
        { path: '/stores/:id/edit', title: '仓库编辑', name: 'storeEdit', icon: 'trophy', component: () => import('@/views/store/storeEdit.vue') },
        { path: '/store/add', title: '添加仓库', name: 'storeAdd', icon: 'trophy', component: () => import('@/views/store/storeEdit.vue') },
        // 货位
        { path: '/store_locations', title: '货位管理', name: 'store_locations', icon: 'home', component: () => import('@/views/store/storeLocation.vue') },
        { path: '/store_locations/:id/edit', title: '货位管理编辑', name: 'store_locations_edit', icon: 'home', component: () => import('@/views/store/storeLocationEdit.vue') },
        { path: '/store_location/add', title: '添加货位管理', name: 'store_locations_add', icon: 'home', component: () => import('@/views/store/storeLocationEdit.vue') },
        // 商城
        { path: '/shop/home', title: '产品管理', name: 'shop_home', icon: 'trophy', component: () => import('@/views/shop/home.vue') },
        // 套餐
        { path: '/packages', title: '套餐管理', name: 'package', icon: 'man', component: () => import('@/views/shop/package.vue') },
        { path: '/packages/:id/edit', title: '套餐编辑', name: 'packageEdit', icon: 'man', component: () => import('@/views/shop/packageEdit.vue') },
        { path: '/package/add', title: '添加套餐', name: 'packageAdd', icon: 'man', component: () => import('@/views/shop/packageEdit.vue') },
        // 产品
        { path: '/products', title: '产品管理', name: 'product', icon: 'person', component: () => import('@/views/shop/product.vue') },
        { path: '/products/:id/edit', title: '产品编辑', name: 'productEdit', icon: 'man', component: () => import('@/views/shop/productEdit.vue') },
        { path: '/product/add', title: '添加产品', name: 'productAdd', icon: 'man', component: () => import('@/views/shop/productEdit.vue') },
        // 产品分类
        { path: '/product_categories', title: '产品分类管理', name: 'productCategory', icon: 'person', component: () => import('@/views/shop/productCategory.vue') },
        { path: 'product_categories/:id/edit', title: '产品分类编辑', name: 'productCategoryEdit', icon: 'person', component: () => import('@/views/shop/productCategoryEdit.vue') },
        { path: 'product_category/add', title: '添加产品分类', name: 'productCategoryAdd', icon: 'person', component: () => import('@/views/shop/productCategoryEdit.vue') },
        // 产品单位
        { path: '/units', title: '产品单位', name: 'units', icon: 'person', component: () => import('@/views/shop/unit.vue') },
        { path: '/units/:id/edit', title: '单位编辑', name: 'unitEdit', icon: 'man', component: () => import('@/views/shop/unitEdit.vue') },
        { path: '/unit/add', title: '添加单位', name: 'unitAdd', icon: 'man', component: () => import('@/views/shop/unitEdit.vue') },
        // 公告
        { path: '/notices', title: '公告', name: 'notice', icon: 'compose', component: () => import('@/views/oa/notice.vue') },
        { path: '/notices/:id', title: '公告详情', name: 'noticeDetail', icon: 'compose', component: () => import('@/views/oa/noticeDetail.vue') },
        { path: '/notices/:id/edit', title: '公告编辑', name: 'noticeEdit', icon: 'compose', component: () => import('@/views/oa/noticeEdit.vue') },
        { path: '/notice/add', title: '添加公告', name: 'notice_add', icon: 'ios-pricetags', component: () => import('@/views/oa/noticeEdit.vue') },
        // 科目
        { path: '/accounts', title: '会计科目', name: 'accounts', icon: 'person-stalker', component: () => import('@/views/finance/account.vue') },
        { path: '/accounts/:id/edit', title: '会计科目编辑', name: 'accounts_edit', icon: 'person-stalker', component: () => import('@/views/finance/accountEdit.vue') },
        { path: '/account/add', title: '添加会计科目', name: 'accounts_add', icon: 'person-stalker', component: () => import('@/views/finance/accountEdit.vue') },
        // 科目统计
        { path: '/account_balances', title: '科目余额表', name: 'account_balances', icon: 'person-stalker', component: () => import('@/views/zhangwu/accountBalance.vue') },
        { path: 'account_balances_edit', title: '期初', name: 'account_balances_edit', icon: 'person-stalker', component: () => import('@/views/zhangwu/accountBalanceEdit.vue') },
        //
        { path: '/finance_index', title: '往来单位应收付', name: 'finance_index', icon: 'social-yen', component: () => import('@/views/financialManagement/finance_index/index.vue'), },
        { path: '/finance_detail', title: '应收付明细', name: 'finance_detail', icon: 'ios-book', component: () => import('@/views/financialManagement/finance_detail/detail.vue') },
        // { path: 'finance_index', title: '往来单位应收付', name: 'finance_index', icon: 'social-yen', component: () => import('@/views/finance/finance_index/index.vue'), },
        // { path: 'finance_detail', title: '应收付明细', name: 'finance_detail', icon: 'ios-book', component: () => import('@/views/finance/finance_detail/detail.vue') },
        // { path: 'receipt', title: '收款单', name: 'receipt', icon: 'arrow-graph-up-right', component: () => import('@/views/finance/receipt/receiptAdd.vue') },
        // { path: 'payment', title: '付款单', name: 'payment', icon: 'arrow-graph-down-right', component: () => import('@/views/finance/payment/paymentAdd.vue') },
        // 工资单
        { path: '/wages', title: '工资单', name: 'wages', icon: 'compose', component: () => import('@/views/wage/wage.vue') },
        { path: '/wage/add', title: '添加工资单', name: 'wageAdd', icon: 'compose', component: () => import('@/views/wage/wageEdit.vue') },
        { path: '/wages/:id/edit', title: '工资单编辑', name: 'wageEdit', icon: 'compose', component: () => import('@/views/wage/wageEdit.vue') },
        // 工资表
        { path: '/wage_items', title: '工资汇总查询', name: 'wage_items', icon: 'compose', component: () => import('@/views/wage/wageItem.vue') },
        // 计件工种
        { path: '/work_types', title: '计件工种', name: 'work_types', icon: 'compose', component: () => import('@/views/wage/workType.vue') },
        { path: '/work_types/:id/edit', title: '计件工种编辑', name: 'work_types_edit', icon: 'compose', component: () => import('@/views/wage/workTypeEdit.vue') },
        { path: '/work_type/add', title: '添加计件工种', name: 'work_types_add', icon: 'compose', component: () => import('@/views/wage/workTypeEdit.vue') },
        // 计件工序
        { path: '/work_processes', title: '计件工序', name: 'work_processes', icon: 'compose', component: () => import('@/views/wage/workProcess.vue') },
        { path: '/work_processes/:id/edit', title: '计件工序编辑', name: 'work_processes_edit', icon: 'compose', component: () => import('@/views/wage/workProcessEdit.vue') },
        { path: '/work_process/add', title: '添加计件工序', name: 'work_processes_add', icon: 'compose', component: () => import('@/views/wage/workProcessEdit.vue') },
        // 工资项目
        { path: '/wage_types', title: '工资项目', name: 'wage_types', icon: 'compose', component: () => import('@/views/wage/wageType.vue') },
        { path: '/wage_types/:id/edit', title: '工资项目编辑', name: 'wage_types_edit', icon: 'compose', component: () => import('@/views/wage/wageTypeEdit.vue') },
        { path: '/wage_type/add', title: '添加工资项目', name: 'wage_types_add', icon: 'compose', component: () => import('@/views/wage/wageTypeEdit.vue') },
        // 计件工资
        { path: '/piecework_wages', title: '计件工资', name: 'piecework_wages', icon: 'compose', component: () => import('@/views/wage/pieceworkWage.vue') },
        { path: '/piecework_wages/:id/edit', title: '计件工资编辑', name: 'piecework_wages_edit', icon: 'compose', component: () => import('@/views/wage/pieceworkWageEdit.vue') },
        { path: '/piecework_wage/add', title: '添加计件工资', name: 'piecework_wages_add', icon: 'compose', component: () => import('@/views/wage/pieceworkWageEdit.vue') },
        { path: '/piecework_wage_items/:id/edit', title: '计件工资编辑', name: 'piecework_wages_edit', icon: 'compose', component: () => import('@/views/wage/pieceworkWageEdit.vue') },
        { path: '/piecework_wage_items/:id/edit', title: '计件工资编辑', name: 'piecework_wages_edit', icon: 'compose', component: () => import('@/views/wage/pieceworkWageEdit.vue') },
        // 出入库类型
        { path: '/storage_io_types', title: '出入库类型', name: 'storage_io_type', icon: 'information', component: () => import('@/views/store/storageIoType.vue') },
        { path: '/storage_io_types/:id/edit', title: '出入库类型编辑', name: 'storage_io_type_edit', icon: 'information', component: () => import('@/views/store/storageIoTypeEdit.vue') },
        { path: '/storage_io_type/add', title: '添加出入库类型', name: 'storage_io_type_add', icon: 'information', component: () => import('@/views/store/storageIoTypeEdit.vue') },
        // 出入库单
        { path: '/storage_ios', title: '出入库单', name: 'storage_io', icon: 'information', component: () => import('@/views/store/storageIo.vue') },
        { path: '/storage_ios/:id', title: '出入库单详情', name: 'storage_io_detail', icon: 'information', component: () => import('@/views/store/storageIoEdit.vue') },
        { path: '/storage_ios/:id/edit', title: '出入库单编辑', name: 'storage_io_edit', icon: 'information', component: () => import('@/views/store/storageIoEdit.vue') },
        { path: '/storage_io/add', title: '添加出入库单', name: 'storage_io_add', icon: 'information', component: () => import('@/views/store/storageIoEdit.vue') },
        // 库存变动
        { path: '/storage_changes', title: '库存变动单', name: 'storage_change', icon: 'information', component: () => import('@/views/store/storageChange.vue') },
        { path: '/storage_changes/:id/edit', title: '库存变动单编辑', name: 'storage_change_edit', icon: 'information', component: () => import('@/views/store/storageChangeEdit.vue') },
        { path: '/storage_change/add', title: '添加库存变动单', name: 'storage_change_add', icon: 'information', component: () => import('@/views/store/storageChangeEdit.vue') },
        // 领料单
        { path: '/picks', title: '领料单', name: 'picks', icon: 'information', component: () => import('@/views/store/pick.vue') },
        { path: '/picks/:id/edit', title: '领料单编辑', name: 'picks_edit', icon: 'information', component: () => import('@/views/store/pickEdit.vue') },
        { path: '/pick/add', title: '调价领料单', name: 'picks_add', icon: 'information', component: () => import('@/views/store/pickEdit.vue') },
        // 退料单
        { path: '/storage_returns', title: '退料单', name: 'storage_returns', icon: 'information', component: () => import('@/views/store/storageReturn.vue') },
        { path: '/storage_returns/:id/edit', title: '退料单编辑', name: 'storage_returns_edit', icon: 'information', component: () => import('@/views/store/storageReturnEdit.vue') },
        { path: '/storage_return/add', title: '调价退料单', name: 'storage_returns_add', icon: 'information', component: () => import('@/views/store/storageReturnEdit.vue') },
        // 组装拆卸
        { path: '/storage_combines', title: '组装拆卸单', name: 'storage_combins', icon: 'information', component: () => import('@/views/store/storageCombine.vue') },
        { path: '/storage_combines/:id/edit', title: '组装拆卸单编辑', name: 'storage_combins_edit', icon: 'information', component: () => import('@/views/store/storageCombineEdit.vue') },
        { path: '/storage_combine/add', title: '添加组装拆卸单', name: 'storage_combins_add', icon: 'information', component: () => import('@/views/store/storageCombineEdit.vue') },
        // 库存查询
        { path: '/stocks', title: '分仓库存查询', name: 'stock', icon: 'home', component: () => import('@/views/store/stock.vue') },
        { path: '/stocks/warning', title: '库存预警查询', name: 'stock_warning', icon: 'home', component: () => import('@/views/store/stockWarning.vue') },
        { path: '/stocks/total', title: '库存汇总查询', name: 'stock_total', icon: 'home', component: () => import('@/views/store/stockTotal.vue') },
        // 未整理
        { path: '/reportLoss', title: '报损单', name: 'reportLoss', icon: 'information', component: () => import('@/views/store/reportLoss/reportLoss.vue') },
        { path: '/reportLossEdit', title: '报损单编辑', name: 'reportLossEdit', icon: 'edit', component: () => import('@/views/store/reportLossEdit/reportLossEdit.vue') },
        //调拨单
        { path: '/storage_moves', title: '调拨单', name: 'storage_move', icon: 'information', component: () => import('@/views/store/storageMove.vue') },
        { path: '/storage_move/add', title: '添加调拨单', name: 'storage_move_add', icon: 'information', component: () => import('@/views/store/storageMoveEdit.vue') },
        { path: '/storage_moves/:id/edit', title: '调拨单编辑', name: 'storage_move_edit', icon: 'information', component: () => import('@/views/store/storageMoveEdit.vue') },
        { path: '/storage_moves/:id', title: '调拨单详情', name: 'storage_move_detail', icon: 'information', component: () => import('@/views/store/storageMoveEdit.vue') },
        //盘点单
        { path: '/storage_checks', title: '盘点单', name: 'storage_check', icon: 'information', component: () => import('@/views/store/storageCheck.vue') },
        { path: 'storage_check/add', title: '添加盘点单', name: 'storage_check_add', icon: 'information', component: () => import('@/views/store/storageCheckEdit.vue') },
        { path: 'storage_checks/:id/edit', title: '盘点单编辑', name: 'storage_check_edit', icon: 'information', component: () => import('@/views/store/storageCheckEdit.vue') },
        // 调价
        { path: '/storage_modify_prices', title: '调价单', name: 'storage_modify_price', icon: 'information', component: () => import('@/views/store/storageModifyPrice.vue') },
        { path: 'storage_modify_prices/:id/edit', title: '调价单编辑', name: 'storage_modify_prices_edit', icon: 'information', component: () => import('@/views/store/storageModifyPriceEdit.vue') },
        { path: 'storage_modify_price/add', title: '添加调价单', name: 'storage_modify_prices_add', icon: 'information', component: () => import('@/views/store/storageModifyPriceEdit.vue') },
        //物流
        { path: '/logistics', title: '物流', name: 'logistics', icon: 'information', component: () => import('@/views/store/logistics.vue') },
        { path: '/logistics/add', title: '添加物流', name: 'logistics_add', icon: 'information', component: () => import('@/views/store/logisticsEdit.vue') },
        { path: '/logisticses/:id/edit', title: '物流编辑', name: 'logistics_edit', icon: 'information', component: () => import('@/views/store/logisticsEdit.vue') },
        // 收支类型
        { path: '/balance_io_types', title: '收支类型', name: 'balance_io_types', icon: 'person-stalker', component: () => import('@/views/finance/balanceIoType.vue') },
        { path: 'balance_io_type/add', title: '添加收支类型', name: 'balanceIoTypeAdd', icon: 'person-stalker', component: () => import('@/views/finance/balanceIoTypeEdit.vue') },
        { path: 'balance_io_types/:id/edit', title: '收支类型编辑', name: 'balanceIoTypeEdit', icon: 'person-stalker', component: () => import('@/views/finance/balanceIoTypeEdit.vue') },
        // 支付类型
        { path: '/pay_types', title: '支付类型', name: 'pay_types', icon: 'person-stalker', component: () => import('@/views/finance/payType.vue') },
        { path: 'pay_type/add', title: '添加支付类型', name: 'pay_type_add', icon: 'person-stalker', component: () => import('@/views/finance/payTypeEdit.vue') },
        { path: 'pay_types/:id/edit', title: '支付类型编辑', name: 'pay_type_edit', icon: 'person-stalker', component: () => import('@/views/finance/payTypeEdit.vue') },
        // 供应商
        { path: '/suppliers', title: '供应商', name: 'suppliers', icon: 'ios-pricetags', component: () => import('@/views/crm/supplier.vue') },
        { path: '/suppliers/:id/edit', title: '供应商编辑', name: 'suppliers_edit', icon: 'ios-pricetags', component: () => import('@/views/crm/supplierEdit.vue') },
        { path: '/supplier/add', title: '添加供应商', name: 'suppliers_add', icon: 'ios-pricetags', component: () => import('@/views/crm/supplierEdit.vue') },
        // 供应商类型
        { path: '/supplier_types', title: '供应商类型', name: 'supplier_types', icon: 'ios-pricetags', component: () => import('@/views/crm/supplierType.vue') },
        { path: '/supplier_types/:id/edit', title: '供应商类型', name: 'supplier_types_edit', icon: 'ios-pricetags', component: () => import('@/views/crm/supplierTypeEdit.vue') },
        { path: '/supplier_type/add', title: '添加供应商', name: 'supplier_types_add', icon: 'ios-pricetags', component: () => import('@/views/crm/supplierTypeEdit.vue') },
        // 客户
        { path: '/customers', title: '客户', name: 'customers', icon: 'ios-pricetags', component: () => import('@/views/crm/customer.vue') },
        { path: '/customers/:id/edit', title: '客户编辑', name: 'customer_edit', icon: 'ios-pricetags', component: () => import('@/views/crm/customerEdit.vue') },
        { path: '/customer/add', title: '添加客户', name: 'customer_add', icon: 'ios-pricetags', component: () => import('@/views/crm/customerEdit.vue') },
        // 客户类型
        { path: '/customer_types', title: '客户类型编辑', name: 'customer_types', icon: 'compose', component: () => import('@/views/crm/customerType.vue') },
        { path: '/customer_types/:id/edit', title: '客户类型编辑', name: 'customer_types_edit', icon: 'compose', component: () => import('@/views/crm/customerTypeEdit.vue') },
        { path: '/customer_type/add', title: '添加客户类型', name: 'customer_types_add', icon: 'compose', component: () => import('@/views/crm/customerTypeEdit.vue') },
        // 回访类型
        { path: '/visit_types', title: '回访类型', name: 'visit_types', icon: 'compose', component: () => import('@/views/crm/visitType.vue') },
        { path: '/visit_types/:id/edit', title: '回访类型编辑', name: 'visit_types_edit', icon: 'compose', component: () => import('@/views/crm/visitTypeEdit.vue') },
        { path: '/visit_type/add', title: '添加回访类型', name: 'visit_types_add', icon: 'compose', component: () => import('@/views/crm/visitTypeEdit.vue') },
        // 回访记录
        { path: 'customer_visit/add', title: '添加回访记录', name: 'customer_visits_add', icon: 'compose', component: () => import('@/views/crm/customerVisitEdit.vue') },
        { path: 'customer_visits/:id/edit', title: '回访记录编辑', name: 'customer_visits_edit', icon: 'compose', component: () => import('@/views/crm/customerVisitEdit.vue') },
        // 地区
        { path: '/areas', title: '地区', name: 'areas', icon: 'ios-pricetags', component: () => import('@/views/crm/area.vue') },
        { path: '/city/add', title: '添加市', name: 'city_add', icon: 'ios-pricetags', component: () => import('@/views/crm/cityEdit.vue') },
        // 行业
        { path: '/industries', title: '行业', name: 'industries', icon: 'ios-pricetags', component: () => import('@/views/crm/industry.vue') },
        { path: '/industries/:id/edit', title: '行业编辑', name: 'industries_edit', icon: 'ios-pricetags', component: () => import('@/views/crm/industryEdit.vue') },
        { path: '/industry/add', title: '添加行业', name: 'industries_add', icon: 'ios-pricetags', component: () => import('@/views/crm/industryEdit.vue') },
        // 部门
        { path: '/departments', title: '部门', name: 'department', icon: 'ribbon-b', component: () => import('@/views/hr/department.vue') },
        { path: '/departments/:id', title: '部门详情', name: 'department_detail', icon: 'ribbon-b', component: () => import('@/views/hr/departmentDetail.vue') },
        { path: '/departments/:id/edit', title: '部门编辑', name: 'departmentEdit', icon: 'ribbon-b', component: () => import('@/views/hr/departmentEdit.vue') },
        { path: '/department/add', title: '添加部门', name: 'departmentEdit', icon: 'ribbon-b', component: () => import('@/views/hr/departmentEdit.vue') },
        // 分支机构
        { path: '/branchs', title: '分支机构', name: 'branch', icon: 'compose', component: () => import('@/views/hr/branch.vue') },
        { path: '/branchs/:id/edit', title: '编辑机构分支', name: 'branch_edit', icon: 'ios-pricetags', component: () => import('@/views/hr/branchEdit.vue') },
        { path: '/branch/add', title: '添加机构分支', name: 'branch_add', icon: 'ios-pricetags', component: () => import('@/views/hr/branchEdit.vue') },
        // 帐套
        { path: '/account_sets', title: '帐套', name: 'account_sets', icon: 'compose', component: () => import('@/views/system/accountSet.vue') },
        { path: '/account_sets/:id/edit', title: '帐套编辑', name: 'account_sets_edit', icon: 'compose', component: () => import('@/views/system/accountSetEdit.vue') },
        { path: '/account_set/add', title: '添加帐套', name: 'account_sets_add', icon: 'compose', component: () => import('@/views/system/accountSetEdit.vue') },
        // 日志
        { path: '/work_logs', title: '日志', name: 'log_', icon: 'ios-pricetags', component: () => import('@/views/oa/workLog.vue') },
        { path: '/work_logs/:id/edit', title: '日志编辑', name: 'log_edit', icon: 'ios-pricetags', component: () => import('@/views/oa/workLogEdit.vue') },
        { path: '/work_log/add', title: '添加日志', name: 'log_add', icon: 'ios-pricetags', component: () => import('@/views/oa/workLogEdit.vue') },
        // 申请
        { path: '/applies', title: '申请', name: 'apply', icon: 'ios-pricetags', component: () => import('@/views/oa/apply.vue') },
        { path: '/applies/:id/edit', title: '申请编辑', name: 'apply_edit', icon: 'ios-pricetags', component: () => import('@/views/oa/applyEdit.vue') },
        { path: '/apply/add', title: '添加申请', name: 'apply_add', icon: 'ios-pricetags', component: () => import('@/views/oa/applyEdit.vue') },
        // 申请类型
        { path: '/apply_types/', title: '申请类型', name: 'apply_types', icon: 'compose', component: () => import('@/views/oa/applyType.vue') },
        { path: '/apply_types/:id/edit', title: '申请类型编辑', name: 'apply_types_edit', icon: 'compose', component: () => import('@/views/oa/applyTypeEdit.vue') },
        { path: '/apply_type/add', title: '添加申请类型', name: 'apply_types_add', icon: 'compose', component: () => import('@/views/oa/applyTypeEdit.vue') },
        // 现金银行
        { path: 'banks', title: '现金银行', name: 'banks', icon: 'person-stalker', component: () => import('@/views/finance/bank.vue') },
        { path: '/bank/add', title: '添加现金银行', name: 'cashBank_add', icon: 'ios-pricetags', component: () => import('@/views/finance//bankEdit.vue') },
        { path: '/banks/:id/edit', title: '现金银行编辑', name: 'cashBank_edit', icon: 'ios-pricetags', component: () => import('@/views/finance//bankEdit.vue') },
        // 银行存取款单
        { path: 'bank_ios', title: '银行存取款单', name: 'bank_ios', icon: 'person-stalker', component: () => import('@/views/finance/bankIo.vue') },
        { path: 'bank_ios/:id/edit', title: '银行存取款单编辑', name: 'bank_ios_edit', icon: 'person-stalker', component: () => import('@/views/finance/bankIoEdit.vue') },
        { path: 'bank_io/add', title: '添加银行存取款单', name: 'bank_ios_add', icon: 'person-stalker', component: () => import('@/views/finance/bankIoEdit.vue') },
        // 日记账
        { path: 'journal/add', title: '日记账录入', name: 'journal_add', icon: 'person-stalker', component: () => import('@/views/cashier/journalEdit.vue') },
        // 单据
        { path: 'bills', title: '票据', name: 'bills', icon: 'person-stalker', component: () => import('@/views/zhangwu/bill.vue') },
        { path: 'bills/:id/edit', title: '票据编辑', name: 'bills_edit', icon: 'person-stalker', component: () => import('@/views/zhangwu/billEdit.vue') },
        { path: 'bill/add', title: '添加票据', name: 'bills_add', icon: 'person-stalker', component: () => import('@/views/zhangwu/billEdit.vue') },
        // 凭证
        { path: 'vouchers', title: '凭证', name: 'vouchers', icon: 'person-stalker', component: () => import('@/views/zhangwu/voucher.vue') },
        { path: 'vouchers/:id/edit', title: '凭证编辑', name: 'vouchers_edit', icon: 'person-stalker', component: () => import('@/views/zhangwu/voucherEdit.vue') },
        { path: 'voucher/add', title: '添加凭证', name: 'vouchers_add', icon: 'person-stalker', component: () => import('@/views/zhangwu/voucherEdit.vue') },
        //

        // 凭证报表
        { path: 'voucher/total', title: '凭证汇总表', name: 'voucher_total', icon: 'person-stalker', component: () => import('@/views/zhangwu/voucherTotal.vue') },
        // 凭证类型
        { path: 'voucher_types', title: '凭证类型', name: 'voucher_types', icon: 'person-stalker', component: () => import('@/views/zhangwu/voucherType.vue') },
        { path: 'voucher_types/:id/edit', title: '凭证类型编辑', name: 'voucher_types_edit', icon: 'person-stalker', component: () => import('@/views/zhangwu/voucherTypeEdit.vue') },
        { path: 'voucher_type/add', title: '添加凭证类型', name: 'voucher_types_add', icon: 'person-stalker', component: () => import('@/views/zhangwu/voucherTypeEdit.vue') },
        // 凭证摘要
        { path: 'voucher_summaries', title: '凭证摘要', name: 'voucher_summaries', icon: 'person-stalker', component: () => import('@/views/zhangwu/voucherSummary.vue') },
        { path: 'voucher_summaries/:id/edit', title: '凭证摘要编辑', name: 'voucher_summaries_edit', icon: 'person-stalker', component: () => import('@/views/zhangwu/voucherSummaryEdit.vue') },
        { path: 'voucher_summary/add', title: '添加凭证摘要', name: 'voucher_summaries_add', icon: 'person-stalker', component: () => import('@/views/zhangwu/voucherSummaryEdit.vue') },
        // 凭证摘要类型
        { path: 'voucher_summary_types', title: '凭证摘要类型', name: 'voucher_summary_types', icon: 'person-stalker', component: () => import('@/views/zhangwu/voucherSummaryType.vue') },
        { path: 'voucher_summary_types/:id/edit', title: '凭证摘要类型编辑', name: 'voucher_summary_types_edit', icon: 'person-stalker', component: () => import('@/views/zhangwu/voucherSummaryTypeEdit.vue') },
        { path: 'voucher_summary_type/add', title: '添加凭证摘要类型', name: 'voucher_summary_types_add', icon: 'person-stalker', component: () => import('@/views/zhangwu/voucherSummaryTypeEdit.vue') },
        // 凭证模板
        { path: '/voucher_templates', title: '凭证模板', name: 'voucher_templates', icon: 'social-usd-outline', component: () => import('@/views/zhangwu/voucherTemplate.vue') },
        // 凭证模板类型
        { path: '/voucher_template_types', title: '凭证模板类型', name: 'voucher_template_types', icon: 'social-usd-outline', component: () => import('@/views/zhangwu/voucherTemplateType.vue') },
        { path: '/voucher_template_types/:id/edit', title: '凭证模板类型编辑', name: 'voucher_template_types_edit', icon: 'social-usd-outline', component: () => import('@/views/zhangwu/voucherTemplateTypeEdit.vue') },
        { path: '/voucher_template_type/add', title: '添加凭证模板类型', name: 'voucher_template_types_add', icon: 'social-usd-outline', component: () => import('@/views/zhangwu/voucherTemplateTypeEdit.vue') },
        // 币种
        { path: 'currencies', title: '币种', name: 'currencies', icon: 'person-stalker', component: () => import('@/views/finance/currency.vue') },
        { path: 'currencies/:id/edit', title: '币种编辑', name: 'currencies_edit', icon: 'person-stalker', component: () => import('@/views/finance/currencyEdit.vue') },
        { path: 'currency/add', title: '添加币种', name: 'currencies_add', icon: 'person-stalker', component: () => import('@/views/finance/currencyEdit.vue') },
        // 销售订单
        { path: '/sale_orders', title: '销售订单', name: 'sale_orders', icon: 'information', component: () => import('@/views/salesSystem/saleOrder.vue') },
        { path: '/sale_orders/:id/edit', title: '销售订单编辑', name: 'sale_orders_edit', icon: 'information', component: () => import('@/views/salesSystem/saleOrderEdit.vue') },
        { path: '/sale_order/add', title: '添加销售订单', name: 'sale_orders_add', icon: 'information', component: () => import('@/views/salesSystem/saleOrderEdit.vue') },
        // 销售统计
        { path: '/sale/customer', title: '客户销售汇总表', name: 'sale_customer', icon: 'information', component: () => import('@/views/salesSystem/saleCustomer.vue') },
        { path: '/sale/business_user', title: '业务员销售汇总表', name: 'sale_business_user', icon: 'information', component: () => import('@/views/salesSystem/saleBusinessUser.vue') },
        { path: '/sale/sku', title: '产品销售汇总表', name: 'sale_sku', icon: 'information', component: () => import('@/views/salesSystem/saleSku.vue') },
        { path: '/sale/branch', title: '门店销售汇总表', name: 'sale_branch', icon: 'information', component: () => import('@/views/salesSystem/saleBranch.vue') },
        // 销售开单
        { path: '/sale_bills', title: '销售开单', name: 'sale_bills', icon: 'information', component: () => import('@/views/salesSystem/saleBill.vue') },
        { path: '/sale_bills/:id/edit', title: '销售开单编辑', name: 'sale_bills_edit', icon: 'information', component: () => import('@/views/salesSystem/saleBillEdit.vue') },
        { path: '/sale_bill/add', title: '添加销售开单', name: 'sale_bills_add', icon: 'information', component: () => import('@/views/salesSystem/saleBillEdit.vue') },
        // 销售收款
        { path: '/sale_receives', title: '销售收款单', name: 'sale_reveives', icon: 'information', component: () => import('@/views/salesSystem/saleReceive.vue') },
        { path: '/sale_receives/:id/edit', title: '销售收款添加编辑', name: 'sale_reveives_edit', icon: 'information', component: () => import('@/views/salesSystem/saleReceiveEdit.vue') },
        { path: '/sale_receive/add', title: '添加销售收款单', name: 'sale_reveives_add', icon: 'information', component: () => import('@/views/salesSystem/saleReceiveEdit.vue') },
        // 销售退货
        { path: '/sale_returns', title: '销售退货单', name: 'sale_returns', icon: 'information', component: () => import('@/views/salesSystem/saleReturn.vue') },
        { path: '/sale_returns/:id/edit', title: '销售退货单编辑', name: 'sale_returns_edit', icon: 'information', component: () => import('@/views/salesSystem/saleReturnEdit.vue') },
        { path: '/sale_return/add', title: '添加销售退货单', name: 'sale_returns_add', icon: 'information', component: () => import('@/views/salesSystem/saleReturnEdit.vue') },
        // 维修
        { path: 'return', title: '退货单', name: 'return', icon: 'arrow-return-right', component: () => import('@/views/shouhou/return/return.vue') },
        { path: 'repair', title: '维修单', name: 'repair', icon: 'wrench', component: () => import('@/views/shouhou/repair/repair.vue') },
        // 固定资产
        { path: '/assets', title: '固定资产', name: 'assets', icon: 'social-usd-outline', component: () => import('@/views/assets/asset.vue') },
        { path: '/assets/:id/edit', title: '固定资产编辑', name: 'assets_edit', icon: 'social-usd-outline', component: () => import('@/views/assets/assetEdit.vue') },
        { path: '/asset/add', title: '添加固定资产', name: 'assets_add', icon: 'social-usd-outline', component: () => import('@/views/assets/assetEdit.vue') },
        // 工作量
        { path: '/workloads', title: '固定资产工作量', name: 'workloads', icon: 'social-usd-outline', component: () => import('@/views/assets/workload.vue') },
        { path: '/workloads/:id/edit', title: '固定资产工作量编辑', name: 'workloads_edit', icon: 'social-usd-outline', component: () => import('@/views/assets/workloadEdit.vue') },
        { path: '/workload/add', title: '添加固定资产工作量', name: 'workloads_add', icon: 'social-usd-outline', component: () => import('@/views/assets/workloadEdit.vue') },
        //
        { path: 'book', title: '明细账本', name: 'book', icon: 'ios-book', component: () => import('@/views/assets/book/book.vue') },
        { path: 'purchase', title: '固定资产购置', name: 'purchase', icon: 'ios-cart', component: () => import('@/views/assets/purchase/purchase.vue') },
        { path: 'sellOff', title: '固定资产变卖', name: 'sellOff', icon: 'compose', component: () => import('@/views/assets/sellOff/sellOff.vue') },
        { path: 'depreciation', title: '固定资产折旧', name: 'depreciation', icon: 'social-codepen', component: () => import('@/views/assets/depreciation/depreciation.vue') },
        // 固定资产类型
        { path: '/asset_types', title: '固定资产类型', name: 'asset_types', icon: 'social-usd-outline', component: () => import('@/views/assets/assetType.vue') },
        { path: '/asset_types/:id/edit', title: '固定资产类型编辑', name: 'asset_types_edit', icon: 'social-usd-outline', component: () => import('@/views/assets/assetTypeEdit.vue') },
        { path: '/asset_type/add', title: '添加固定资产类型', name: 'asset_types_add', icon: 'social-usd-outline', component: () => import('@/views/assets/assetTypeEdit.vue') },
        // 折旧
        { path: '/depreciations', title: '折旧', name: 'depreciations', icon: 'social-usd-outline', component: () => import('@/views/assets/depreciation.vue') },
        { path: '/depreciations/:id/edit', title: '折旧编辑', name: 'depreciations_edit', icon: 'social-usd-outline', component: () => import('@/views/assets/depreciationEdit.vue') },
        { path: '/depreciation/add', title: '添加折旧', name: 'depreciations_add', icon: 'social-usd-outline', component: () => import('@/views/assets/depreciationEdit.vue') },
        // 增减方式
        { path: 'asset_io_types', title: '固定资产增减方式', name: 'asset_io_types', icon: 'social-usd-outline', component: () => import('@/views/assets/assetIoType.vue') },
        { path: '/asset_io_types/:id/edit', title: '固定资产增减方式编辑', name: 'asset_io_types_edit', icon: 'social-usd-outline', component: () => import('@/views/assets/assetIoTypeEdit.vue') },
        { path: '/asset_io_type/:add', title: '添加固定资产增减方式', name: 'asset_io_types_add', icon: 'social-usd-outline', component: () => import('@/views/assets/assetIoTypeEdit.vue') },
        // 使用方式
        { path: '/asset_use_types', title: '固定资产使用方式', name: 'asset_use_types', icon: 'social-usd-outline', component: () => import('@/views/assets/assetUseType.vue') },
        { path: '/asset_use_types/:id/edit', title: '固定资产使用方式编辑', name: 'asset_use_types_edit', icon: 'social-usd-outline', component: () => import('@/views/assets/assetUseTypeEdit.vue') },
        { path: '/asset_use_type/add', title: '添加固定资产使用方式', name: 'asset_use_types_add', icon: 'social-usd-outline', component: () => import('@/views/assets/assetUseTypeEdit.vue') },
        // 收入单
        { path: '/balance_ins', title: '其他收入单', name: 'balance_ins', icon: 'person-stalker', component: () => import('@/views/finance/balanceIn.vue') },
        { path: '/balance_ins/:id/edit', title: '收入单编辑', name: 'balance_ins_edit', icon: 'information', component: () => import('@/views/finance/balanceInEdit.vue') },
        { path: '/balance_in/add', title: '添加收入单', name: 'balance_ins_add', icon: 'information', component: () => import('@/views/finance/balanceInEdit.vue') },
        // 收入单查询
        { path: '/balance_ins/type', title: '收入汇总表-按类型', name: 'balance_ins_type', icon: 'person-stalker', component: () => import('@/views/finance/balanceInType.vue') },
        { path: '/balance_ins/department', title: '收入汇总表-按部门', name: 'balance_ins_department', icon: 'person-stalker', component: () => import('@/views/finance/balanceInDepartment.vue') },
        // 费用单
        { path: '/balance_outs', title: '费用单', name: 'balance_outs', icon: 'person-stalker', component: () => import('@/views/finance/balanceOut.vue') },
        { path: '/balance_outs/:id/edit', title: '费用单编辑', name: 'balance_out_edit', icon: 'information', component: () => import('@/views/finance/balanceOutEdit.vue') },
        { path: '/balance_out/add', title: '添加费用单', name: 'balance_out_add', icon: 'information', component: () => import('@/views/finance/balanceOutEdit.vue') },
        // 费用单查询
        { path: '/balance_outs/department_total', title: '费用支出汇总表-按部门', name: 'balance_outs_department_total', icon: 'person-stalker', component: () => import('@/views/finance/balanceOutDepartmentTotal.vue') },
        { path: '/balance_outs/department_detail', title: '费用支出明细表-按部门', name: 'balance_outs_department_detail', icon: 'person-stalker', component: () => import('@/views/finance/balanceOutDepartmentDetail.vue') },
        { path: '/balance_outs/type', title: '费用支出汇总表-按类型', name: 'balance_outs_type', icon: 'person-stalker', component: () => import('@/views/finance/balanceOutType.vue') },
        // BOM
        { path: '/bom', title: 'BOM', name: 'bom', icon: 'trophy', component: () => import('@/views/production/bom.vue') },
        // 采购订单
        { path: '/purchase_orders', title: '采购订单', name: 'purchase_orders', icon: 'ios-book', component: () => import('@/views/purchasingSystem/purchaseOrder.vue') },
        { path: '/purchase_orders/:id/edit', title: '采购订单编辑', name: 'purchase_orders_edit', icon: 'ios-book', component: () => import('@/views/purchasingSystem/purchaseOrderEdit.vue') },
        { path: '/purchase_order/add', title: '采购订单编辑', name: 'purchase_orders_add', icon: 'ios-book', component: () => import('@/views/purchasingSystem/purchaseOrderEdit.vue') },
        // 采购开单
        { path: '/purchase_bills', title: '采购开单', name: 'purchase_bills', icon: 'ios-book', component: () => import('@/views/purchasingSystem/purchaseBill.vue') },
        { path: '/purchase_bills/:id/edit', title: '采购开单编辑', name: 'purchase_bills_edit', icon: 'ios-book', component: () => import('@/views/purchasingSystem/purchaseBillEdit.vue') },
        { path: '/purchase_bill/add', title: '采购开单', name: 'purchase_bills_add', icon: 'ios-book', component: () => import('@/views/purchasingSystem/purchaseBillEdit.vue') },
        // 请购单
        { path: '/purchase_applies', title: '请购单', name: 'purchase_applys', icon: 'clipboard', component: () => import('@/views/purchasingSystem/purchaseApply.vue') },
        { path: '/purchase_applies/:id/edit', title: '请购单编辑', name: 'purchase_applys_edit', icon: 'clipboard', component: () => import('@/views/purchasingSystem/purchaseApplyEdit.vue') },
        { path: '/purchase_apply/add', title: '调价请购单', name: 'purchase_applys_add', icon: 'clipboard', component: () => import('@/views/purchasingSystem/purchaseApplyEdit.vue') },
        // 采购付款
        { path: '/purchase_pays', title: '采购付款单', name: 'purchase_pays', icon: 'clipboard', component: () => import('@/views/purchasingSystem/purchasePay.vue') },
        { path: '/purchase_paies/:id/edit', title: '采购付款单编辑', name: 'purchase_pays_edit', icon: 'clipboard', component: () => import('@/views/purchasingSystem/purchasePayEdit.vue') },
        { path: '/purchase_paies/add', title: '调价采购付款单', name: 'purchase_pays_add', icon: 'clipboard', component: () => import('@/views/purchasingSystem/purchasePayEdit.vue') },
        //
        { path: '/purchase_plans', title: '采购计划单', name: 'plan', icon: 'information', component: () => import('@/views/purchasingSystem/purchasePlan.vue') },
        { path: '/purchase_receives', title: '采购收货单', name: 'receiptList', icon: 'clipboard', component: () => import('@/views/purchasingSystem/purchaseReceive.vue') },
        { path: '/apportionment', title: '采购费用分摊单', name: 'apportionment', icon: 'ios-book', component: () => import('@/views/purchasingSystem/apportionment/apportionment.vue') },

        { path: '/planEdit', title: '采购计划单编辑', name: 'planEdit', icon: 'ribbon-b', component: () => import('@/views/purchasingSystem/planEdit/planEdit.vue') },
        { path: 'dingdanEdit', title: '采购订单编辑', name: 'dingdanEdit', icon: 'edit', component: () => import('@/views/purchasingSystem/dingdanEdit/dingdanEdit.vue') },
        { path: 'openBillEdit', title: '采购开单编辑', name: 'openBillEdit', icon: 'edit', component: () => import('@/views/purchasingSystem/openBillEdit/openBillEdit.vue') },
        { path: 'apportionmentEdit', title: '采购费用分摊单编辑', name: 'apportionmentEdit', icon: 'edit', component: () => import('@/views/purchasingSystem/apportionmentEdit/apportionmentEdit.vue') },
        { path: 'receiptListEdit', title: '采购收货单编辑', name: 'receiptListEdit', icon: 'edit', component: () => import('@/views/purchasingSystem/receiptListEdit/receiptListEdit.vue') },
        { path: 'purchaseOrderEdit', title: '请购单编辑', name: 'purchaseOrderEdit', icon: 'edit', component: () => import('@/views/purchasingSystem/purchaseOrderEdit/purchaseOrderEdit.vue') },
        // 服务类型
        { path: '/service_types', title: '服务类型', name: 'service_types', icon: 'information', component: () => import('@/views/service/serviceType.vue') },
        { path: '/service_types/:id/edit', title: '服务类型编辑', name: 'service_types_edit', icon: 'information', component: () => import('@/views/service/serviceTypeEdit.vue') },
        { path: '/service_type/add', title: '添加服务类型', name: 'service_types_add', icon: 'information', component: () => import('@/views/service/serviceTypeEdit.vue') },
        // 维修类型
        { path: '/repair_types', title: '维修类型', name: 'repair_types', icon: 'information', component: () => import('@/views/service/repairType.vue') },
        { path: '/repair_types/:id/edit', title: '维修类型编辑', name: 'repair_types_edit', icon: 'information', component: () => import('@/views/service/repairTypeEdit.vue') },
        { path: '/repair_type/add', title: '添加维修类型', name: 'repair_types_add', icon: 'information', component: () => import('@/views/service/repairTypeEdit.vue') },
        // 服务反馈单
        { path: '/service_feedbacks', title: '服务反馈单', name: 'service_feedback', icon: 'information', component: () => import('@/views/service/serviceFeedback.vue') },
        { path: '/service_feedbacks/:id/edit', title: '服务反馈单编辑', name: 'service_feedback_edit', icon: 'information', component: () => import('@/views/service/serviceFeedbackEdit.vue') },
        { path: '/service_feedback/add', title: '添加服务反馈单', name: 'service_feedback_add', icon: 'information', component: () => import('@/views/service/serviceFeedbackEdit.vue') },
        // 维修派工单
        { path: '/repairs', title: '维修派工单', name: 'repairs', icon: 'information', component: () => import('@/views/service/repair.vue') },
        { path: '/repairs/:id/edit', title: '维修派工单编辑', name: 'repairs_edit', icon: 'information', component: () => import('@/views/service/repairEdit.vue') },
        { path: '/repair/add', title: '添加维修派工单', name: 'repairs_edit', icon: 'information', component: () => import('@/views/service/repairEdit.vue') },
        // 维修验收单
        { path: '/repair_checks', title: '维修验收单', name: 'repair_checks', icon: 'information', component: () => import('@/views/service/repairCheck.vue') },
        { path: '/repair_checks/:id/edit', title: '维修验收单编辑', name: 'repair_checks_edit', icon: 'information', component: () => import('@/views/service/repairCheckEdit.vue') },
        { path: '/repair_check/add', title: '添加维修验收单', name: 'repair_checks_add', icon: 'information', component: () => import('@/views/service/repairCheckEdit.vue') },
        // 维修发货单
        { path: '/repair_deliveries', title: '维修发货单', name: 'repair_deliveries', icon: 'information', component: () => import('@/views/service/repairDelivery.vue') },
        { path: '/repair_deliveries/:id/edit', title: '维修发货单编辑', name: 'repair_deliveries_edit', icon: 'information', component: () => import('@/views/service/repairDeliveryEdit.vue') },
        { path: '/repair_delivery/add', title: '添加维修发货单', name: 'repair_deliveries_add', icon: 'information', component: () => import('@/views/service/repairDeliveryEdit.vue') },
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/gyl',
        icon: 'bag',
        name: 'gyl',
        title: '供应链管理',
        component: Main,
        children: [
            { path: '/purchase/home', title: '采购管理', name: 'purchase_home', icon: 'trophy', component: () => import('@/views/purchasingSystem/home.vue') },
            { path: '/sale/home', title: '销售管理', name: 'sale_home', icon: 'trophy', component: () => import('@/views/salesSystem/home.vue') },
            { path: '/store/home', title: '库存管理', name: 'store_home', icon: 'trophy', component: () => import('@/views/store/home.vue') },
            { path: '/service/home', title: '售后管理', name: 'service_home', icon: 'trophy', component: () => import('@/views/service/home.vue') },
        ]
    },
    {
        path: '/production_manager',
        icon: 'gyl',
        name: 'production_manager',
        title: '生产管理',
        component: Main,
        children: [
            { path: '/production/home', title: '基本生产', name: 'production_home', icon: 'trophy', component: () => import('@/views/production/home.vue') },
            { path: '/production/home', title: 'XXX', name: 'production_home2', icon: 'trophy', component: () => import('@/views/production/home.vue') },
        ]
    },
    {
        path: '/money_manager',
        icon: 'gyl',
        name: 'money_manager',
        title: '资金管理',
        component: Main,
        children: [
            { path: '/purchase/home', title: '应收应付', name: 'purchase_home', icon: 'trophy', component: () => import('@/views/purchasingSystem/home.vue') },
            { path: '/bank/home', title: '现金银行', name: 'bank_home', icon: 'trophy', component: () => import('@/views/bank/home.vue') },
        ]
    },
    {
        path: '/finance_manager',
        icon: 'gyl',
        name: 'finance_manager',
        title: '财务管理',
        component: Main,
        children: [
            { path: '/finance/home', title: '账务系统', name: 'finance_home', icon: 'trophy', component: () => import('@/views/zhangwu/home.vue') },
            { path: '/finance/home2', title: '出纳系统', name: 'finance_home2', icon: 'trophy', component: () => import('@/views/finance/home2.vue') },
            { path: '/finance/home3', title: '应收应付', name: 'finance_home3', icon: 'trophy', component: () => import('@/views/finance/home3.vue') },
            { path: '/asset/home', title: '固定资产', name: 'asset_home', icon: 'trophy', component: () => import('@/views/assets/home.vue') },
            { path: '/wage/home', title: '工资系统', name: 'wage_home', icon: 'trophy', component: () => import('@/views/wage/home.vue') },
        ]
    },
    {
        path: '/company_manager',
        icon: 'bag',
        name: 'company_manager',
        title: '企业管理',
        component: Main,
        children: [
            // { path: '/purchase/home', title: '分支机构', name: 'purchase_home', icon: 'trophy', component: () => import('@/views/purchasingSystem/home.vue') },
            { path: '/oa/home', title: '办公管理', name: 'oa_home', icon: 'trophy', component: () => import('@/views/oa/home.vue') },
            { path: '/crm/home', title: '客户关系', name: 'crm_home', icon: 'trophy', component: () => import('@/views/crm/home.vue') },
            { path: '/hr/home2', title: '分支机构', name: 'hr_home2', icon: 'trophy', component: () => import('@/views/hr/home2.vue') },
            { path: '/hr/home', title: '人力资源', name: 'hr_home', icon: 'trophy', component: () => import('@/views/hr/home.vue') },
            { path: '/system/home', title: '系统管理', name: 'system_home', icon: 'trophy', component: () => import('@/views/system/home.vue') },
        ]
    },
    {
        path: '/sale',
        icon: 'ios-briefcase',
        name: 'salesSystem',
        title: '销售系统',
        component: Main,
        children: [
            { path: '/salesReceivables', title: '销售收款', name: 'salesReceivables', icon: 'ios-redo', component: () => import('@/views/salesSystem/salesReceivables/salesReceivables.vue') },
            { path: '/performanceTable', title: '业务员业绩表', name: 'performanceTable', icon: 'android-list', component: () => import('@/views/salesSystem/performanceTable/performanceTable.vue') },
            { path: 'saleDaily', title: '销售日报', name: 'saleDaily', icon: 'android-clipboard', component: () => import('@/views/salesSystem/saleDaily/saleDaily.vue') },
            { path: 'productYearSalesCount', title: '产品年度销售统计', name: 'productYearSalesCount', icon: 'stats-bars', component: () => import('@/views/salesSystem/productYearSalesCount/productYearSalesCount.vue') },
            { path: 'shopYearSalesCount', title: '店铺年度销售统计', name: 'shopYearSalesCount', icon: 'stats-bars', component: () => import('@/views/salesSystem/shopYearSalesCount/shopYearSalesCount.vue') },
            { path: 'allShopCount', title: '所有店铺业务统计', name: 'allShopCount', icon: 'stats-bars', component: () => import('@/views/salesSystem/allShopCount/allShopCount.vue') }
        ]
    },
    {
        path: '/access-test',
        icon: 'lock-combination',
        title: '权限测试页',
        name: 'accesstest',
        access: 0,
        component: Main,
        children: [
            { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: () => import('@/views/access/access-test.vue') }
        ]
    },
    // {
    //     path: '/international',
    //     icon: 'earth',
    //     title: { i18n: 'international' },
    //     name: 'international',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: { i18n: 'international' }, name: 'international_index', component: () => import('@/views/international/international.vue') }
    //     ]
    // },
    // {
    //     path: '/component',
    //     icon: 'social-buffer',
    //     name: 'component',
    //     title: '组件',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'compose',
    //             name: 'text-editor',
    //             title: '富文本编辑器',
    //             component: () => import('@/views/my-components/text-editor/text-editor.vue')
    //         },
    //         {
    //             path: 'md-editor',
    //             icon: 'pound',
    //             name: 'md-editor',
    //             title: 'Markdown编辑器',
    //             component: () => import('@/views/my-components/markdown-editor/markdown-editor.vue')
    //         },
    //         {
    //             path: 'image-editor',
    //             icon: 'crop',
    //             name: 'image-editor',
    //             title: '图片预览编辑',
    //             component: () => import('@/views/my-components/image-editor/image-editor.vue')
    //         },
    //         {
    //             path: 'draggable-list',
    //             icon: 'arrow-move',
    //             name: 'draggable-list',
    //             title: '可拖拽列表',
    //             component: () => import('@/views/my-components/draggable-list/draggable-list.vue')
    //         },
    //         {
    //             path: 'area-linkage',
    //             icon: 'ios-more',
    //             name: 'area-linkage',
    //             title: '城市级联',
    //             component: () => import('@/views/my-components/area-linkage/area-linkage.vue')
    //         },
    //         {
    //             path: 'file-upload',
    //             icon: 'android-upload',
    //             name: 'file-upload',
    //             title: '文件上传',
    //             component: () => import('@/views/my-components/file-upload/file-upload.vue')
    //         },
    //         {
    //             path: 'count-to',
    //             icon: 'arrow-graph-up-right',
    //             name: 'count-to',
    //             title: '数字渐变',
    //             // component: () => import('@/views/my-components/count-to/count-to.vue')
    //             component: () => import('@/views/my-components/count-to/count-to.vue')
    //         },
    //         {
    //             path: 'split-pane-page',
    //             icon: 'ios-pause',
    //             name: 'split-pane-page',
    //             title: 'split-pane',
    //             component: () => import('@/views/my-components/split-pane/split-pane-page.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/form',
    //     icon: 'android-checkbox',
    //     name: 'form',
    //     title: '表单编辑',
    //     component: Main,
    //     children: [
    //         { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: () => import('@/views/form/article-publish/article-publish.vue') },
    //         { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: () => import('@/views/form/work-flow/work-flow.vue') }

    //     ]
    // },
    // {
    //     path: '/charts',
    //     icon: 'ios-analytics',
    //     name: 'charts',
    //     title: '图表',
    //     component: Main,
    //     children: [
    //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
    //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }

    //     ]
    // },
    {
        path: '/tables',
        icon: 'ios-grid-view',
        name: 'tables',
        title: '表格',
        component: Main,
        children: [
            { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move', component: () => import('@/views/tables/dragable-table.vue') },
            { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: () => import('@/views/tables/editable-table.vue') },
            { path: 'searchableTable', title: '可搜索表格', name: 'searchable-table', icon: 'search', component: () => import('@/views/tables/searchable-table.vue') },
            { path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download', component: () => import('@/views/tables/exportable-table.vue') },
            { path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: () => import('@/views/tables/table-to-image.vue') }
        ]
    },
    // {
    //     path: '/advanced-router',
    //     icon: 'ios-infinite',
    //     name: 'advanced-router',
    //     title: '高级路由',
    //     component: Main,
    //     children: [
    //         { path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: () => import('@/views/advanced-router/mutative-router.vue') },
    //         { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', component: () => import('@/views/advanced-router/argument-page.vue') }
    //     ]
    // },
    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '错误页面', name: 'errorpage_index', component: () => import('@/views/error-page/error-page.vue') }
    //     ]
    // }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
