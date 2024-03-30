const Home = () => import('@/pages/home/index.vue');

const routes = [
	{
		path: '/home',
		name: 'Home',
		component: Home,
		meta: {
			title: '共享单车调度分析系统'
		},
		children: [
			// 默认的二级路由 全部流量数据
			{
				path: '',
				name: "flowData",  //让默认二级路由设置name
				component: () => import('@/pages/home/FlowData.vue'),
			},
			// 电子围栏
			{
				path: '/home/fence',
				name: "fence",  //让默认二级路由设置name
				component: () => import('@/pages/home/Fence.vue'),
			},
			// 运营区划分
			{
				path: '/home/opArea',
				name: 'opArea',
				component: () => import('@/pages/home/OpArea.vue'),
			},
			// OD
			{
				path: '/home/OD',
				name: 'OD',
				component: () => import('@/pages/home/OD.vue'),
			},
			// 运输规划
			{
				path: '/home/plan',
				name: 'plan',
				component: () => import('@/pages/home/Plan.vue'),
			},
		]
	}
];

export default routes;
