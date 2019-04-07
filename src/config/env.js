/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 * 
 */
let baseUrl = '//192.168.1.105:8080'; 
let routerMode = 'hash';
let baseImgPath;

if (process.env.NODE_ENV == 'development') {
	baseUrl = '//192.168.1.105:8080';
    baseImgPath = '/img/';
}else{
	baseUrl = '//192.168.1.105:8080';
	baseImgPath = '';
}

export {
	baseUrl,
	routerMode,
	baseImgPath
}