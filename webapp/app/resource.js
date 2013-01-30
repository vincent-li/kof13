var dirRoleImg = "";
var dirUiImg = "";
var dirBgImg = "";
var dirMusic = "";
var dirVideo = "";
var musicSuffix = ".mp3";
var videoSuffix = ".wmv";

if( cc.config.platform == 'browser') {
    dirRoleImg = "gmres/images/roles/";
    dirUiImg = "gmres/images/ui/";
    dirBgImg = "gmres/images/backgrounds/";
    dirMusic = "gmres/audio/";
    dirVideo = "gmres/video/";
    musicSuffix = "";
}
var rolenames = [
    'kyo','benimaru','daimon','terry','andy','joe','ash','ryo','robert',
    'takuma','iori','mature','vice','elisabeth','duolon','shen','kim',
    'hwa','raiden','king','mai','youri','kdas','kula','maxima','athena',
    'kensou','chin','ralf','clark','leona'
];

//role images
var backposes = {
    'kyo'      : dirRoleImg + "01/kyo.png",
    'benimaru' : dirRoleImg + "02/benimaru.png",
    'daimon'   : dirRoleImg + "03/daimon.png",
    'terry'    : dirRoleImg + "04/terry.png",
    'andy'     : dirRoleImg + "05/andy.png",
    'joe'      : dirRoleImg + "06/joe.png",
    'ash'      : dirRoleImg + "07/ash.png",
    'ryo'      : dirRoleImg + "08/ryo.png",
    'robert'   : dirRoleImg + "09/robert.png",
    'takuma'   : dirRoleImg + "10/takuma.png",
    'iori'     : dirRoleImg + "11/iori.png",
    'mature'   : dirRoleImg + "12/mature.png",
    'vice'     : dirRoleImg + "13/vice.png",
    'elisabeth': dirRoleImg + "14/elisabeth.png",
    'duolon'   : dirRoleImg + "15/duolon.png",
    'shen'     : dirRoleImg + "16/shen.png",
    'kim'      : dirRoleImg + "17/kim.png",
    'hwa'      : dirRoleImg + "18/hwa.png",
    'raiden'   : dirRoleImg + "19/raiden.png",
    'king'     : dirRoleImg + "20/king.png",
    'mai'      : dirRoleImg + "21/mai.png",
    'youri'    : dirRoleImg + "22/youri.png",
    'kdas'     : dirRoleImg + "23/kdas.png",
    'kula'     : dirRoleImg + "24/kula.png",
    'maxima'   : dirRoleImg + "25/maxima.png",
    'athena'   : dirRoleImg + "26/athena.png",
    'kensou'   : dirRoleImg + "27/kensou.png",
    'chin'     : dirRoleImg + "28/chin.png",
    'ralf'     : dirRoleImg + "29/ralf.png",
    'clark'    : dirRoleImg + "30/clark.png",
    'leona'    : dirRoleImg + "31/leona.png"
}
//role images
var stancepose = {
    'kyo'      : dirRoleImg + "01/12s.png",
    'benimaru' : dirRoleImg + "02/12s.png",
    'daimon'   : dirRoleImg + "03/12s.png",
    'terry'    : dirRoleImg + "04/12s.png",
    'andy'     : dirRoleImg + "05/12s.png",
    'joe'      : dirRoleImg + "06/12s.png",
    'ash'      : dirRoleImg + "07/12s.png",
    'ryo'      : dirRoleImg + "08/12s.png",
    'robert'   : dirRoleImg + "09/12s.png",
    'takuma'   : dirRoleImg + "10/12s.png",
    'iori'     : dirRoleImg + "11/12s.png",
    'mature'   : dirRoleImg + "12/12s.png",
    'vice'     : dirRoleImg + "13/12s.png",
    'elisabeth': dirRoleImg + "14/12s.png",
    'duolon'   : dirRoleImg + "15/12s.png",
    'shen'     : dirRoleImg + "16/12s.png",
    'kim'      : dirRoleImg + "17/12s.png",
    'hwa'      : dirRoleImg + "18/12s.png",
    'raiden'   : dirRoleImg + "19/12s.png",
    'king'     : dirRoleImg + "20/12s.png",
    'mai'      : dirRoleImg + "21/12s.png",
    'youri'    : dirRoleImg + "22/12s.png",
    'kdas'     : dirRoleImg + "23/12s.png",
    'kula'     : dirRoleImg + "24/12s.png",
    'maxima'   : dirRoleImg + "25/12s.png",
    'athena'   : dirRoleImg + "26/12s.png",
    'kensou'   : dirRoleImg + "27/12s.png",
    'chin'     : dirRoleImg + "28/12s.png",
    'ralf'     : dirRoleImg + "29/12s.png",
    'clark'    : dirRoleImg + "30/12s.png",
    'leona'    : dirRoleImg + "31/12s.png"
}
var fight = {
    'kyo' : dirRoleImg + "01/kyo-f.png"
}
//select face-选择任务角色时候的头像
var roleSelectFaces = {
    '1' : dirRoleImg + "01/select_face_01.png",
    '2' : dirRoleImg + "02/select_face_02.png",
    '3' : dirRoleImg + "03/select_face_03.png",
    '4' : dirRoleImg + "04/select_face_04.png",
    '5' : dirRoleImg + "05/select_face_05.png",
    '6' : dirRoleImg + "06/select_face_06.png",
    '7' : dirRoleImg + "07/select_face_07.png",
    '8' : dirRoleImg + "08/select_face_08.png",
    '9' : dirRoleImg + "09/select_face_09.png",
    '10' : dirRoleImg + "10/select_face_10.png",
    '11' : dirRoleImg + "11/select_face_11.png",
    '12' : dirRoleImg + "12/select_face_12.png",
    '13' : dirRoleImg + "13/select_face_13.png",
    '14' : dirRoleImg + "14/select_face_14.png",
    '15' : dirRoleImg + "15/select_face_15.png",
    '16' : dirRoleImg + "16/select_face_16.png",
    '17' : dirRoleImg + "17/select_face_17.png",
    '18' : dirRoleImg + "18/select_face_18.png",
    '19' : dirRoleImg + "19/select_face_19.png",
    '20' : dirRoleImg + "20/select_face_20.png",
    '21' : dirRoleImg + "21/select_face_21.png",
    '22' : dirRoleImg + "22/select_face_22.png",
    '23' : dirRoleImg + "23/select_face_23.png",
    '24' : dirRoleImg + "24/select_face_24.png",
    '25' : dirRoleImg + "25/select_face_25.png",
    '26' : dirRoleImg + "26/select_face_26.png",
    '27' : dirRoleImg + "27/select_face_27.png",
    '28' : dirRoleImg + "28/select_face_28.png",
    '29' : dirRoleImg + "29/select_face_29.png",
    '30' : dirRoleImg + "30/select_face_30.png",
    '31' : dirRoleImg + "31/select_face_31.png"
}

