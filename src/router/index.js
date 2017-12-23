import Vue from 'vue'
import Router from 'vue-router'
import TextTheme from '@/components/TextTheme/TextTheme'
import index from '@/components/index/index'
import column from '@/components/column/column'
Vue.use(Router);
  var bus=new Vue();
export default new Router({
  routes: [
    {
    	path:'/articles/:id',
    	name:'articles',
    	component:TextTheme
    },    
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path:'/items/:number',
      name:'items',
      component:column
    },
    {
      path:'/',
      name:'default',
      component:index
    }

  ]
})
