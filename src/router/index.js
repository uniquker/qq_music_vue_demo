import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'views/recommend/index'
import Rank from 'views/rank/index'
import ListDetail from 'views/rank/detail'
import SongSheet from 'views/rank/songSheet'
import Album from 'views/rank/album'
import Search from 'views/search/index'
import Playing from 'views/playing'
import Singer from 'views/singer-page'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Recommend
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/album/:id/:albumid',
      name: 'Album',
      component: Album
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      name: 'ListDetail',
      path: '/listDetail/:id',
      component: ListDetail
    },
    {
    	name: 'SongSheet',
    	path: '/songSheet/:id',
    	component: SongSheet
    },
    {
      name: 'Playing',
      path: '/playing/:songid',
      component: Playing
    },
    {
      name: 'Singer',
      path: '/singer/:singerid',
      component: Singer
    }
  ]
})