//role fight faces-战斗时候出现在血条旁的头像
var roleFightFasces = {
    'kyo' : dirRoleImg + "01/battle_face_01.png",
    'benimaru' : dirRoleImg + "02/battle_face_02.png",
    'daimon' : dirRoleImg + "03/battle_face_03.png",
    'terry' : dirRoleImg + "04/battle_face_04.png",
    'andy' : dirRoleImg + "05/battle_face_05.png",
    'joe' : dirRoleImg + "06/battle_face_06.png",
    'ash' : dirRoleImg + "07/battle_face_07.png",
    'ryo' : dirRoleImg + "08/battle_face_08.png",
    'robert' : dirRoleImg + "09/battle_face_09.png",
    'takuma' : dirRoleImg + "10/battle_face_10.png",
    'iori' : dirRoleImg + "11/battle_face_11.png",
    'mature' : dirRoleImg + "12/battle_face_12.png",
    'vice' : dirRoleImg + "13/battle_face_13.png",
    'elisabeth' : dirRoleImg + "14/battle_face_14.png",
    'duolon' : dirRoleImg + "15/battle_face_15.png",
    'shen' : dirRoleImg + "16/battle_face_16.png",
    'kim' : dirRoleImg + "17/battle_face_17.png",
    'hwa' : dirRoleImg + "18/battle_face_18.png",
    'raiden' : dirRoleImg + "19/battle_face_19.png",
    'king' : dirRoleImg + "20/battle_face_20.png",
    'mai' : dirRoleImg + "21/battle_face_21.png",
    'youri' : dirRoleImg + "22/battle_face_22.png",
    'kdas' : dirRoleImg + "23/battle_face_23.png",
    'kula' : dirRoleImg + "24/battle_face_24.png",
    'maxima' : dirRoleImg + "25/battle_face_25.png",
    'athena' : dirRoleImg + "26/battle_face_26.png",
    'kensou' : dirRoleImg + "27/battle_face_27.png",
    'chin' : dirRoleImg + "28/battle_face_28.png",
    'ralf' : dirRoleImg + "29/battle_face_29.png",
    'clark' : dirRoleImg + "30/battle_face_30.png",
    'leona' : dirRoleImg + "31/battle_face_31.png"
};

