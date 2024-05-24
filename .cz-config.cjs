module.exports = {
	types: [
		{ value: 'feature', name: 'feature:  增加新功能' },
		{ value: 'bug', name: 'bug:      测试反馈bug列表中的bug号' },
		{ value: 'fix', name: 'fix:      修复bug' },
		{ value: 'ui', name: 'ui:       更新UI' },
		{ value: 'docs', name: 'docs:     文档变更' },
		{ value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
		{ value: 'perf', name: 'perf:     性能优化' },
		{
			value: 'refactor',
			name: 'refactor: 重构(既不是增加feature，也不是修复bug)'
		},
		{ value: 'release', name: 'release:  发布' },
		{ value: 'deploy', name: 'deploy:   部署' },
		{ value: 'test', name: 'test:     增加测试' },
		{
			value: 'chore',
			name: 'chore:    构建过程或辅助工具的变动(更改配置文件)'
		},
		{ value: 'revert', name: 'revert:   回退' },
		{ value: 'build', name: 'build:    打包' }
	],
	scopes: [
		{name: 'accounts'}
	],

	scopeOverrides: {
		fix: [
		  {name: 'merge'},
		  {name: 'style'},
		  {name: 'e2eTest'},
		  {name: 'unitTest'}
		]
	},
	// override the messages, defaults are as follows
	messages: {
		type: '请选择提交类型:',
		scope: '此更改的范围(可选):',
		customScope: '请输入您修改的范围(可选):',
		subject: '请简要描述提交 message (必填):',
		body: '长说明，使用"|"换行(可选):\n',
		footer: '请输入要关闭的issue 例如：#31, #34(可选):',
		confirmCommit: '确定提交说明?'
	},
	allowCustomScopes: true,
	skipEmptyScopes: true,
	skipQuestions: ['body', 'footer'],
	subjectLimit: 72,
	// typePrefix: '[',
	// typeSuffix: ']',
	// subjectSeparator: ': '
}
