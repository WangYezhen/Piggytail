window.turn_p2c = 0;
window.layer_p2c = [];
window.store_p2c = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK', 
        'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK', 
        'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK', 
        'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK'];
window.epoch_p2c = 1;
window.cardp2c_1c = [];
window.cardp2c_1d = [];
window.cardp2c_1h = [];
window.cardp2c_1s = [];
window.cardp2c_2c = [];
window.cardp2c_2d = [];
window.cardp2c_2h = [];
window.cardp2c_2s = [];
window.value_p2c = 0;
window.kind_p2c = '';

cc.Class({
    extends: cc.Component,

    properties: {
        
    },


    // onLoad () {},

    start () {
        turn_p2c = 1;
        if(turn_p2c == 1) {
            cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="玩家回合";
        } 
        store_p2c = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK', 
        'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK', 
        'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK', 
        'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK'];
        layer_p2c = [];
        epoch_p2c = 1;
        cardp2c_1c = [];
        cardp2c_1d = [];
        cardp2c_1h = [];
        cardp2c_1s = [];
        cardp2c_2c = [];
        cardp2c_2d = [];
        cardp2c_2h = [];
        cardp2c_2s = [];
        value_p2c = 0;
        kind_p2c = '';

        store_p2c.sort(function(){return Math.random()>0.5?-1:1;}); 
    },

    robot_test () {
        let robot = cc.find("Canvas/New Sprite(Splash)/robot").getComponent('gamep2c');
        if (value_p2c == 0) {
            let maxvalue = Math.max(cardp2c_2c.length, cardp2c_2d.length, cardp2c_2h.length, cardp2c_2s.length);
            if(maxvalue == cardp2c_2c.length) {kind_p2c = 'C';}
            else if(maxvalue == cardp2c_2d.length) {kind_p2c = 'D';}
            else if(maxvalue == cardp2c_2h.length) {kind_p2c = 'H';}
            else {kind_p2c = 'S';}
            value_p2c = maxvalue;
        }
        if (layer_p2c.length == 0) {
            if (value_p2c == 0) {
                robot.tap_store();
            } else {
                if(kind_p2c == 'C') {robot.tap_2c(); value_p2c--;}
                else if(kind_p2c == 'D') {robot.tap_2d(); value_p2c--;}
                else if(kind_p2c == 'H') {robot.tap_2h(); value_p2c--;}
                else if(kind_p2c == 'S') {robot.tap_2s(); value_p2c--;}
            }
        } else {
            if (value_p2c == 0) {
                robot.tap_store();
            } else {
                if(kind_p2c == 'C' && layer_p2c[layer_p2c.length-1][0]!='C') {robot.tap_2c(); value_p2c--;}
                else if(kind_p2c == 'D' && layer_p2c[layer_p2c.length-1][0]!='D') {robot.tap_2d(); value_p2c--;}
                else if(kind_p2c == 'H' && layer_p2c[layer_p2c.length-1][0]!='H') {robot.tap_2h(); value_p2c--;}
                else if(kind_p2c == 'S' && layer_p2c[layer_p2c.length-1][0]!='S') {robot.tap_2s(); value_p2c--;}
                else {
                    if (cardp2c_2c.length!=0 && layer_p2c[layer_p2c.length-1][0]!='C') {robot.tap_2c();}
                    else if (cardp2c_2d.length!=0 && layer_p2c[layer_p2c.length-1][0]!='D') {robot.tap_2d();}
                    else if (cardp2c_2h.length!=0 && layer_p2c[layer_p2c.length-1][0]!='H') {robot.tap_2h();}
                    else if (cardp2c_2s.length!=0 && layer_p2c[layer_p2c.length-1][0]!='S') {robot.tap_2s();}
                    else {robot.tap_store();}
                }
            }
        }
    },

    tap_store() {
        cc.log('turn: ',turn_p2c);
        let card_name = store_p2c[store_p2c.length-1];
        cc.log('cardname: ', card_name);
        cc.log(cardp2c_1c,cardp2c_1d,cardp2c_1h,cardp2c_1s);
        let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
        card_now.active = true;
        card_now.zIndex = epoch++;
        card_now.x = 99;
        card_now.y = 0;
        store_p2c.pop();
        if (turn_p2c == 2) {
            cc.log("机器人翻牌： ", card_name);
        }
        if (layer_p2c.length == 0) {
            layer_p2c.push(card_name);
            cc.log("0",layer_p2c);
        } else {
            if (layer_p2c[layer_p2c.length-1][0] != card_name[0]) {
                layer_p2c.push(card_name);
                cc.log("1",layer_p2c);
            } else if(layer_p2c[layer_p2c.length-1][0] == card_name[0]) {
                if(turn_p2c == 1) {
                    layer_p2c.push(card_name);
                    cc.log("2",layer_p2c);
                    for(let i=0; i<layer_p2c.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer_p2c[i]);
                        if (layer_p2c[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_1c.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/mc_label").getComponent(cc.Label).string=String(cardp2c_1c.length);
                        } else if(layer_p2c[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_1d.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/md_label").getComponent(cc.Label).string=String(cardp2c_1d.length);
                        } else if(layer_p2c[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_1h.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/mh_label").getComponent(cc.Label).string=String(cardp2c_1h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_1s.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/ms_label").getComponent(cc.Label).string=String(cardp2c_1s.length);
                        }
                    }
                } else if(turn_p2c == 2) {
                    layer_p2c.push(card_name);
                    cc.log("3",layer_p2c);
                    for(let i=0; i<layer_p2c.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer_p2c[i]);
                        if (layer_p2c[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_2c.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/oc_label").getComponent(cc.Label).string=String(cardp2c_2c.length);
                        } else if(layer_p2c[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_2d.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/od_label").getComponent(cc.Label).string=String(cardp2c_2d.length);
                        } else if(layer_p2c[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_2h.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/oh_label").getComponent(cc.Label).string=String(cardp2c_2h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_2s.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/os_label").getComponent(cc.Label).string=String(cardp2c_2s.length);
                        }
                    }
                }
                layer_p2c = [];
            }
        }
        if (turn_p2c == 1) {
            turn_p2c = 2;
            cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="机器人回合";
            let robot = cc.find("Canvas/New Sprite(Splash)/robot").getComponent('gamep2c');
            robot.robot_test();
        } else {
            turn_p2c = 1;
            cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="玩家回合";
        }
    if(store_p2c.length == 0) {
        cc.log("finished!");
        let total_1 = cardp2c_1c.length + cardp2c_1d.length + cardp2c_1h.length + cardp2c_1s.length;
        let total_2 = cardp2c_2c.length + cardp2c_2d.length + cardp2c_2h.length + cardp2c_2s.length;
        cc.find("Canvas/New Sprite(Splash)/Mask").zIndex = 999;
        cc.find("Canvas/New Sprite(Splash)/Mask").active = true;
        cc.find("Canvas/New Sprite(Splash)/result").zIndex = 9999;
        cc.find("Canvas/New Sprite(Splash)/result").active = true;
        if (total_1 < total_2) {
            cc.find("Canvas/New Sprite(Splash)/result/result_label").getComponent(cc.Label).string = "玩家获胜";
        } else if(total_2 < total_1) {
            cc.find("Canvas/New Sprite(Splash)/result/result_label").getComponent(cc.Label).string = "机器人获胜";
        } else {
            cc.find("Canvas/New Sprite(Splash)/result/result_label").getComponent(cc.Label).string = "平局";
        }
    }
    },

    tap_1c() {
        if(turn_p2c == 1) {
            if(cardp2c_1c.length != 0) {
                let card_name = cardp2c_1c[cardp2c_1c.length-1];
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y = 0;
                card_now.width = 60;
                card_now.height = 90;
                cardp2c_1c.pop();
                cc.find("Canvas/New Sprite(Splash)/mc_label").getComponent(cc.Label).string=String(cardp2c_1c.length);
                if (layer_p2c.length == 0 || layer_p2c[layer_p2c.length-1][0] != card_name[0]) {
                    layer_p2c.push(card_name);
                } else if(layer_p2c[layer_p2c.length-1][0] == card_name[0]){
                    layer_p2c.push(card_name);
                    for(let i=0; i<layer_p2c.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer_p2c[i]);
                        if (layer_p2c[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_1c.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/mc_label").getComponent(cc.Label).string=String(cardp2c_1c.length);
                        } else if(layer_p2c[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_1d.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/md_label").getComponent(cc.Label).string=String(cardp2c_1d.length);
                        } else if(layer_p2c[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_1h.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/mh_label").getComponent(cc.Label).string=String(cardp2c_1h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_1s.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/ms_label").getComponent(cc.Label).string=String(cardp2c_1s.length);
                        }
                    }
                    layer_p2c = [];
                }
                turn_p2c = 2;
                cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="机器人回合";
                let robot = cc.find("Canvas/New Sprite(Splash)/robot").getComponent('gamep2c');
                robot.robot_test();
            }
        }
    },

    tap_1d() {
        if(turn_p2c == 1) {
            if(cardp2c_1d.length != 0) {
                let card_name = cardp2c_1d[cardp2c_1d.length-1];
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y = 0;
                card_now.width = 60;
                card_now.height = 90;
                cardp2c_1d.pop();
                cc.find("Canvas/New Sprite(Splash)/md_label").getComponent(cc.Label).string=String(cardp2c_1d.length);
                if (layer_p2c.length == 0) {
                    layer_p2c.push(card_name);
                } else {
                    if(layer_p2c[layer_p2c.length-1][0] != card_name[0]) {
                        cc.log('card_',card_name)
                        cc.log('layer_',layer_p2c[layer_p2c.length-1]);
                        layer_p2c.push(card_name);
                    }else if(layer_p2c[layer_p2c.length-1][0] == card_name[0]){
                        layer_p2c.push(card_name);
                        for(let i=0; i<layer_p2c.length; i++) {
                            card_now = cc.find("Canvas/New Sprite(Splash)/"+layer_p2c[i]);
                            if (layer_p2c[i][0] == 'C'){
                                card_now.zIndex = epoch++;
                                card_now.x = -280;
                                card_now.y = -219;
                                card_now.width = 100;
                                card_now.height = 150;
                                cardp2c_1c.push(layer_p2c[i]);
                                cc.find("Canvas/New Sprite(Splash)/mc_label").getComponent(cc.Label).string=String(cardp2c_1c.length);
                            } else if(layer_p2c[i][0] == 'D') {
                                card_now.zIndex = epoch++;
                                card_now.x = -81;
                                card_now.y = -219;
                                card_now.width = 100;
                                card_now.height = 150;
                                cardp2c_1d.push(layer_p2c[i]);
                                cc.find("Canvas/New Sprite(Splash)/md_label").getComponent(cc.Label).string=String(cardp2c_1d.length);
                            } else if(layer_p2c[i][0] == 'H') {
                                card_now.zIndex = epoch++;
                                card_now.x = 119;
                                card_now.y = -219;
                                card_now.width = 100;
                                card_now.height = 150;
                                cardp2c_1h.push(layer_p2c[i]);
                                cc.find("Canvas/New Sprite(Splash)/mh_label").getComponent(cc.Label).string=String(cardp2c_1h.length);
                            } else {
                                card_now.zIndex = epoch++;
                                card_now.x = 321;
                                card_now.y = -219;
                                card_now.width = 100;
                                card_now.height = 150;
                                cardp2c_1s.push(layer_p2c[i]);
                                cc.find("Canvas/New Sprite(Splash)/ms_label").getComponent(cc.Label).string=String(cardp2c_1s.length);
                            }
                        }
                        layer_p2c = [];
                    }
                }
                turn_p2c = 2;
                cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="机器人回合";
                let robot = cc.find("Canvas/New Sprite(Splash)/robot").getComponent('gamep2c');
                robot.robot_test();
            }
        }
    },

    tap_1h() {
        if(turn_p2c == 1) {
            if(cardp2c_1h.length != 0) {
                let card_name = cardp2c_1h[cardp2c_1h.length-1];
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y = 0;
                card_now.width = 60;
                card_now.height = 90;
                cardp2c_1h.pop();
                cc.find("Canvas/New Sprite(Splash)/mh_label").getComponent(cc.Label).string=String(cardp2c_1h.length);
                if (layer_p2c.length == 0 || layer_p2c[layer_p2c.length-1][0] != card_name[0]) {
                    layer_p2c.push(card_name);
                } else if(layer_p2c[layer_p2c.length-1][0] == card_name[0]){
                    layer_p2c.push(card_name);
                    for(let i=0; i<layer_p2c.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer_p2c[i]);
                        if (layer_p2c[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_1c.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/mc_label").getComponent(cc.Label).string=String(cardp2c_1c.length);
                        } else if(layer_p2c[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_1d.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/md_label").getComponent(cc.Label).string=String(cardp2c_1d.length);
                        } else if(layer_p2c[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_1h.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/mh_label").getComponent(cc.Label).string=String(cardp2c_1h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_1s.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/ms_label").getComponent(cc.Label).string=String(cardp2c_1s.length);
                        }
                    }
                    layer_p2c = [];
                }
                turn_p2c = 2;
                cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="机器人回合";
                let robot = cc.find("Canvas/New Sprite(Splash)/robot").getComponent('gamep2c');
                robot.robot_test();
            }
        }
    },

    tap_1s() {
        if(turn_p2c == 1) {
            if(cardp2c_1s.length != 0) {
                let card_name = cardp2c_1s[cardp2c_1s.length-1];
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y = 0;
                card_now.width = 60;
                card_now.height = 90;
                cardp2c_1s.pop();
                cc.find("Canvas/New Sprite(Splash)/ms_label").getComponent(cc.Label).string=String(cardp2c_1s.length);
                if (layer_p2c.length == 0 || layer_p2c[layer_p2c.length-1][0] != card_name[0]) {
                    layer_p2c.push(card_name);
                } else if(layer_p2c[layer_p2c.length-1][0] == card_name[0]){
                    layer_p2c.push(card_name);
                    for(let i=0; i<layer_p2c.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer_p2c[i]);
                        if (layer_p2c[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_1c.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/mc_label").getComponent(cc.Label).string=String(cardp2c_1c.length);
                        } else if(layer_p2c[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_1d.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/md_label").getComponent(cc.Label).string=String(cardp2c_1d.length);
                        } else if(layer_p2c[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_1h.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/mh_label").getComponent(cc.Label).string=String(cardp2c_1h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_1s.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/ms_label").getComponent(cc.Label).string=String(cardp2c_1s.length);
                        }
                    }
                    layer_p2c = [];
                }
                turn_p2c = 2;
                cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="机器人回合";
                let robot = cc.find("Canvas/New Sprite(Splash)/robot").getComponent('gamep2c');
                robot.robot_test();
            }
        }
    },

    tap_2c() {
        if(turn_p2c == 2) {
            if(cardp2c_2c.length != 0) {
                let card_name = cardp2c_2c[cardp2c_2c.length-1];
                cc.log("机器人出牌： ", card_name);
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y = 0;
                card_now.width = 60;
                card_now.height = 90;
                cardp2c_2c.pop();
                cc.find("Canvas/New Sprite(Splash)/oc_label").getComponent(cc.Label).string=String(cardp2c_2c.length);
                if (layer_p2c.length == 0 || layer_p2c[layer_p2c.length-1][0] != card_name[0]) {
                    layer_p2c.push(card_name);
                } else if(layer_p2c[layer_p2c.length-1][0] == card_name[0]){
                    layer_p2c.push(card_name);
                    for(let i=0; i<layer_p2c.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer_p2c[i]);
                        if (layer_p2c[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_2c.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/oc_label").getComponent(cc.Label).string=String(cardp2c_2c.length);
                        } else if(layer_p2c[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_2d.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/od_label").getComponent(cc.Label).string=String(cardp2c_2d.length);
                        } else if(layer_p2c[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_2h.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/oh_label").getComponent(cc.Label).string=String(cardp2c_2h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_2s.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/os_label").getComponent(cc.Label).string=String(cardp2c_2s.length);
                        }
                    }
                    layer_p2c = [];
                }
                turn_p2c = 1;
                cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="玩家回合";
            }
        }
    },

    tap_2d() {
        if(turn_p2c == 2) {
            if(cardp2c_2d.length != 0) {
                let card_name = cardp2c_2d[cardp2c_2d.length-1];
                cc.log("机器人出牌： ", card_name);
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y = 0;
                card_now.width = 60;
                card_now.height = 90;
                cardp2c_2d.pop();
                cc.find("Canvas/New Sprite(Splash)/od_label").getComponent(cc.Label).string=String(cardp2c_2d.length);
                if (layer_p2c.length == 0) {
                    layer_p2c.push(card_name);
                } else {
                    if(layer_p2c[layer_p2c.length-1][0] != card_name[0]) {
                        cc.log('card_',card_name)
                        cc.log('layer_',layer_p2c[layer_p2c.length-1]);
                        layer_p2c.push(card_name);
                    }else if(layer_p2c[layer_p2c.length-1][0] == card_name[0]){
                        layer_p2c.push(card_name);
                        for(let i=0; i<layer_p2c.length; i++) {
                            card_now = cc.find("Canvas/New Sprite(Splash)/"+layer_p2c[i]);
                            if (layer_p2c[i][0] == 'C'){
                                card_now.zIndex = epoch++;
                                card_now.x = -280;
                                card_now.y = 232;
                                card_now.width = 100;
                                card_now.height = 150;
                                cardp2c_2c.push(layer_p2c[i]);
                                cc.find("Canvas/New Sprite(Splash)/oc_label").getComponent(cc.Label).string=String(cardp2c_2c.length);
                            } else if(layer_p2c[i][0] == 'D') {
                                card_now.zIndex = epoch++;
                                card_now.x = -81;
                                card_now.y = 232;
                                card_now.width = 100;
                                card_now.height = 150;
                                cardp2c_2d.push(layer_p2c[i]);
                                cc.find("Canvas/New Sprite(Splash)/od_label").getComponent(cc.Label).string=String(cardp2c_2d.length);
                            } else if(layer_p2c[i][0] == 'H') {
                                card_now.zIndex = epoch++;
                                card_now.x = 119;
                                card_now.y = 232;
                                card_now.width = 100;
                                card_now.height = 150;
                                cardp2c_2h.push(layer_p2c[i]);
                                cc.find("Canvas/New Sprite(Splash)/oh_label").getComponent(cc.Label).string=String(cardp2c_2h.length);
                            } else {
                                card_now.zIndex = epoch++;
                                card_now.x = 321;
                                card_now.y = 232;
                                card_now.width = 100;
                                card_now.height = 150;
                                cardp2c_2s.push(layer_p2c[i]);
                                cc.find("Canvas/New Sprite(Splash)/os_label").getComponent(cc.Label).string=String(cardp2c_2s.length);
                            }
                        }
                        layer_p2c = [];
                    }
                }
                turn_p2c = 1;
                cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="玩家回合";
            }
        }
    },

    tap_2h() {
        if(turn_p2c == 2) {
            if(cardp2c_2h.length != 0) {
                let card_name = cardp2c_2h[cardp2c_2h.length-1];
                cc.log("机器人出牌： ", card_name);
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y = 0;
                card_now.width = 60;
                card_now.height = 90;
                cardp2c_2h.pop();
                cc.find("Canvas/New Sprite(Splash)/oh_label").getComponent(cc.Label).string=String(cardp2c_2h.length);
                if (layer_p2c.length == 0 || layer_p2c[layer_p2c.length-1][0] != card_name[0]) {
                    layer_p2c.push(card_name);
                } else if(layer_p2c[layer_p2c.length-1][0] == card_name[0]){
                    layer_p2c.push(card_name);
                    for(let i=0; i<layer_p2c.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer_p2c[i]);
                        if (layer_p2c[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_2c.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/oc_label").getComponent(cc.Label).string=String(cardp2c_2c.length);
                        } else if(layer_p2c[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_2d.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/od_label").getComponent(cc.Label).string=String(cardp2c_2d.length);
                        } else if(layer_p2c[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_2h.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/oh_label").getComponent(cc.Label).string=String(cardp2c_2h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_2s.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/os_label").getComponent(cc.Label).string=String(cardp2c_2s.length);
                        }
                    }
                    layer_p2c = [];
                }
                turn_p2c = 1;
                cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="玩家回合";
            }
        }
    },

    tap_2s() {
        if(turn_p2c == 2) {
            if(cardp2c_2s.length != 0) {
                let card_name = cardp2c_2s[cardp2c_2s.length-1];
                cc.log("机器人出牌： ", card_name);
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y = 0;
                card_now.width = 60;
                card_now.height = 90;
                cardp2c_2s.pop();
                cc.find("Canvas/New Sprite(Splash)/os_label").getComponent(cc.Label).string=String(cardp2c_2s.length);
                if (layer_p2c.length == 0 || layer_p2c[layer_p2c.length-1][0] != card_name[0]) {
                    layer_p2c.push(card_name);
                } else if(layer_p2c[layer_p2c.length-1][0] == card_name[0]){
                    layer_p2c.push(card_name);
                    for(let i=0; i<layer_p2c.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer_p2c[i]);
                        if (layer_p2c[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_2c.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/oc_label").getComponent(cc.Label).string=String(cardp2c_2c.length);
                        } else if(layer_p2c[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_2d.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/od_label").getComponent(cc.Label).string=String(cardp2c_2d.length);
                        } else if(layer_p2c[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_2h.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/oh_label").getComponent(cc.Label).string=String(cardp2c_2h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            cardp2c_2s.push(layer_p2c[i]);
                            cc.find("Canvas/New Sprite(Splash)/os_label").getComponent(cc.Label).string=String(cardp2c_2s.length);
                        }
                    }
                    layer_p2c = [];
                }
                turn_p2c = 1;
                cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="玩家回合";
            }
        }
    },
    
    tap_back() {
        cc.director.loadScene("MainScene");
    },
    // update (dt) {},
});