var uiIamges = {
    'logo' : dirUiImg + "logo.png",
    's_bg1' : dirUiImg + "BG1.png",
    's_bg2' : dirUiImg + "BG2.png",
    's_time' : dirUiImg + "01_time.png",
    's_time_l' : dirUiImg + "12_hikari.png",
    's_time_0' : dirUiImg + "01_time_0.png",
    's_time_1' : dirUiImg + "01_time_1.png",
    's_time_2' : dirUiImg + "01_time_2.png",
    's_time_3' : dirUiImg + "01_time_3.png",
    's_time_4' : dirUiImg + "01_time_4.png",
    's_time_5' : dirUiImg + "01_time_5.png",
    's_time_6' : dirUiImg + "01_time_6.png",
    's_time_7' : dirUiImg + "01_time_7.png",
    's_time_8' : dirUiImg + "01_time_8.png",
    's_time_9' : dirUiImg + "01_time_9.png",
    's_1p' : dirUiImg + "01_cursor1P.png",
    's_2p' : dirUiImg + "01_cursor2P.png",
    's_1p_l' : dirUiImg + "01_light.png",
    's_star' : dirUiImg + "diamond.png",
    's_random' : dirUiImg +'01_random.png',
    's_b_group' : dirUiImg + "01_icon_AC.png",
    's_b_one' : dirUiImg + "01_icon_one.png",
    's_red_floor' : dirUiImg + "red_floor.png",
    's_des' : dirUiImg + "select_des.png",
    's_s_n_b': dirUiImg + "select_name.png"
};

var fightUI = {
    'blood_bar' : dirUiImg + "f_blood_bar.png",
    'power_bar' : dirUiImg + "f_power.png",
    'bg1' : dirBgImg + "1.png",
    'bg2' : dirBgImg + "2.png",
    'bg3' : dirBgImg + "3.png",
    'bg4' : dirBgImg + "4.png",
    'bg5' : dirBgImg + "5.png",
    'bg6' : dirBgImg + "6.png",
    'kyo' : dirRoleImg + "01/battle_face_01.dds",
    'b_p' : dirUiImg + "b_p.png"
}

var fightMovements = {
    'kyo' : dirRoleImg + "01/fight.png",
    'benimaru' : dirRoleImg + "02/fight.png",
    'daimon' : dirRoleImg + "03/fight.png",
    'terry' : dirRoleImg + "04/fight.png",
    'andy' : dirRoleImg + "05/fight.png",
    'joe' : dirRoleImg + "06/fight.png",
    'ash' : dirRoleImg + "07/fight.png",
    'ryo' : dirRoleImg + "08/fight.png",
    'robert' : dirRoleImg + "09/fight.png",
    'takuma' : dirRoleImg + "10/fight.png",
    'iori' : dirRoleImg + "11/fight.png",
    'mature' : dirRoleImg + "12/fight.png",
    'vice' : dirRoleImg + "13/fight.png",
    'elisabeth' : dirRoleImg + "14/fight.png",
    'duolon' : dirRoleImg + "15/fight.png",
    'shen' : dirRoleImg + "16/fight.png",
    'kim' : dirRoleImg + "17/fight.png",
    'hwa' : dirRoleImg + "18/fight.png",
    'raiden' : dirRoleImg + "19/fight.png",
    'king' : dirRoleImg + "20/fight.png",
    'mai' : dirRoleImg + "21/fight.png",
    'youri' : dirRoleImg + "22/fight.png",
    'kdas' : dirRoleImg + "23/fight.png",
    'kula' : dirRoleImg + "24/fight.png",
    'maxima' : dirRoleImg + "25/fight.png",
    'athena' : dirRoleImg + "26/fight.png",
    'kensou' : dirRoleImg + "27/fight.png",
    'chin' : dirRoleImg + "28/fight.png",
    'ralf' : dirRoleImg + "29/fight.png",
    'clark' : dirRoleImg + "30/fight.png",
    'leona' : dirRoleImg + "31/fight.png"
}

var g_ressources = [];

function generatePreload(){
    for (var k in roleSelectFaces){
        g_ressources.push({
            type:"image",
            src:roleSelectFaces[k]
        });
    }
    for (var k in uiIamges){
        g_ressources.push({
            type:"image",
            src:uiIamges[k]
        });
    }
    for (var k in backposes){
        g_ressources.push({
            type:"image",
            src:backposes[k]
        });
    }
    
}

generatePreload();