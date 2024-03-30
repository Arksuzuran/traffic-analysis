<template>
	<div class="calendar-container">
			<a-calendar v-model:value="day" :fullscreen="false"
			@change="onDateChange" theme="dark" class="calendar" type="primary"/>
			<a-slider :marks="marks" :step="4.16" v-model:value="hour" :tip-formatter="formatter" @change="onHourChange"/>
	</div>
</template>


<script lang="ts">
import { defineComponent, ref, createVNode } from 'vue';
import { Dayjs } from 'dayjs';
import { ConfigProvider } from 'ant-design-vue';
import { SelectProps } from 'ant-design-vue';

ConfigProvider.config({
	theme: {
		primaryColor: '#25b864',
		colorBgContainer: '#25b864',
	},
	components: {
		Calendar: {
			colorBgContainer: '#25b864',
			colorText: 'rgba(255, 255, 255, 0.88)'
		}
	},
});
export default defineComponent({
	setup(_: SelectProps, ctx) {
		const day = ref<Dayjs>();
		const hour = ref<number>(8);
		const marks = ref<Record<number, any>>({
			0: {
				style: {
					color: '#bbc8f8',
				},
				label: createVNode('strong', {}, '00:00'),
			},
			33: {
				style: {
					color: '#bbc8f8',
				},
				label: createVNode('strong', {}, '8:00'),
			},
			75: {
				style: {
					color: '#bbc8f8',
				},
				label: createVNode('strong', {}, '18:00'),
			},
			100: {
				style: {
					color: '#bbc8f8',
				},
				label: createVNode('strong', {}, '24:00'),
			},
		});

		const onDateChange = (value: Dayjs, mode: string) => {
			console.log(value, mode);
		};
		const onHourChange = (value) => {
			let hour = Math.floor(value / 4.16)
			console.log(hour);
		};
		const formatter = (value: number) => {
			return `${Math.floor(value / 4.16)}:00`;
		};
		return {
			day,
			marks,
			hour,
			onDateChange,
			onHourChange,
			formatter,
			attrs: ctx.attrs
		};
	},
});
</script>

<style lang="scss" scoped>
//@import '/node_modules/ant-design-vue/dist/antd.dark.css';

.calendar-container{
	//width: 300px;
	padding: 5%;
	//border: 1px solid #d9d9d9;
	//border-radius: 4px;
	//background-color: rgba(255, 255, 255, 0.1);
}
.calendar-container {
	::v-deep .antd-picker-calendar {
		//height: 76px;
		background: #0a54ea !important;
	}
	::v-deep .antd-picker-panel {
		//height: 76px;
		background: #0a54ea !important;
	}
}
.calendar{
	background-color: #1b459d !important;
	border-radius: 5px;
	margin-bottom: 6%;
	//colorBgElevated: #0a2764 !important;
	//colorText: rgba(249, 247, 247, 0.88) !important;
	//colorTextDescription: rgba(243, 234, 234, 0.45) !important;
	//colorTextHeading: rgba(248, 240, 240, 0.88) !important;
	//colorTextTertiary: rgba(236, 231, 231, 0.45) !important;
	//colorIconHover: rgba(245, 238, 238, 0.88) !important;
	//colorIcon: rgba(255, 255, 255, 0.45) !important;
	//colorTextPlaceholder: rgba(240, 236, 236, 0.25) !important;
	//textHeight: 0 !important;
	//colorTextDisabled: rgba(253, 253, 253, 0.25) !important;
}
</style>

