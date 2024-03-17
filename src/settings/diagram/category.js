export const rankDiagramOption = {
    credits: { enabled: false },
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Ranking of Literature Sources',
        align: 'left'
    },
    subtitle: {
        text: 'Distribution and Impact Assessment Over the Specified Period of Past 3 Years',
        align: 'left'
    },
    xAxis: {
        categories: [
            "PubMed",
            "PubMed Central",
            "Europe PMC (PubMed Central)",
            "arXiv (Cornell University)",
            "HAL (Le Centre pour la Communication Scientifique Directe)",
            "DOAJ (DOAJ: Directory of Open Access Journals)",
            "Nature",
            "Proceedings of the National Academy of Sciences of the United States of America",
            "Science",
            "Journal of Biological Chemistry"
        ],
        // title: {
        //   text: null
        // }
    },
    yAxis: {
        min: 0,
        title: {
            text: '引用量',
            align: 'high'
        },
        labels: {
            overflow: 'scroll'
        }
    },
    // tooltip: {
    //   valueSuffix: ' 百万'
    // },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true,
                allowOverlap: true // 允许数据标签重叠
            },
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -10,
        y: 100,
        floating: true,
        borderWidth: 1,
        // backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
    },
    series: [
        {
            "name": 2021,
            "data": [
                64956352,
                3708895,
                1186244,
                1018946,
                1021622,
                441978,
                29252527,
                25229519,
                5179833,
                3728983
            ],
            "color": "rgb(245,205,135)"
        },
        {
            "name": 2022,
            "data": [
                65205839,
                4802744,
                1155571,
                964014,
                959592,
                400557,
                31445367,
                23821250,
                4620774,
                3722744
            ],
            "color": "rgb(243,131,83)"
        },
        {
            "name": 2023,
            "data": [
                63511983,
                5220467,
                1091041,
                899294,
                886311,
                354608,
                31713083,
                21230958,
                4934544,
                3609158
            ],
            "color": "rgb(243,99,99)"
        }
    ]
}