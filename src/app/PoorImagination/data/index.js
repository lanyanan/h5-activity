'use strict';

let data = [
    {
        id:1,
        componentMark:1, //1代表题型组件 2代表单选 3 图片选择 4 多选
        txt:{
            title:"第一章（单选题）",
            titleName:"小试牛刀",
            titleTxt:"共三小题,满分18分"
        }
    },
    {
        id:2,
        componentMark:2, //1代表题型组件 2代表单选 3 图片选择 4 多选
        title:"Q1: 如果你要带宠物去很远的地方，你会选择如何做？",
        list:[
        {pointId:1,txt:"像校长聪聪一样，搭自己飞机去罗！",points:6},
        {pointId:2,txt:"给小宠物办理检疫手续和证明，然后买好宠物旅行箱，之后上飞机，一起快快乐乐的旅行",points:4},
        {pointId:3,txt:"宠物是可以带的，可是不知道要办什么手续",points:3},
        {pointId:4,txt:"WHAT? 还可以带宠物上飞机的啊？好吧，还以为不可以的呢",points:3},
        ]
    },
    {
        id:3,
        componentMark:2, //1代表题型组件 2代表单选 3 图片选择 4 多选
        title:"Q2: 一般大家都工作几小时？",
        list:[
        {pointId:5,txt:"看心情，一般不会超过2-3小时吧",points:6},
        {pointId:6,txt:"也就半天的班吧，来盯盯进度",points:4},
        {pointId:7,txt:"每天朝九晚五，正常工作作息。",points:3},
        {pointId:8,txt:"九九六”工作作息",points:2},
        ]
    },
    {
        id:4,
        componentMark:2, //1代表题型组件 2代表单选 3 图片选择 4 多选
        title:"Q3: 你是否知道奢侈品的设计是不考虑洗涤的？",
        list:[
        {pointId:9,txt:"我买的时候就知道了",points:6},
        {pointId:10,txt:"考虑过啊，并且知道",points:4},
        {pointId:11,txt:"想过，但不知道",points:3},
        {pointId:12,txt:"完全没想过，并且不知道",points:2},
        ]
    },
    {
        id:5,
        componentMark:1, //1代表题型组件 2代表单选 3 图片选择 4 多选
        txt:{
            title:"第二章（图片题）",
            titleName:"初窥门径",
            titleTxt:"共三小题,满分18分"
        }
    },
    {
        id:6,
        componentMark:3, //1代表题型组件 2代表单选 3 图片选择 4 多选
        title:"Q4: 以下哪样东西是一次性的（单选）？",
        list:[
        {pointId:13,src:"http://images.9zhitx.com/post/20171108/1762b169-0f70-4bde-ac41-2a8fa9790aab0345.png",points:6},
        {pointId:14,src:"http://images.9zhitx.com/post/20171108/3e45c9ff-5369-4c2f-aea1-211003974d902845.png",points:4},
        {pointId:15,src:"http://images.9zhitx.com/post/20171108/c0aeebf1-6931-4370-aaf8-2822aa7f04f58919.png",points:2}
        ]
    },
    {
        id:7,
        componentMark:3, //1代表题型组件 2代表单选 3 图片选择 4 多选
        title:"Q5: 以下哪个是奢侈品？",
        list:[
        {pointId:16,src:"http://images.9zhitx.com/post/20171108/1b240277-385a-45e3-985e-ba124f3193a21614.png",points:6},
        {pointId:17,src:"http://images.9zhitx.com/post/20171108/396512c0-2a8b-4083-9be6-062f06a108eb2800.png",points:4},
        {pointId:18,src:"http://images.9zhitx.com/post/20171108/3f452183-4831-4505-8dd2-477f5496bb7c2315.png",points:2}
        ]
    },
    {
        id:8,
        componentMark:3, //1代表题型组件 2代表单选 3 图片选择 4 多选
        title:"Q6: 以下哪张图片是监禁的地方？",
        list:[
        {pointId:19,src:"http://images.9zhitx.com/post/20171108/98107333-708f-4461-983d-45c198762f6e8691.png",points:6},
        {pointId:20,src:"http://images.9zhitx.com/post/20171108/e7c79cd9-e8e5-4aa6-896a-42b464effd9e4592.png",points:4},
        {pointId:21,src:"http://images.9zhitx.com/post/20171108/6c6709f1-1b05-4d94-b5bd-805aa6e0168d9751.png",points:2}
        ]
    },
    {
        id:9,
        componentMark:1, //1代表题型组件 2代表单选 3 图片选择 4 多选
        txt:{
            title:"第三章（多选题）",
            titleName:"锋芒毕露",
            titleTxt:"共三小题,满分24分"
        }
    },
    {
        id:10,
        componentMark:4, //1代表题型组件 2代表单选 3 图片选择 4 多选
        title:"Q7: 当你买了一个奢侈品的包包，你会？",
        list:[
        {pointId:22,txt:"只用2个月就换下一个",points:6},
        {pointId:23,txt:"最多就放放口红香水而已",points:4},
        {pointId:24,txt:"从来不拉拉链",points:3},
        {pointId:25,txt:"随便放，反正是一次性的",points:2}
        ]
    },
    {
        id:11,
        componentMark:4, //1代表题型组件 2代表单选 3 图片选择 4 多选
        title:"Q8: 你会怎么怎么追星？",
        list:[
        {pointId:26,txt:"关注ta所有的作品，在网上操数据",points:2},
        {pointId:27,txt:"买ta所有的代言的物品",points:3},
        {pointId:28,txt:"在太空买颗星星用TA的名字命名",points:6},
        {pointId:29,txt:"直接出资给TA开演唱会",points:4}
        ]
    },
    {
        id:12,
        componentMark:4, //1代表题型组件 2代表单选 3 图片选择 4 多选
        title:"Q9: 你知道以下哪个奢侈品单品？",
        list:[
        {pointId:30,txt:"巴黎世家的蛇皮袋（就是民工袋没错）",points:2},
        {pointId:31,txt:"印有LV*Supreme的棺材",points:6},
        {pointId:32,txt:"蕾哈娜和彪马合作的拖鞋（塑料拖鞋）",points:4},
        {pointId:33,txt:"D&G拖鞋（没错，就是酒店拖鞋）",points:3}
        ]
    }
];

export default data;
