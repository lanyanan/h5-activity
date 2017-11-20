'use strict'

 export class Config {
 	constructor() {
 		this.arr = [
 		{
 			title: '天生一对，佳偶天成',
 			details: '你们是如此的匹配，如此和谐，往往是你刚想说“可惜”他已经开始叹惜。你们性格相合，有共同的爱好，品味一致。就是这么默契，令人们羡慕得不得了。'
 		}, {
 			title: '一见钟情，两情相悦',
 			details: '你们是众人眼中的神仙眷侣，站在一起怎么看怎么般配，很有传说中的夫妻相。你们之间或许没有惊天地泣鬼神的爱情神话，或许没有刻骨铭心的激情，但是你们之间的温情和默契却能让你们的心越走越近，一起慢慢变老。'
 		}, {
 			title: '欢喜冤家，分分合合',
 			details: '你们前世是冤家，今生做情侣，所以就难免有一些不和谐的音符出现来折磨你们的爱情。你们的感情大起大落，分分合合，不过你们最终会修成正果，恩爱到老的。'
 		}, {
 			title: '有缘无分，两两相忘',
 			details: '你们的感情一般是从学生时代开始的，那青涩的恋爱留给你们酸酸甜甜的味道让你们用一生去怀念彼此，但是你们的爱情却注定了没有结果，你们会试着遗忘对方，开始自己新的生活，但心中那最温柔的角落一直被初恋占据。'
 		}, {
 			title: '风雨之后，亮丽彩虹',
 			details: '你们都是性情中人，你们都受过感情的伤，你们都一样脆弱而敏感。同样的经历，同样的伤痛，让你们更容易靠近。你们的感情在相互疗伤中一点一点加深，你们的心痊愈了，你们的爱情也圆满了。'
 		}, {
 			title: '日久生情，顺理成章',
 			details: '你们很可能是在一起工作的同事，你们发展的是办公室爱情。朝九晚五的生活使你们互相产生好感，上下班路上的闲谈增进你们相互了解。你们的手牵在一起是顺理成章的事， 在办公室里偷看一眼心上人也是你们最大的乐趣。'
 		}, {
 			title: '知心朋友，心灵相通',
 			details: '你们可以无话不谈，你们可以心有灵犀，但是你们却很难成为情侣。因为你们太熟悉彼此，太了解对方了，所以很难擦出火花。其实你们不用遗憾，人生得一知己足矣，就这样一直做朋友也很不错。'
 		}, {
 			title: '青梅竹马，两小无猜',
 			details: '你们的父母就是很好的朋友，你们从穿开裆裤时就在一起。一起进幼儿园，一起上小学，一起过家家，一起闯祸后对家长撒谎。你们是长辈默认的娃娃亲，你们是邻居眼中的金童玉女，走到一起是天经地义的事。'
 		}, {
 			title: '牛郎织女，聚少离多',
 			details: '你们的爱情基础非常深厚，牢不可破，然而却因为求学或工作的原因，使得你们分隔两地，聚少离多。'
 		}, {
 			title: '同床异梦，貌合神离',
 			details: '在外人的眼中你们或许是一对模范夫妻，只有你自己心里明白根本不是那么一回事。你们根本就不了解对方，也不想去了解，各自有各自的圈子，交集很少。'
 		}, {
 			title: '缘分天定，破镜重圆',
 			details: '你们真是一对打不散的鸳鸯，情投意合，相互吸引。但是或许由于你们都太花心，都想有更多的选择，所以你们的罗曼史都很丰富。'
 		}, {
 			title: '一本好书，只看一半',
 			details: '你们都是很有内秀的人，也都能看穿人的内心。你们的感情甜美却不持久，当对方不能吸引你时，你会决然地放手。他（她）就像一本小说，你打开了，却没能读完。'
 		}, {
 			title: '丑小鸭，白天鹅',
 			details: '你们的差距很大，你们的结合完全打破了门当户对的传说。但是不管别人怎么看，你们就是这么恩爱。白天鹅怎么会爱上丑小鸭，只有他们自己清楚。'
 		}, {
 			title: '单恋一枝花',
 			details: '你的爱情也是从暗恋开始的，不过你会让他（她）爱上你。或许很曲折，会受伤，但你一直执着。'
 		}]
 	}
 	getConfig(index) {
 		if(index != "-1") {
 			return this.arr[index]
 		} else {
 			let number = Math.random();
	 		let index = parseInt(Math.floor(number * 14));
	 		return index
 		}
 		
 	}
 }