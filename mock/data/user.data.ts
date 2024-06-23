const admin = {
	id: 1,
	departmentId: 1,
	username: 'admin',
	nickname: 'better',
	email: 'better@168.com',
	phone: 18323887963,
	roles: ['admin'],
	status: 1,
	gender: 1,
	tags: ['working'],
	avatar: '',
	remark: '愿我是阳光，明媚而不忧伤',
	createdAt: '2024-6-18 14:00',
	updatedAt: '2024-6-18 14:01'
}

const editor = {
	id: 2,
	departmentId: 1,
	username: 'editor',
	nickname: 'better',
	email: 'better@168.com',
	phone: 18323887961,
	roles: ['editor'],
	status: 1,
	gender: 1,
	tags: ['good'],
	avatar: '',
	remark: '浮生若梦，唯爱永恒。',
	createdAt: '2024-6-18 15:00',
	updatedAt: '2024-6-18 15:01'
}

const ghost = {
	id: 3,
	departmentId: 1,
	username: 'ghost',
	nickname: 'better',
	email: 'better@168.com',
	phone: 18323887963,
	roles: ['ghost'],
	status: 1,
	gender: 1,
	tags: ['happy'],
	avatar: '',
	remark: '蓝天白云，悠然自得，干净如梦，永驻心间。',
	createdAt: '2024-6-18 16:00',
	updatedAt: '2024-6-18 16:01'
}

export const userData = {
	admin,
	editor,
	ghost,
	list: [admin, editor, ghost]
}
