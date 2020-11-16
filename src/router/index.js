import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    component: () => import('@views/commutylist/commutylist'),
    meta: {
      title: '社区列表'
    }
  },
  {
    path: '/bindCommunity',
    component: () => import('@views/bindCommuty/bindCommunity'),
    meta: {
      title: '绑定社区'
    }
  },
  {
    path: '/login',
    component: () => import('@views/login/index'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/openDoor',
    component: () => import('@views/service/openDoor'),
    meta: {
      title: '远程开门'
    }
  },
  {
    path: '/openDoorPwd',
    component: () => import('@views/service/openDoorPwd'),
    meta: {
      title: '密码开门'
    }
  },
  {
    path: '/bindRool',
    component: () => import('@views/bindCommuty/bindRool'),
    meta: {
      title: '角色绑定'
    }
  },
  {
    path: '/my',
    component: () => import('@views/my/my'),
    meta: {
      title: '我的'
    }
  },
  {
    path: '/myCommity',
    component: () => import('@views/my/myCommity'),
    meta: {
      title: '我的小区'
    }
  },
  {
    path: '/bindFamiky',
    component: () => import('@views/my/bindFamiky'),
    meta: {
      title: '绑定家属'
    }
  },
  {
    path: '/connectPhone',
    component: () => import('@views/service/connectPhone'),
    meta: {
      title: '常用电话'
    }
  },
  {
    path: '/service',
    component: () => import('@views/service/index'),
    meta: {
      title: '服务'
    }
  },
  {
    path: '/chargeStandard',
    component: () => import('@views/service/chargeStandard'),
    meta: {
      title: '物业收费标准'
    }
  },
  {
    path: '/find',
    component: () => import('@views/find/find'),
    meta: {
      title: '发现'
    }
  },
  {
    path: '/noticeList',
    component: () => import('@views/notice/list'),
    meta: {
      title: '公告'
    }
  },
  {
    path: '/noticeDetail',
    component: () => import('@views/notice/detail'),
    meta: {
      title: '公告详情'
    }
  },
  {
    path: '/bill',
    component: () => import('@views/bill/already'),
    meta: {
      title: '账单'
    }
  },
  {
    path: '/autonomy',
    component: () => import('@views/bill/autonomy'),
    meta: {
      title: '自主缴费'
    }
  },
  {
    path: '/guardTutorial',
    component: () => import('@views/service/guardTutorial'),
    meta: {
      title: '门禁使用教程'
    }
  },
  {
    path: '/myComDetail',
    component: () => import('@views/my/myComDetail'),
    meta: {
      title: '家属/租客'
    }
  },
  {
    path: '/upImg',
    component: () => import('@views/upImg/upImg'),
    meta: {
      title: '上传模板照片'
    }
  },
  {
    path: '/visitorsOpen',
    component: () => import('@views/upImg/upImg'),
    meta: {
      title: '访客通行'
    }
  },
  {
    path: '/feedback',
    component: () => import('@views/my/feedback'),
    meta: {
      title: '问题反馈'
    }
  },
  {
    path: '/visitor',
    component: () => import('@views/share/visitor'),
    meta: {
      title: '访客访问'
    }
  },
  {
    path: '/visitor-index',
    component: () => import('@views/visitor/index'),
    meta: {
      title: '访客管理'
    }
  },
  {
    path: '/visitor-form',
    component: () => import('@views/visitor/form'),
    meta: {
      title: '访客申请'
    }
  },
  {
    path: '/visitor-list',
    component: () => import('@views/visitor/list'),
    meta: {
      title: '访客列表'
    }
  },
  {
    path: '/myset',
    component: () => import('@views/my/mySet'),
    meta: {
      title: '设置'
    }
  },
  {
    path: '/modifyPwd',
    component: () => import('@views/my/modifyPwd'),
    meta: {
      title: '密码修改'
    }
  },
  {
    path: '/visitor-commutylist',
    component: () => import('@views/visitor/commutylist'),
    meta: {
      title: '社区列表'
    }
  },
  {
    path: '/visitor-community',
    component: () => import('@views/visitor/community'),
    meta: {
      title: '选择目的地'
    }
  },
  {
    path: '/visitor-apply',
    component: () => import('@views/visitor/apply'),
    meta: {
      title: '申请拜访'
    }
  }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router
