'use strict';

let scene = [
    {num: 'A', txt: '我真后悔，我从一开始就不因该嫁过来，如果我不嫁过来，我的夫君就不会死，如果我的夫君不死。。。。'},
    {num: 'B', txt: '我知道是你，你就我的林殊哥哥，女人的直觉总是这么不讲道理呜呜呜呜呜呜'},
    {num: 'C', txt: '蒙丹，你为何总皱着眉头，有时候，我真的很想拿一把熨斗把你的眉头熨平……'},
    {num: 'D', txt: '严肃点，严肃点，不许笑，我们这儿打劫呢！'},
    {num: 'E', txt: 'You jump ,I jump.（请缓慢的读完）'},
    {num: 'F', txt: '扫地只不过是我的表面工作，我真正地身份是一位研究僧（生）！啊哈哈哈哈哈哈哈嗝'},
    {num: 'G', txt: '噢~如花啊~今天是你**的日子~我会给你挑一个温柔的~有钱的~有相貌的~保你第一次非常满意'},
    {num: 'H', txt: '这里的树林会吃人，诸位跟紧我，千万不要走丢了'},
];
let voiceWoman = [
    {
        mainVoice: '可爱萝莉音',
        headImage: 'http://images.9zhitx.com/6551a90d-296d-41b1-aef8-779a6a8dfa12.png',
        headImg: 3,
        relevance: {
            roleName: '初音',
            content: '<p>天真呆萌，甜甜软软的~</p>让人一听到你的声音就来一记摸头杀！',
            voiceCp: '正太音'
        }
    },
    {
        mainVoice: '呆萌少萝音',
        headImage: 'http://images.9zhitx.com/6551a90d-296d-41b1-aef8-779a6a8dfa12.png',
        headImg: 3,
        relevance: {
            roleName: '钟小葵',
            content: '<p>妹纸声音很甜很甜，萌我一脸血！</p>很有征服欲哦',
            voiceCp: '青受音'
        }
    },
    {
        mainVoice: '绵软少女音',
        headImage: 'http://images.9zhitx.com/6551a90d-296d-41b1-aef8-779a6a8dfa12.png',
        headImg: 3,
        relevance: {
            roleName: '唐雪见',
            content: '<p>唱歌应该会很好听可爱活泼，</p>清风拂面，温柔可人。',
            voiceCp: '暖男音'
        }
    },
    {
        mainVoice: '温暖少御音',
        headImage: 'http://images.9zhitx.com/1d0db061-f43a-4520-98ab-5af913b8ce2d.png',
        headImg: 4,
        relevance: {
            roleName: '楚乔',
            content: '妹纸，即有少女的活泼可爱又有一点成熟',
            voiceCp: '青叔音'
        }
    },
    {
        mainVoice: '温柔御姐音',
        headImage: 'http://images.9zhitx.com/1d0db061-f43a-4520-98ab-5af913b8ce2d.png',
        headImg: 4,
        relevance: {
            roleName: '武则天',
            content: '<p>参见女王大人，你那不可抗拒的气势，</p>我愿意献上我的膝盖',
            voiceCp: '公子音'
        }
    },
    {
        mainVoice: '成熟御妈音',
        headImage: 'http://images.9zhitx.com/b32169d8-2d85-4bd3-9b5b-4b94ce1ab267.png',
        headImg: 5,
        relevance: {
            roleName: '妲己',
            content: '<p>你的声音就像妲己一样魅惑</p>但是又有威严的质感~',
            voiceCp: '大叔音'
        }
    }
]
let voiceMan = [
    {
        mainVoice: '呆萌正太音',
        headImage: 'http://images.9zhitx.com/50ea0d14-0dd8-47f1-812d-b41dca4cf7b3.png',
        headImg: 1,
        relevance: {
            roleName: '葫芦娃',
            content: '萌就一个字，对你说一次，你真的太可爱了',
            voiceCp: '萝莉音'
        }
    },
    {
        mainVoice: '诱惑青受音',
        headImage: 'http://images.9zhitx.com/50ea0d14-0dd8-47f1-812d-b41dca4cf7b3.png',
        headImg: 1,
        relevance: {
            roleName: '白真',
            content: '清风十里~脆脆的，干净',
            voiceCp: '少萝音'
        }
    },
    {
        mainVoice: '温润公子音',
        headImage: 'http://images.9zhitx.com/7b979100-1585-446b-989f-541d16f5bc4e.png',
        headImg: 0,
        relevance: {
            roleName: '樱空释',
            content: '公子，你的声音会令多少天真少女弥足深陷啊',
            voiceCp: '御姐音'
        }
    },
    {
        mainVoice: '暖男青年音',
        headImage: 'http://images.9zhitx.com/7b979100-1585-446b-989f-541d16f5bc4e.png',
        headImg: 0,
        relevance: {
            roleName: '夜华',
            content: '<p>听起来干净温暖，宛如叶间散落的暖阳，</p>给人舒心的感觉',
            voiceCp: '少女音'
        }
    },
    {
        mainVoice: '宠溺青叔音',
        headImage: 'http://images.9zhitx.com/7b979100-1585-446b-989f-541d16f5bc4e.png',
        headImg: 0,
        relevance: {
            roleName: '欧阳少恭',
            content: '气泡的感觉，懒懒的就像刚刚睡醒~~',
            voiceCp: '少御音'
        }
    },
    {
        mainVoice: '磁性大叔音',
        headImage: 'http://images.9zhitx.com/7b8595ca-c7e3-401f-a525-783374077cc6.png',
        headImg: 2,
        relevance: {
            roleName: '李白',
            content: '说话磁性好温柔 入睡好伴侣~',
            voiceCp: '御妈音'
        }
    }
]
export default {
    scene: scene,
    voiceWoman: voiceWoman,
    voiceMan: voiceMan
};
