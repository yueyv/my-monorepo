import { createRouter, createWebHashHistory } from 'vue-router';

export const routes: any = [
  {
    name: 'AccountCriteria',
    path: '/account_criteria',
    component: () => import('../views/SystemConfig/AccountCriteria.vue'),
  },
  {
    name: 'AccountCriteriaTemplate',
    path: '/account_criteria_template',
    component: () => import('../views/SystemConfig/AccountCriteriaTemplate.vue'),
  },
  // 重复使用
  {
    name: 'CarbonFactor',
    path: '/carbon_factor',
    component: () => import('../views/SystemConfig/CarbonFactor.vue'),
  },
  {
    name: 'CarbonFactorP',
    path: '/carbon_factor_p',
    component: () => import('../views/ProjectConfig/CarbonFactor.vue'),
  },
  {
    name: 'CarbonFactorType',
    path: '/carbon_factor_type',
    component: () => import('../views/SystemConfig/CarbonFactorType.vue'),
  },
  {
    name: 'CarbonFormulaTemplate',
    path: '/carbon_formula_template',
    component: () => import('../views/SystemConfig/CarbonFormulaTemplate.vue'),
  },

  {
    name: 'CarbonMarket',
    path: '/carbon_market',
    component: () => import('../views/SystemConfig/CarbonMarket.vue'),
  },
  {
    name: 'CarbonReasoureType',
    path: '/carbon_reasoure_type',
    component: () => import('../views/SystemConfig/CarbonReasoureType.vue'),
  },
  {
    name: 'TemplateDetail',
    path: '/template_detail',
    component: () => import('../views/SystemConfig/TemplateDetail.vue'),
  },
  {
    name: 'Units',
    path: '/units',
    component: () => import('../views/SystemConfig/Units.vue'),
  },

  {
    name: 'AccountSubject',
    path: '/account_subject',
    component: () => import('../views/ProjectConfig/AccountSubject.vue'),
  },
  {
    name: 'AccountVersion',
    path: '/account_version',
    component: () => import('../views/ProjectConfig/AccountVersion.vue'),
  },
  {
    name: 'CarbonActivity',
    path: '/carbon_activity',
    component: () => import('../views/ProjectConfig/CarbonActivity.vue'),
  },
  {
    name: 'CarbonForecast',
    path: '/carbon_forecast',
    component: () => import('../views/ProjectConfig/CarbonForecast.vue'),
  },
  {
    name: 'CarbonFormula',
    path: '/carbon_formula',
    component: () => import('../views/ProjectConfig/CarbonFormula.vue'),
  },
  {
    name: 'CarbonInclusion',
    path: '/carbon_inclusion',
    component: () => import('../views/ProjectConfig/CarbonInclusion.vue'),
  },
  {
    name: 'Classify',
    path: '/classify',
    component: () => import('../views/ProjectConfig/Classify.vue'),
  },
  {
    name: 'Product',
    path: '/product',
    component: () => import('../views/ProjectConfig/Product.vue'),
  },
  {
    name: 'ReductionFormula',
    path: '/reduction_formula',
    component: () => import('../views/ProjectConfig/ReductionFormula.vue'),
  },
  {
    name: 'ReductionTarget',
    path: '/reduction_target',
    component: () => import('../views/ProjectConfig/ReductionTarget.vue'),
  },
  {
    name: 'Staff',
    path: '/staff',
    component: () => import('../views/ProjectConfig/Staff.vue'),
  },
  {
    name: 'TradeDeclaration',
    path: '/trade_declaration',
    component: () => import('../views/ProjectConfig/TradeDeclaration.vue'),
  },
  {
    name: 'TradeHistory',
    path: '/trade_history',
    component: () => import('../views/ProjectConfig/TradeHistory.vue'),
  },
  {
    name: 'VersionDetail',
    path: '/version_detail',
    component: () => import('../views/ProjectConfig/VersionDetail.vue'),
  },
];
const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});
export default router;
