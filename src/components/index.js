import page from './page'
import footer from './footer'
import adminTable from './admin-table'
import adminTableHeader from './admin-thead'
import adminTableBody from './admin-tbody'
import adminTd from './admin-td'
import adminTr from './admin-tr'

import quickSelector from './quickSelector'
import userSelector from './userSelector'
import applyTypeSelector from './applyTypeSelector'
import departmentSelector from './departmentSelector'
import productSelector from './productSelector'
import productCategorySelector from './productCategorySelector'
import inStoreSelector from './inStoreSelector'
import outStoreSelector from './outStoreSelector'
import storeSelector from './storeSelector'
import branchSelector from './branchSelector'
import branchSelect from './branchSelect'
import billTypeSelector from './billTypeSelector'
import bankSelector from './bankSelector'
import accountSelector from './accountSelector'
import balanceIoTypeSelector from './balanceIoTypeSelector'
import payTypeSelector from './payTypeSelector'
import customerSelector from './customerSelector'
import customerTypeSelector from './customerTypeSelector'
import visitTypeSelector from './visitTypeSelector'
import unitSelector from './unitSelector'
import positionSelector from './positionSelector'
import saleOrderSelector from './saleOrderSelector'
import saleBillSelector from './saleBillSelector'
import workTypeSelector from './workTypeSelector'
import workProcessSelector from './workProcessSelector'
import assetTypeSelector from './assetTypeSelector'
import assetIoTypeSelector from './assetIoTypeSelector'
import assetUseTypeSelector from './assetUseTypeSelector'
import voucherSummaryTypeSelector from './voucherSummaryTypeSelector'
import skuSelector from './skuSelector'
import supplierSelector from './supplierSelector'
import purchaseBillSelector from './purchaseBillSelector'
import voucherTypeSelector from './voucherTypeSelector'
import accountTypeSelector from './accountTypeSelector'
import serviceTypeSelector from './serviceTypeSelector'
import industrySelector from './industrySelector'
import quickTable from './quick-table'
import canEditTable from "../views/tables/components/canEditTable.vue"

export default {
    install: function (Vue) {
        Vue.component('my-page', page)
        Vue.component('admin-table', adminTable)
        Vue.component('admin-table-header', adminTableHeader)
        Vue.component('admin-table-body', adminTableBody)
        Vue.component('admin-td', adminTd)
        Vue.component('admin-tr', adminTr)

        Vue.component('my-footer', footer)
        Vue.component('my-quick-selector', quickSelector)
        Vue.component('my-user-selector', userSelector)
        Vue.component('my-department-selector', departmentSelector)
        Vue.component('my-product-selector', productSelector)
        Vue.component('my-product-category-selector', productCategorySelector)
        Vue.component('my-inStore-selector', inStoreSelector)
        Vue.component('my-outStore-selector', outStoreSelector)
        Vue.component('my-store-selector', storeSelector)
        Vue.component('my-branch-selector', branchSelector)
        Vue.component('my-branch-select', branchSelect)
        Vue.component('my-billType-selector', billTypeSelector)
        Vue.component('my-bank-selector', bankSelector)
        Vue.component('my-account-selector', accountSelector)
        Vue.component('my-balance-io-type-selector', balanceIoTypeSelector)
        Vue.component('my-pay-type-selector', payTypeSelector)
        Vue.component('my-customer-selector', customerSelector)
        Vue.component('my-customer-type-selector', customerTypeSelector)
        Vue.component('my-visit-type-selector', visitTypeSelector)
        Vue.component('my-unit-selector', unitSelector)
        Vue.component('my-position-selector', positionSelector)
        Vue.component('my-sale-order-selector', saleOrderSelector)
        Vue.component('my-sale-bill-selector', saleBillSelector)
        Vue.component('my-work-type-selector', workTypeSelector)
        Vue.component('my-work-process-selector', workProcessSelector)
        Vue.component('my-asset-type-selector', assetTypeSelector)
        Vue.component('my-asset-io-type-selector', assetIoTypeSelector)
        Vue.component('my-asset-use-type-selector', assetUseTypeSelector)
        Vue.component('my-voucher-summary-type-selector', voucherSummaryTypeSelector)
        Vue.component('my-sku-selector', skuSelector)
        Vue.component('my-supplier-selector', supplierSelector)
        Vue.component('my-purchase-bill-selector', purchaseBillSelector)
        Vue.component('my-voucher-type-selector', voucherTypeSelector)
        Vue.component('my-account-type-selector', accountTypeSelector)
        Vue.component('my-service-type-selector', serviceTypeSelector)
        Vue.component('my-apply-type-selector', applyTypeSelector)
        Vue.component('my-industry-selector', industrySelector)
        Vue.component('my-quick-table', quickTable)
        Vue.component('my-table', canEditTable)
    }
}
