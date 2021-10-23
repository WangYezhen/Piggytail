window.turn_p2p = 0;
window.layer_p2p = [];
window.store_p2p = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK', 
        'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK', 
        'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK', 
        'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK'];
window.epoch_p2p = 1;
window.card_1c = [];
window.card_1d = [];
window.card_1h = [];
window.card_1s = [];
window.card_2c = [];
window.card_2d = [];
window.card_2h = [];
window.card_2s = [];
// window.self = null; 

cc.Class({
    extends: cc.Component,
    properties: {
        mask : cc.Node,
        result : cc.Node,
        result_ok : cc.Button,
        result_label : cc.Label,
        oc_label : cc.Label,
        od_label : cc.Label,
        oh_label : cc.Label,
        os_label : cc.Label,
        mc_label : cc.Label,
        md_label : cc.Label,
        mh_label : cc.Label,
        ms_label : cc.Label,
        turn_label : cc.Label,
    },


    onLoad () {
    },

    start () {
        self = this;
        
        random1 = function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        let rad = random1(1, 3);
        cc.log(rad);
        turn_p2p = rad;
        if(turn_p2p == 1) {
            cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="1P回合";
        } 
        if(turn_p2p == 2) {
            cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="2P回合";
        }
        store_p2p = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK', 
        'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK', 
        'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK', 
        'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK'];
        epoch_p2p = 1;
        card_1c = [];
        card_1d = [];
        card_1h = [];
        card_1s = [];
        card_2c = [];
        card_2d = [];
        card_2h = [];
        card_2s = [];

        store_p2p.sort(function(){return Math.random()>0.5?-1:1;}); 


    },

    tap_store() {
        cc.log('turn: ',turn_p2p);
        let card_name = store_p2p[store_p2p.length-1];
        cc.log('cardname: ', card_name);
        cc.log(card_1c,card_1d,card_1h,card_1s);
        let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
        card_now.active = true;
        card_now.zIndex = epoch++;
        card_now.x = 99;
        card_now.y = 0;
        store_p2p.pop();
        if (layer_p2p.length == 0) {
            layer_p2p.push(card_name);
            cc.log("0",layer_p2p);
        } else {
            if (layer_p2p[layer_p2p.length-1][0] != card_name[0]) {
                layer_p2p.push(card_name);
                cc.log("1",layer_p2p);
            } else if(layer_p2p[layer_p2p.length-1][0] == card_name[0]) {
                if(turn_p2p == 1) {
                    layer_p2p.push(card_name);
                    cc.log("2",layer_p2p);
                    for(let i=0; i<layer_p2p.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer_p2p[i]);
                        if (layer_p2p[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_1c.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/mc_label").getComponent(cc.Label).string=String(card_1c.length);
                        } else if(layer_p2p[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_1d.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/md_label").getComponent(cc.Label).string=String(card_1d.length);
                        } else if(layer_p2p[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_1h.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/mh_label").getComponent(cc.Label).string=String(card_1h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_1s.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/ms_label").getComponent(cc.Label).string=String(card_1s.length);
                        }
                    }
                } else if(turn_p2p == 2) {
                    layer_p2p.push(card_name);
                    cc.log("3",layer_p2p);
                    for(let i=0; i<layer_p2p.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer_p2p[i]);
                        if (layer_p2p[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_now.rotation = 180;
                            card_2c.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/oc_label").getComponent(cc.Label).string=String(card_2c.length);
                        } else if(layer_p2p[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_now.rotation = 180;
                            card_2d.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/od_label").getComponent(cc.Label).string=String(card_2d.length);
                        } else if(layer_p2p[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_now.rotation = 180;
                            card_2h.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/oh_label").getComponent(cc.Label).string=String(card_2h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_now.rotation = 180;
                            card_2s.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/os_label").getComponent(cc.Label).string=String(card_2s.length);
                        }
                    }
                }
                layer_p2p = [];
            }
        }
        if (turn_p2p == 1) {
            turn_p2p = 2;
            cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="2P回合";
        } else {
            turn_p2p = 1;
            cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="1P回合";
        }
    if(store_p2p.length == 0) {
        cc.log("finished!");
        let total_1 = card_1c.length + card_1d.length + card_1h.length + card_1s.length;
        let total_2 = card_2c.length + card_2d.length + card_2h.length + card_2s.length;
        cc.find("Canvas/New Sprite(Splash)/Mask").zIndex = 999;
        cc.find("Canvas/New Sprite(Splash)/Mask").active = true;
        cc.find("Canvas/New Sprite(Splash)/result").zIndex = 9999;
        cc.find("Canvas/New Sprite(Splash)/result").active = true;
        if (total_1 < total_2) {
            cc.find("Canvas/New Sprite(Splash)/result/result_label").getComponent(cc.Label).string = "1P获胜";
        } else if(total_2 < total_1) {
            cc.find("Canvas/New Sprite(Splash)/result/result_label").getComponent(cc.Label).string = "2P获胜";
        } else {
            cc.find("Canvas/New Sprite(Splash)/result/result_label").getComponent(cc.Label).string = "平局";
        }
    }
    },

    tap_1c() {
        if(turn_p2p == 1) {
            if(card_1c.length != 0) {
                let card_name = card_1c[card_1c.length-1];
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y = 0;
                card_now.width = 60;
                card_now.height = 90;
                card_1c.pop();
                cc.find("Canvas/New Sprite(Splash)/mc_label").getComponent(cc.Label).string=String(card_1c.length);
                if (layer_p2p.length == 0 || layer_p2p[layer_p2p.length-1][0] != card_name[0]) {
                    layer_p2p.push(card_name);
                } else if(layer_p2p[layer_p2p.length-1][0] == card_name[0]){
                    layer_p2p.push(card_name);
                    for(let i=0; i<layer_p2p.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer_p2p[i]);
                        if (layer_p2p[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_1c.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/mc_label").getComponent(cc.Label).string=String(card_1c.length);
                        } else if(layer_p2p[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_1d.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/md_label").getComponent(cc.Label).string=String(card_1d.length);
                        } else if(layer_p2p[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_1h.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/mh_label").getComponent(cc.Label).string=String(card_1h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_1s.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/ms_label").getComponent(cc.Label).string=String(card_1s.length);
                        }
                    }
                    layer_p2p = [];
                }
                turn_p2p = 2;
                cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="2P回合";
            }
        }
    },

    tap_1d() {
        if(turn_p2p == 1) {
            if(card_1d.length != 0) {
                let card_name = card_1d[card_1d.length-1];
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y = 0;
                card_now.width = 60;
                card_now.height = 90;
                card_1d.pop();
                cc.find("Canvas/New Sprite(Splash)/md_label").getComponent(cc.Label).string=String(card_1d.length);
                if (layer_p2p.length == 0) {
                    layer_p2p.push(card_name);
                } else {
                    if(layer_p2p[layer_p2p.length-1][0] != card_name[0]) {
                        cc.log('card_',card_name)
                        cc.log('layer_',layer_p2p[layer_p2p.length-1]);
                        layer_p2p.push(card_name);
                        cc.log('11111111111')
                    }else if(layer_p2p[layer_p2p.length-1][0] == card_name[0]){
                        cc.log('222222222222');
                        layer_p2p.push(card_name);
                        cc.log('33333333333');
                        for(let i=0; i<layer_p2p.length; i++) {
                            card_now = cc.find("Canvas/New Sprite(Splash)/"+layer_p2p[i]);
                            if (layer_p2p[i][0] == 'C'){
                                card_now.zIndex = epoch++;
                                card_now.x = -280;
                                card_now.y = -219;
                                card_now.width = 100;
                                card_now.height = 150;
                                card_1c.push(layer_p2p[i]);
                                cc.find("Canvas/New Sprite(Splash)/mc_label").getComponent(cc.Label).string=String(card_1c.length);
                            } else if(layer_p2p[i][0] == 'D') {
                                card_now.zIndex = epoch++;
                                card_now.x = -81;
                                card_now.y = -219;
                                card_now.width = 100;
                                card_now.height = 150;
                                card_1d.push(layer_p2p[i]);
                                cc.find("Canvas/New Sprite(Splash)/md_label").getComponent(cc.Label).string=String(card_1d.length);
                            } else if(layer_p2p[i][0] == 'H') {
                                card_now.zIndex = epoch++;
                                card_now.x = 119;
                                card_now.y = -219;
                                card_now.width = 100;
                                card_now.height = 150;
                                card_1h.push(layer_p2p[i]);
                                cc.find("Canvas/New Sprite(Splash)/mh_label").getComponent(cc.Label).string=String(card_1h.length);
                            } else {
                                card_now.zIndex = epoch++;
                                card_now.x = 321;
                                card_now.y = -219;
                                card_now.width = 100;
                                card_now.height = 150;
                                card_1s.push(layer_p2p[i]);
                                cc.find("Canvas/New Sprite(Splash)/ms_label").getComponent(cc.Label).string=String(card_1s.length);
                            }
                        }
                        layer_p2p = [];
                    }
                }
                turn_p2p = 2;
                cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="2P回合";
            }
        }
    },

    tap_1h() {
        if(turn_p2p == 1) {
            if(card_1h.length != 0) {
                let card_name = card_1h[card_1h.length-1];
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y = 0;
                card_now.width = 60;
                card_now.height = 90;
                card_1h.pop();
                cc.find("Canvas/New Sprite(Splash)/mh_label").getComponent(cc.Label).string=String(card_1h.length);
                if (layer_p2p.length == 0 || layer_p2p[layer_p2p.length-1][0] != card_name[0]) {
                    layer_p2p.push(card_name);
                } else if(layer_p2p[layer_p2p.length-1][0] == card_name[0]){
                    layer_p2p.push(card_name);
                    for(let i=0; i<layer_p2p.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer_p2p[i]);
                        if (layer_p2p[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_1c.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/mc_label").getComponent(cc.Label).string=String(card_1c.length);
                        } else if(layer_p2p[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_1d.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/md_label").getComponent(cc.Label).string=String(card_1d.length);
                        } else if(layer_p2p[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_1h.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/mh_label").getComponent(cc.Label).string=String(card_1h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_1s.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/ms_label").getComponent(cc.Label).string=String(card_1s.length);
                        }
                    }
                    layer_p2p = [];
                }
                turn_p2p = 2;
                cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="2P回合";
            }
        }
    },

    tap_1s() {
        if(turn_p2p == 1) {
            if(card_1s.length != 0) {
                let card_name = card_1s[card_1s.length-1];
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y =0;
                card_now.width = 60;
                card_now.height = 90;
                card_1s.pop();
                cc.find("Canvas/New Sprite(Splash)/ms_label").getComponent(cc.Label).string=String(card_1s.length);
                if (layer_p2p.length == 0 || layer_p2p[layer_p2p.length-1][0] != card_name[0]) {
                    layer_p2p.push(card_name);
                } else if(layer_p2p[layer_p2p.length-1][0] == card_name[0]){
                    layer_p2p.push(card_name);
                    for(let i=0; i<layer_p2p.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer_p2p[i]);
                        if (layer_p2p[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_1c.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/mc_label").getComponent(cc.Label).string=String(card_1c.length);
                        } else if(layer_p2p[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_1d.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/md_label").getComponent(cc.Label).string=String(card_1d.length);
                        } else if(layer_p2p[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_1h.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/mh_label").getComponent(cc.Label).string=String(card_1h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_1s.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/ms_label").getComponent(cc.Label).string=String(card_1s.length);
                        }
                    }
                    layer_p2p = [];
                }
                turn_p2p = 2;
                cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="2P回合";
            }
        }
    },

    tap_2c() {
        if(turn_p2p == 2) {
            if(card_2c.length != 0) {
                let card_name = card_2c[card_2c.length-1];
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y = 0;
                card_now.width = 60;
                card_now.height = 90;
                card_now.rotation = 180;
                card_2c.pop();
                cc.find("Canvas/New Sprite(Splash)/oc_label").getComponent(cc.Label).string=String(card_2c.length);
                if (layer_p2p.length == 0 || layer_p2p[layer_p2p.length-1][0] != card_name[0]) {
                    layer_p2p.push(card_name);
                } else if(layer_p2p[layer_p2p.length-1][0] == card_name[0]){
                    layer_p2p.push(card_name);
                    for(let i=0; i<layer_p2p.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer_p2p[i]);
                        if (layer_p2p[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_now.rotation = 180;
                            card_2c.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/oc_label").getComponent(cc.Label).string=String(card_2c.length);
                        } else if(layer_p2p[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_now.rotation = 180;
                            card_2d.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/od_label").getComponent(cc.Label).string=String(card_2d.length);
                        } else if(layer_p2p[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_now.rotation = 180;
                            card_2h.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/oh_label").getComponent(cc.Label).string=String(card_2h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_now.rotation = 180;
                            card_2s.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/os_label").getComponent(cc.Label).string=String(card_2s.length);
                        }
                    }
                    layer_p2p = [];
                }
                turn_p2p = 1;
                cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="1P回合";
            }
        }
        
    },

    tap_2d() {
        if(turn_p2p == 2) {
            if(card_2d.length != 0) {
                let card_name = card_2d[card_2d.length-1];
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y = 0;
                card_now.width = 60;
                card_now.height = 90;
                card_now.rotation = 180;
                card_2d.pop();
                cc.find("Canvas/New Sprite(Splash)/od_label").getComponent(cc.Label).string=String(card_2d.length);
                if (layer_p2p.length == 0 || layer_p2p[layer_p2p.length-1][0] != card_name[0]) {
                    layer_p2p.push(card_name);
                } else if(layer_p2p[layer_p2p.length-1][0] == card_name[0]){
                    layer_p2p.push(card_name);
                    for(let i=0; i<layer_p2p.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer_p2p[i]);
                        if (layer_p2p[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_now.rotation = 180;
                            card_2c.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/oc_label").getComponent(cc.Label).string=String(card_2c.length);
                        } else if(layer_p2p[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_now.rotation = 180;
                            card_2d.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/od_label").getComponent(cc.Label).string=String(card_2d.length);
                        } else if(layer_p2p[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_now.rotation = 180;
                            card_2h.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/oh_label").getComponent(cc.Label).string=String(card_2h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_now.rotation = 180;
                            card_2s.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/os_label").getComponent(cc.Label).string=String(card_2s.length);
                        }
                    }
                    layer_p2p = [];
                }
                turn_p2p = 1;
                cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="1P回合";
            }
        }
    },

    tap_2h() {
        if(turn_p2p == 2) {
            if(card_2h.length != 0) {
                let card_name = card_2h[card_2h.length-1];
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y = 0;
                card_now.width = 60;
                card_now.height = 90;
                card_now.rotation = 180;
                card_2h.pop();
                cc.find("Canvas/New Sprite(Splash)/oh_label").getComponent(cc.Label).string=String(card_2h.length);
                if (layer_p2p.length == 0 || layer_p2p[layer_p2p.length-1][0] != card_name[0]) {
                    layer_p2p.push(card_name);
                } else if(layer_p2p[layer_p2p.length-1][0] == card_name[0]){
                    layer_p2p.push(card_name);
                    for(let i=0; i<layer_p2p.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer_p2p[i]);
                        if (layer_p2p[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_now.rotation = 180;
                            card_2c.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/oc_label").getComponent(cc.Label).string=String(card_2c.length);
                        } else if(layer_p2p[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_now.rotation = 180;
                            card_2d.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/od_label").getComponent(cc.Label).string=String(card_2d.length);
                        } else if(layer_p2p[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_now.rotation = 180;
                            card_2h.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/oh_label").getComponent(cc.Label).string=String(card_2h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_now.rotation = 180;
                            card_2s.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/os_label").getComponent(cc.Label).string=String(card_2s.length);
                        }
                    }
                    layer_p2p = [];
                }
                turn_p2p = 1;
                cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="1P回合";
            }
        }
    },

    tap_2s() {
        if(turn_p2p == 2) {
            if(card_2s.length != 0) {
                let card_name = card_2s[card_2s.length-1];
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y = 0;
                card_now.width = 60;
                card_now.height = 90;
                card_now.rotation = 180;
                card_2s.pop();
                cc.find("Canvas/New Sprite(Splash)/os_label").getComponent(cc.Label).string=String(card_2s.length);
                if (layer_p2p.length == 0 || layer_p2p[layer_p2p.length-1][0] != card_name[0]) {
                    layer_p2p.push(card_name);
                } else if(layer_p2p[layer_p2p.length-1][0] == card_name[0]){
                    layer_p2p.push(card_name);
                    for(let i=0; i<layer_p2p.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer_p2p[i]);
                        if (layer_p2p[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_now.rotation = 180;
                            card_2c.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/oc_label").getComponent(cc.Label).string=String(card_2c.length);
                        } else if(layer_p2p[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_now.rotation = 180;
                            card_2d.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/od_label").getComponent(cc.Label).string=String(card_2d.length);
                        } else if(layer_p2p[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_now.rotation = 180;
                            card_2h.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/oh_label").getComponent(cc.Label).string=String(card_2h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = 232;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_now.rotation = 180;
                            card_2s.push(layer_p2p[i]);
                            cc.find("Canvas/New Sprite(Splash)/os_label").getComponent(cc.Label).string=String(card_2s.length);
                        }
                    }
                    layer_p2p = [];
                }
                turn_p2p = 1;
                cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="1P回合";
            }
        }
    },
    
    tap_ok() {
        cc.director.loadScene("MainScene");
    },

    tap_back() {
        cc.director.loadScene("MainScene");
    },


    // update (dt) {},
});
