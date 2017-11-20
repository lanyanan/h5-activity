var host_name = '192.168.1.75',
    host_port = '8000';

module.exports = { 
	// mock: true,
    host_name: host_name, 
    host_port: host_port, 
	baseUrl: 'http://192.168.1.204',
	baseJs: 'http://' + host_name + ':' + host_port,
	qiniuDomain: 'http://file.9zhitx.com',
	staticUrl: '/static/yaya/dev/h5-activity/',
	restaticUrl: '',
	env: 'local',
	project: 'h5-activity'
};

