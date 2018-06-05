import * as React from 'react';
import './index.css';


export class TVChartContainer extends React.PureComponent {
	static defaultProps = {
		symbol: 'AAPL',
		interval: 'D',
		containerId: 'tv_chart_container',
		datafeedUrl: 'https://demo_feed.tradingview.com',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},
	};

	componentDidMount() {
		const widgetOptions = {
			symbol: this.props.symbol,    												  //请求地址
			// BEWARE: no trailing slash is expected in feed URL
			datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.props.datafeedUrl), //数据地址
			interval: this.props.interval, 													//事件间隔
			container_id: this.props.containerId,  				//id是您希望包含在小部件中的DOM元素的属性
			library_path: this.props.libraryPath,				//static文件夹的路径

			locale: 'ZH',											//语言
			disabled_features: ['header_saveload'],  //包含禁用的功能名称的数组
			enabled_features: ['seconds_resolution'],					//包含默认应启用

			//这些参数与用于保存/加载图表的高级API相关
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,

			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
		};

		window.TradingView.onready(() => {
			const widget = window.tvWidget = new window.TradingView.widget(widgetOptions);

			widget.onChartReady(() => {
				// const button = widget.createButton()
				// 	.attr('title', 'Click to show a notification popup')
				// 	.addClass('apply-common-tooltip')
				// 	.on('click', () => widget.showNoticeDialog({
				// 		title: 'Notification',
				// 		body: 'TradingView Charting Library API works correctly',
				// 		callback: () => {
				// 			console.log('Noticed!');
				// 		},
				// 	}));

				// button[0].innerHTML = 'Check API';
			});
		});
	}

	render() {
		return (
			<div
				id={ this.props.containerId }
				className={ 'TVChartContainer' }
			/>
		);
	}
}
