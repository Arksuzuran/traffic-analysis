export const forceDiagramOption = {
    animationDurationUpdate: 1500,//数据更新动画的时长。
    animationEasingUpdate: 'quinticInOut',//数据更新动画的缓动效果。
    color: ['#f57452', '#ccb333', '#fc9e24', '#f89090'],
    title: {
        bottom: '20px', // 上下位置
        left: '20px', // 左右位置
        textStyle: { // 图例文字的样式
            fontSize: 16,
            fontWeight: 550,
            color: '#666'
        }
    },
    grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    // legend: [{
    //   // selectedMode: 'single',
    //   // 图例位置
    //   bottom: '20px',
    //   left: '120px',
    //   textStyle: { // 图例文字的样式
    //     fontSize: 16,
    //     fontWeight: 550,
    //     color: '#666'
    //   },
    //   icon: 'circle', //  'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
    //   itemGap: 35, // 图例之间的间距
    //   data: this.categories.map(function (a) {
    //     return a.name
    //   })
    // }],
    series: [{
        // // 数据
        data: [
            {
                "id": 0,
                "name": "Jun Li",
                "category": 0,
                "symbolSize": 20
            },
            {
                "id": 1,
                "name": "Wei Wang",
                "category": 3,
                "symbolSize": 40
            },
            {
                "id": 2,
                "name": "Li Zhang",
                "category": 2,
                "symbolSize": 40
            },
            {
                "id": 3,
                "name": "Douglas G. Altman",
                "category": 2,
                "symbolSize": 30
            },
            {
                "id": 4,
                "name": "Li Li",
                "category": 0,
                "symbolSize": 20
            },
            {
                "id": 5,
                "name": "Wei Li",
                "category": 0,
                "symbolSize": 20
            },
            {
                "id": 6,
                "name": "Yang Yang",
                "category": 0,
                "symbolSize": 40
            },
            {
                "id": 7,
                "name": "Jun Wang",
                "category": 1,
                "symbolSize": 10
            },
            {
                "id": 8,
                "name": "Eric S. Lander",
                "category": 0,
                "symbolSize": 40
            },
            {
                "id": 9,
                "name": "Ying Liu",
                "category": 3,
                "symbolSize": 50
            },
            {
                "id": 10,
                "name": "Ahmedin Jemal",
                "category": 0,
                "symbolSize": 40
            },
            {
                "id": 11,
                "name": "Jing Wang",
                "category": 0,
                "symbolSize": 30
            },
            {
                "id": 12,
                "name": "Li Wang",
                "category": 3,
                "symbolSize": 30
            },
            {
                "id": 13,
                "name": "Lei Wang",
                "category": 2,
                "symbolSize": 20
            },
            {
                "id": 14,
                "name": "David Moher",
                "category": 1,
                "symbolSize": 80
            },
            {
                "id": 15,
                "name": "Yan Zhang",
                "category": 3,
                "symbolSize": 50
            },
            {
                "id": 16,
                "name": "Wei Liu",
                "category": 2,
                "symbolSize": 60
            },
            {
                "id": 17,
                "name": "Yang Liu",
                "category": 0,
                "symbolSize": 30
            },
            {
                "id": 18,
                "name": "Yan Wang",
                "category": 2,
                "symbolSize": 40
            },
            {
                "id": 19,
                "name": "Wei Chen",
                "category": 2,
                "symbolSize": 60
            },
            {
                "id": 20,
                "name": "Jian Wang",
                "category": 0,
                "symbolSize": 50
            },
            {
                "id": 21,
                "name": "Jing Li",
                "category": 0,
                "symbolSize": 40
            },
            {
                "id": 22,
                "name": "Yang Li",
                "category": 1,
                "symbolSize": 40
            },
            {
                "id": 23,
                "name": "Walter C. Willett",
                "category": 2,
                "symbolSize": 20
            },
            {
                "id": 24,
                "name": "Ying Wang",
                "category": 0,
                "symbolSize": 40
            },
            {
                "id": 25,
                "name": "Xin Wang",
                "category": 0,
                "symbolSize": 20
            },
            {
                "id": 26,
                "name": "Yi Zhang",
                "category": 1,
                "symbolSize": 30
            },
            {
                "id": 27,
                "name": "Rebecca L. Siegel",
                "category": 0,
                "symbolSize": 40
            },
            {
                "id": 28,
                "name": "Zhong Lin Wang",
                "category": 2,
                "symbolSize": 40
            },
            {
                "id": 29,
                "name": "Christopher J L Murray",
                "category": 0,
                "symbolSize": 10
            }
        ],
        links: [
            {
                "source": 1,
                "target": 28
            },
            {
                "source": 16,
                "target": 20
            },
            {
                "source": 6,
                "target": 21
            },
            {
                "source": 6,
                "target": 24
            },
            {
                "source": 4,
                "target": 6
            },
            {
                "source": 3,
                "target": 10
            },
            {
                "source": 20,
                "target": 26
            },
            {
                "source": 12,
                "target": 22
            },
            {
                "source": 3,
                "target": 19
            },
            {
                "source": 23,
                "target": 28
            },
            {
                "source": 9,
                "target": 14
            },
            {
                "source": 5,
                "target": 19
            },
            {
                "source": 17,
                "target": 21
            },
            {
                "source": 14,
                "target": 22
            },
            {
                "source": 3,
                "target": 28
            },
            {
                "source": 1,
                "target": 9
            },
            {
                "source": 10,
                "target": 18
            },
            {
                "source": 0,
                "target": 11
            },
            {
                "source": 8,
                "target": 27
            },
            {
                "source": 1,
                "target": 21
            },
            {
                "source": 2,
                "target": 20
            },
            {
                "source": 1,
                "target": 24
            },
            {
                "source": 15,
                "target": 23
            },
            {
                "source": 15,
                "target": 26
            },
            {
                "source": 4,
                "target": 5
            },
            {
                "source": 18,
                "target": 22
            },
            {
                "source": 12,
                "target": 15
            },
            {
                "source": 14,
                "target": 18
            },
            {
                "source": 9,
                "target": 16
            },
            {
                "source": 8,
                "target": 14
            },
            {
                "source": 14,
                "target": 24
            },
            {
                "source": 17,
                "target": 20
            },
            {
                "source": 11,
                "target": 16
            },
            {
                "source": 14,
                "target": 27
            },
            {
                "source": 0,
                "target": 19
            },
            {
                "source": 2,
                "target": 16
            },
            {
                "source": 9,
                "target": 25
            },
            {
                "source": 2,
                "target": 28
            },
            {
                "source": 15,
                "target": 19
            },
            {
                "source": 16,
                "target": 21
            },
            {
                "source": 10,
                "target": 29
            },
            {
                "source": 13,
                "target": 25
            },
            {
                "source": 7,
                "target": 18
            },
            {
                "source": 22,
                "target": 27
            },
            {
                "source": 14,
                "target": 17
            },
            {
                "source": 12,
                "target": 26
            },
            {
                "source": 14,
                "target": 20
            },
            {
                "source": 8,
                "target": 16
            },
            {
                "source": 8,
                "target": 19
            },
            {
                "source": 2,
                "target": 6
            },
            {
                "source": 9,
                "target": 24
            },
            {
                "source": 10,
                "target": 19
            },
            {
                "source": 13,
                "target": 15
            },
            {
                "source": 11,
                "target": 27
            }
        ],
        // links: this.chartData.links,
        categories: [
            {
                name: '1',
            },
            {
                name: '2',
            },
            {
                name: '3',
            },
            {
                name: '4',
            },
        ],
        type: 'graph', // 类型:关系图
        layout: 'force', // 图的布局，类型为力导图
        focusNodeAdjacency: true, // 当鼠标移动到节点上，突出显示节点以及节点的边和邻接节点
        draggable: true, // 指示节点是否可以拖动
        symbolSize: 10, // 调整节点的大小
        roam: 'scale', // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
        // edgeSymbol: ['circle', 'arrow'], // 边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。默认不显示标记，常见的可以设置为箭头，如下：edgeSymbol: ['circle', 'arrow']
        edgeSymbolSize: [2, 10], // 边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。
        edgeLabel: {
            normal: {
                show: false,
                formatter: function (x) {
                    return x.data.name
                },
                textStyle: {
                    fontSize: 12,
                    color: '#666666'
                }
            }
        },
        force: { //力引导图基本配置
            layoutAnimation:true,
            // xAxisIndex : 0, //x轴坐标 有多种坐标系轴坐标选项
            // yAxisIndex : 0, //y轴坐标
            gravity:0.02, //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
            edgeLength: 30, //边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
            repulsion: 300 //节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
            // repulsion: 3000, //节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
            // edgeLength: 80 //边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
        },
        lineStyle: {
            normal: {
                width: 1,
                // color: '#4b565b',
                color: 'target', // 决定边的颜色是与起点相同还是与终点相同
                curveness: 0.1,
                type: 'solid' // 'dotted'点型虚线 'solid'实线 'dashed'线性虚线
            }
        },
        label: {
            show: true,
            position: 'top',
            formatter: '{b}',
            textStyle: {
                fontSize: 16,
                fontWeight: 600,
                color: '#666'
            }
        },
    }]
}