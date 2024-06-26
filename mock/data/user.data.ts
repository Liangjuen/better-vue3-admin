const admin = {
	id: 1,
	departmentId: 1,
	username: 'admin',
	nickname: 'Nick',
	name: '尼克狐',
	email: 'better@168.com',
	phone: 18323887961,
	roles: ['admin'],
	status: 1,
	gender: 0,
	tags: ['working'],
	avatar: '',
	remark: '愿我是阳光，明媚而不忧伤',
	createdAt: '2024-6-18 14:00',
	updatedAt: '2024-6-18 14:01'
}

const editor = {
	id: 2,
	departmentId: 3,
	username: 'editor',
	nickname: 'Judi',
	name: '朱迪',
	email: 'judi@168.com',
	phone: 18323887962,
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
	departmentId: 5,
	username: 'ghost',
	nickname: 'xiaoxin',
	name: '小欣',
	email: 'xiaoxin@168.com',
	phone: 18323887963,
	roles: ['ghost'],
	status: 1,
	gender: 2,
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
