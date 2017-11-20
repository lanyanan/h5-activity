'use strict'

 export class Config {
 	constructor() {
 		this.arr = [
 		{
 			id: 1,
 			imgurl: 'http://images.9zhitx.com/post/20171020/09206b8d-8490-4e2b-9102-e43bb66c7fa19843.png'
 		}, {
 			id: 2,
 			imgurl: 'http://images.9zhitx.com/post/20171020/9ca72c5f-f69a-458b-bdf3-3deb5ae34c724863.png'
 		}, {
 			id: 3,
 			imgurl: 'http://images.9zhitx.com/post/20171020/5c3021bc-6c1e-4507-b7c1-89e55f3276447209.png'
 		}, {
 			id: 4,
 			imgurl: 'http://images.9zhitx.com/post/20171020/99d10b75-8cb7-4494-81a7-a86080c7497d9814.png'
 		}, {
 			id: 5,
 			imgurl: 'http://images.9zhitx.com/post/20171020/fd7da83d-a49d-4234-b0de-a406a907cfdf0605.png'
 		}, {
 			id: 6,
 			imgurl: 'http://images.9zhitx.com/post/20171020/282b5d7d-29e6-40d1-b624-81a153d7e9fb6986.png'
 		}, {
 			id: 7,
 			imgurl: 'http://images.9zhitx.com/post/20171020/3b4416e5-e74f-4804-93f6-c648560c841f2223.png'
 		}, {
 			id: 8,
 			imgurl: 'http://images.9zhitx.com/post/20171020/98d03400-885b-4a9b-b94f-a32ece4ba69f3574.png'
 		}, {
 			id: 9,
 			imgurl: 'http://images.9zhitx.com/post/20171020/a31eab13-8247-4a13-9ffa-f6c1fc95e66b9391.png'
 		}, {
 			id: 10,
 			imgurl: 'http://images.9zhitx.com/post/20171020/c029819d-0f0b-4845-8e8f-d8f8019eb3d51672.png'
 		}, {
 			id: 11,
 			imgurl: 'http://images.9zhitx.com/post/20171020/89fded1f-378c-4255-b160-0300f320f4ce0261.png'
 		}, {
 			id: 12,
 			imgurl: 'http://images.9zhitx.com/post/20171020/1e027573-190b-43ba-9507-4969e289bae23291.png'
 		}]
 	}
 	getConfig(index) {
 		return this.arr[index-1];
 	}
 }