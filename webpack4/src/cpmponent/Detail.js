import React, { Component } from 'react'
import './Detail.styl';

var echarts = require('echarts');

export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount = () => {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(this.ref.current);
        // 绘制图表
        myChart.setOption({
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });

        import(/* webpackChunkName: "dynamicImport" */ './dynamicImport').then(module => {
            console.log('fn ', module.default);
        });
    };

    render() {
        let { id } = this.props.match.params;

        return (
            <div>
                Detail {id} Page.

                <div ref={this.ref} className="echarts-container">
                </div>
            </div>
        );
    }
}
