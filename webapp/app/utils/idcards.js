var KYO = {
    id   : 'KYO',
    fullname : 'Kyo Kusanagi',
    name : '草雉京',
    des  : '他是守护神器草薙剑的草薙一族后裔，与守护神器八尺琼勾玉的八神一族中的八神庵是天生的宿敌。',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-385,-105),//back pose 选择角色时候出现在背景上的大图。
    stand : {'w':128,'h':237,'p':cc.p(-150,-10),'fc':11},//站立姿势
    head : cc.p(50,83),
    body : {b:150,r:800},
    rects : {
        'stand' : [128,237,cc.p(0,0),11],
        'crouch' : [166,235,cc.p(1494,3542),7],
        'S2C' : [166,235,cc.p(0,3542),5], 
        'C2S' : [166,235,cc.p(664,3542),5], 
        'D' : [146,248,cc.p(0,250),11],
        'A' : [137,253,cc.p(0,505),10],
        'AA' : [137,253,cc.p(0,505),10],
        'SD2A' : [180,185,cc.p(0,995),6],
        'SA2D' : [900,185,cc.p(0,995),6],
        'C2G' : [155,179,cc.p(0,3788),7],
        'G2C' : [155,179,cc.p(775,3788),5],
        'DD' : [245,218,cc.p(0,762),8],
        'J' : [192,239,cc.p(0,1185),9],
        'U' : [239,244,cc.p(0,1431),11],
        'K' : [204,248,cc.p(0,1683),9],
        'I' : [281,264,cc.p(0,1929),10],
        'SJ' : [215,157,cc.p(0,2709),9],
        'SU' : [180,295,cc.p(0,2870),13],
        'SK' : [232,168,cc.p(0,3367),7],
        'SI' : [285,196,cc.p(0,3165),10]
    },
    move : {walkspeed : 150,runspeed : 1}
};
var BENIMARU = {
    id   : 'BENIMARU',
    fullname : 'Benimaru Nikaido',
    name : '二阶堂红丸',
    des  : '日美混血儿，拥有堪比一流模特的容貌，而且多才多艺，至今没有被什么难倒过，更何况还是二阶堂集团的会长之子，拥有着一般人无可比拟的优越环境，在格斗技这个领域内也称得上是天才。',
    L_R  : 'R',//L--左边，R--右边
    bp : cc.p(-380,-70),
    stand : {'w':140,'h':267,'p':cc.p(-150,-10),'fc':9},
    head : cc.p(58,83),
    rects : {
        'stand' : [140,250,cc.p(0,0),9]
    }
};
var DAIMON = {
    id   : 'DAIMON',
    fullname : 'Goro Daimon',
    name : '大门五郎',
    des  : '木讷的柔道家',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-370,-95),
    stand : {'w':185,'h':288,'p':cc.p(-145,-10),'fc':15}
};
var TERRY = {
    id   : 'TERRY',
    fullname : 'Terry Bogard',
    name : '特瑞·伯格',
    des  : '第一代主角，南镇的传说，看来只有那爱睡觉的习惯看起来比较人性化',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-385,-105),
    stand : {'w':183,'h':229,'p':cc.p(-150,-10),'fc':9}
};
var ANDY = {
    id   : 'ANDY',
    fullname : 'Andy Bogard',
    name : '安迪',
    des  : '有个大波老婆的幸福迟钝男人',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-385,-105),
    stand : {'w':137,'h':215,'p':cc.p(-145,-10),'fc':13}
};
var JOE = {
    id   : 'JOE',
    fullname : 'Joe Higashi',
    name : '东丈',
    des  : '泰拳高手，饿狼队的生力军！',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-390,-105),
    stand : {'w':158,'h':256,'p':cc.p(-145,-10),'fc':10}
};
var ASH = {
    id   : 'ASH',
    fullname : 'Ash Crimson',
    name : '阿修·克里门森',
    des  : '讨厌麻烦的无聊的事情，觉得运动很烦，使用翠绿色的火焰，在03年的KOF大会上趁乱夺取了神乐千鹤的神器八咫之镜。',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-375,-95),
    stand : {'w':110,'h':243,'p':cc.p(-155,-10),'fc':30}
};
var RYO = {
    id   : 'RYO',
    fullname : 'Ryo Sakazaki',
    name : '坂崎良',
    des  : '极限流道场的门下生，有着「无敌之龙」的称号，与Robert Garcia合称“龙虎”',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-385,-105),
    stand : {'w':150,'h':235,'p':cc.p(-150,-10),'fc':24}
};
var ROBERT = {
    id   : 'ROBERT',
    fullname : 'Robert Garcia',
    name : '罗伯特·加西亚',
    des  : '出身名门，家财万贯，但是不喜欢继承家族生意，立志成为格斗家。在掌握一定格斗技后挑战各路豪杰，一日来到极限流挑战，将所有喽啰打败后，板崎琢磨令板崎良出战，板崎良用一个手指便屡次将他打倒在地。从此罗伯特拜在极限流门下，最终成为和板崎良齐名的最强之虎。',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-365,-130),
    stand : {'w':146,'h':255,'p':cc.p(-150,-10),'fc':15}
};
var TAKUMA = {
    id   : 'TAKUMA',
    fullname : 'Takuma Sakazaki',
    name : '坂崎琢磨',
    des  : '儿子坂崎良 女儿坂崎由莉 徒弟罗伯特',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-400,-85),
    bps : 1,
    stand : {'w':150,'h':225,'p':cc.p(-155,-10),'fc':9}
};
var IORI = {
    id   : 'IORI',
    fullname : 'Iori Yagami',
    name : '八神 庵',
    des  : '庵是八神家族最年轻的后裔，八神氏曾经叫八尺琼，一个曾经在公元八世纪前和草剃家联盟，又在八咫家（现在的神乐千鹤家族曾经的姓氏，属于神战士守护者）的帮助下，将大蛇封印至永远的睡眠。他们是通过用八酒杯禁制住大蛇后，再被草剃之剑削弱，八尺琼封印，最后由八咫监禁起来． 时间流逝，八尺琼不想生活在草稚的“阴影”下，大蛇召唤他，两者签定了“血契”后，便给予了八尺琼家族无穷的力量，并要求八尺琼改姓八神，但代价是放弃守护大蛇封印的使命。草剃家意识到了他们的背叛，开始了反击。从那以后，两家的争斗从未停止，实力也一直不分高低。 因为得到大蛇的力量，八神家的力量之火为紫色，也获得了大蛇之力的奥义——八稚女。',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-385,-105),
    stand : {'w':180,'h':242,'p':cc.p(-150,-10),'fc':16}
};
var MATURE = {
    id   : 'MATURE',
    fullname : 'Mature',
    name : '玛图尔',
    des  : '监视八神庵，但在比赛后被八神庵重创，没有被杀死，而左眼被八神攻击失明。',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-370,-125),
    stand : {'w':180,'h':246,'p':cc.p(-150,-10),'fc':8}
};
var VICE = {
    id   : 'VICE',
    fullname : 'vice',
    name : '维斯',
    des  : '本着监视八神的目的与八神一起出场，但由于八神自身也流有大蛇的血，当其复苏后两人被打倒，生死不明。',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-395,-70),
    bps : 1,
    stand : {'w':160,'h':243,'p':cc.p(-150,-10),'fc':9} 
};
var ELISABETH = {
    id   : 'ELISABETH',
    fullname : 'Elisabeth Branctorche',
    name : '伊丽莎白·布兰克托什',
    des  : '法国名门望族布兰克托什家族的后裔，能够使用光战斗，和遥远彼之地为敌对关系。个性不茍言笑的冷艳美女，对事情的批评通常也是不假辞色的严厉。 贯彻家族传统，不会用车代步，只会以马匹作载具。受到当地民众的景仰。',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-385,-105),
    stand : {'w':117,'h':248,'p':cc.p(-155,-10),'fc':24}
};
var DUOLON = {
    id   : 'DUOLON',
    fullname : 'Duolon',
    name : '堕珑',
    des  : '',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-385,-105),
    stand : {'w':196,'h':227,'p':cc.p(-155,-10),'fc':9}
};
var SHEN = {
    id   : 'SHEN',
    fullname : 'ShenWoo',
    name : '神武',
    des  : '个性单纯、冲动，喜欢打架，希望和强者战斗来证明自己。因为在上海常年和地痞流氓、黑帮打架，所以得了个上海武神的称号，也因此招惹了不少仇家，KOF13赛前还趁黑帮新安清会老大摆寿宴的机会前往闹事。',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-385,-105),
    stand : {'w':160,'h':239,'p':cc.p(-155,-10),'fc':12}
};
var KIM = {
    id   : 'KIM',
    fullname : 'Kim Kaphwan',
    name : '金家藩',
    des  : '出身韩国，跆拳道高手',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-385,-125),
    stand : {'w':140,'h':257,'p':cc.p(-155,-10),'fc':10}
};
var HWA = {
    id   : 'HWA',
    fullname : 'Hwa Jai',
    name : '霍查',
    des  : '前吉斯的爪牙，现在和金组队,酒鬼，喝酒后能力斐然',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-365,-95), 
    bps : 1,
    stand : {'w':146,'h':249,'p':cc.p(-155,-10),'fc':10}
};
var RAIDEN = {
    id   : 'RAIDEN',
    fullname : 'Raiden',
    name : '莱丁',
    des  : '和HWA一样都是吉斯的爪牙，脾气暴躁!',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-385,-105),
    stand : {'w':225,'h':261,'p':cc.p(-145,-10),'fc':10}
};
var KING = {
    id   : 'KING',
    fullname : 'King',
    name : '京',
    des  : 'SNK创作的首位女性格斗家，格斗技是泰拳，曾经女扮男装在泰拳大赛中获得冠军，但由于她的弟弟身上患有一种病，行动不方便而且手术费极为昂贵，而King参加泰拳大赛未果，所以亟需用钱的King带着弟弟来到了全世界最多格斗比赛的地方——南镇，King希望在南镇的格斗比赛中得胜赚取奖金，作为弟弟的手术费。',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-385,-105),
    stand : {'w':124,'h':234,'p':cc.p(-145,-10),'fc':9}
};
var MAI = {
    id   : 'MAI',
    fullname : 'Mai Shiranui',
    name : '不知火舞',
    des  : '继承不知火流忍术的女忍者，因为喜欢上了在自己祖父不知火半藏门下修行的安迪伯加德，在追随他的过程中卷入多场战斗。',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-365,-90),
    stand : {'w':150,'h':195,'p':cc.p(-145,-10),'fc':15}
};
var YOURI = {
    id   : 'YOURI',
    fullname : 'Youri Sakazaki',
    name : '坂崎由莉',
    des  : '坂崎家族中的小妹，继承优秀的格斗传统。',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-365,-105),
    stand : {'w':103,'h':222,'p':cc.p(-145,-10),'fc':9}
};
var KDAS = {
    id   : 'KDAS',
    fullname : 'K\'',
    name : 'K\'',
    des  : 'N.E.S.T.S组织最强的改造战士，是1999-2001年的拳皇冠军。原本是为N.E.S.T.S效命，但为了找回失去的记忆而脱离了组织。',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-365,-105),
    bps : 1,
    stand : {'w':152,'h':249,'p':cc.p(-145,-10),'fc':37}
};
var KULA = {
    id   : 'KULA',
    fullname : 'Kula Diamond',
    name : '库拉·戴尔蒙德',
    des  : 'N.E.S.T.S.的上级干部，外表虽然给人冷傲的感觉，但事实上，她和普通的十四岁女孩根本没有分别。',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-385,-90),
    bps : 1,
    stand : {'w':130,'h':233,'p':cc.p(-145,-10),'fc':18}
};
var MAXIMA = {
    id   : 'MAXIMA',
    fullname : 'Maxima',
    name : '马克西马',
    des  : '马克西马是NESTS(音巢)以人体制造而成的半人半机械战士,原本是为了实验而做的,可后来当他知道了自己原本的身份后,和k\'一起叛逃组织,并到处破坏组织的分支基地,和组织对抗',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-385,-95),
    bps : 0.9,
    stand : {'w':194,'h':267,'p':cc.p(-145,-10),'fc':12}  
};
var ATHENA = {
    id   : 'ATHENA',
    fullname : 'Athena Asamiya',
    name : '麻宫雅典娜',
    des  : '一个日本女学生的，雅典娜与Kensou以正义的名义参战。被认为是“英雄之光”(从Shiguma手中拯救了世界)之一的转世。',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-375,-135),
    stand : {'w':150,'h':213,'p':cc.p(-145,-10),'fc':30}
};
var KENSOU = {
    id   : 'KENSOU',
    fullname : 'Sie Kensou',
    name : '椎拳崇',
    des  : '超能力持有者，老牌劲旅.和麻宫雅典娜是男女朋友。师从镇元斋。',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-365,-105),
    stand : {'w':212,'h':216,'p':cc.p(-145,-10),'fc':7}
};
var CHIN = {
    id   : 'CHIN',
    fullname : 'Chin Gentsai',
    name : '镇元斋',
    des  : '他是世界上第一个领悟到大宇宙力量的人，在草剃京出世前，他也是世界第一，当时便无人能敌，只是后来老了多了几分飘逸洒脱，好喝酒，也喜欢烟袋锅子。',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-405,-105),
    stand : {'w':110,'h':165,'p':cc.p(-155,-10),'fc':14}
};
var RALF = {
    id   : 'RALF',
    fullname : 'Ralf Jones',
    name : '拉尔夫·琼斯',
    des  : '哈迪伦的部下，官阶为大佐（上校），个性易怒冲动，责任感极强，对部下没有半点长官的架子，非常关心同为怒队成员的伙伴们。非常讨厌蛇，原因是自己养的鸟曾经被蛇吃掉过。',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-385,-95),
    stand : {'w':172,'h':266,'p':cc.p(-145,-10),'fc':32}
};
var CLARK = {
    id   : 'CLARK',
    fullname : 'Clark Still',
    name : '克拉克·司迪尔',
    des  : '在战场上克拉克被敌人俘虏，并用胶带把他的眼皮撑起来，让他眼睁睁的看他的同伴被杀，后来他爆发了，杀死了所有的敌人逃出来，可是他的眼睛变成了白色，就带上了墨镜，并发誓谁要让他再见到阳光，就一定要他死。',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-365,-95),
    stand : {'w':200,'h':240,'p':cc.p(-145,-10),'fc':8}
};
var LEONA= {
    id   : 'LEONA',
    fullname : 'Leona Heidern',
    name : '雷欧娜·海登',
    des  : '雷欧娜是"八杰集"之一的加迪路的女儿，所以他身体也流淌着大蛇之血。暴走之后很可怕！',
    L_R  : 'L',//L--左边，R--右边
    bp : cc.p(-365,-85),
    stand : {'w':177,'h':244,'p':cc.p(-145,-10),'fc':10}
};
var man2class = {
    'andy'      : ANDY,
    'ash'       : ASH,
    'athena'    : ATHENA,
    'benimaru'  : BENIMARU,
    'chin'      : CHIN,
    'clark'     : CLARK,
    'daimon'    : DAIMON,
    'duolon'    : DUOLON,
    'elisabeth' : ELISABETH,
    'hwa'       : HWA,
    'iori'      : IORI,
    'joe'       : JOE,
    'kdas'      : KDAS,
    'kensou'    : KENSOU,
    'kim'       : KIM,
    'king'      : KING,
    'kula'      : KULA,
    'kyo'       : KYO,
    'leona'     : LEONA,
    'mai'       : MAI,
    'mature'    : MATURE,
    'maxima'    : MAXIMA,
    'raiden'    : RAIDEN,
    'ralf'      : RALF,
    'robert'    : ROBERT,
    'ryo'       : RYO,
    'shen'      : SHEN,
    'takuma'    : TAKUMA,
    'terry'     : TERRY,
    'vice'      : VICE,
    'youri'     : YOURI
};