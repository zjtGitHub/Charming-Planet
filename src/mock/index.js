import Mock from 'mockjs'

Mock.mock('/api/user','get',{
	status:200,
	message:'success!',
	'data|5-10':[
		{
			id:'@increment(1)',
			name:'@cword(2,8)',
			price:'@natural(2,10)',
		}
		
	]
})