window.card_c = []; // 我方手牌区梅花花色数组
window.card_d = []; // 我方手牌区方片花色数组
window.card_h = []; // 我方手牌区红心花色数组
window.card_s = []; // 我方手牌区黑桃花色数组
window.layer = []; // 放置区扑克牌数组
window.oc = 0; // 对手梅花数量 
window.od = 0; // 对手方片数量 
window.oh = 0; // 对手红心数量 
window.os = 0; // 对手黑桃数量 
window.mc = 0; // 我方梅花数量
window.md = 0; // 我方梅花数量
window.mh = 0; // 我方梅花数量
window.ms = 0; // 我方梅花数量
window.sch = false; // 只开一次刷新
window.unsch = false; // 保留变量
window.unschopen = false; // 若第一次为我方回合则不刷新
window.firstsch = true; // 第一次刷新
window.begin = ""; // 储存请求返回的回合信息
window.turn = false; // 上一次刷新是哪方回合
window.epoch = 1; // 用于区别节点显示的层级
window.openrobot = false; // 是否开启托管
window.value = 0; // 定位花色的数量
window.kind = ''; // 定位的花色
window.loopcallback = function() {
    let self = this;
    let uuid=cc.sys.localStorage.getItem("uuid");
    cc.log(uuid)
    let url = "http://172.17.173.97:9000/api/game/" + uuid + "/last";
    let token=cc.sys.localStorage.getItem("token");
    let xhr1 = new XMLHttpRequest();
    xhr1.open("GET", url, true);
    xhr1.setRequestHeader("Authorization", token);
    xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    xhr1.send();
    
    xhr1.onreadystatechange = function () {
        cc.log('正在刷新');
        if (xhr1.status == 200) {
            var response = xhr1.responseText;
            response = JSON.parse(response);
            if (begin != '对局刚开始' && response.data.last_msg == '对局刚开始') {// 刚刚进入战局
                begin = response.data.last_msg;
                turn = response.data.your_turn;
                if(turn == false) {
                    cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="对方回合";
                    firstsch = false;
                } else {
                    cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="你的回合";
                    firstsch = true;
                }
            } else if(response.data.hasOwnProperty('your_turn')) {
                let response_store = response;
                cc.log("response: ", response_store);
                let turn_store = response_store.data.your_turn;
                cc.log("turn: ",turn);
                cc.log("turn_store: ",turn_store);
                if (turn_store != turn) {// 下一轮已开始
                    if(turn_store == true) {
                        cc.log('unschedule')
                        self.unschedule(loopcallback);
                        cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="你的回合";
                        turn = turn_store;
                        let operation = response_store.data.last_code.split(' ');
                        let type = operation[1];
                        let card_name = operation[2];
                        let card_kind = card_name[0];
                        if (type == '0') {
                            let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                            card_now.active = true;
                            card_now.zIndex = epoch++;
                            card_now.x = 99;
                            card_now.y = 43;
                            if (layer.length == 0) {
                                layer.push(card_name);
                            } else {
                                if (layer[layer.length-1][0] != card_kind) {
                                    layer.push(card_name);
                                } else if(layer[layer.length-1][0] == card_kind) {
                                    layer.push(card_name);
                                    for(let i=0; i<layer.length; i++) {
                                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer[i]);
                                        if (layer[i][0] == 'C'){
                                            card_now.zIndex = epoch++;
                                            card_now.x = -280;
                                            card_now.y = 232;
                                            card_now.width = 100;
                                            card_now.height = 150;
                                            oc++;
                                            cc.find("Canvas/New Sprite(Splash)/oc_label").getComponent(cc.Label).string=String(oc);
                                        } else if(layer[i][0] == 'D') {
                                            card_now.zIndex = epoch++;
                                            card_now.x = -81;
                                            card_now.y = 232;
                                            card_now.width = 100;
                                            card_now.height = 150;
                                            od++;
                                            cc.find("Canvas/New Sprite(Splash)/od_label").getComponent(cc.Label).string=String(od);
                                        } else if(layer[i][0] == 'H') {
                                            card_now.zIndex = epoch++;
                                            card_now.x = 119;
                                            card_now.y = 232;
                                            card_now.width = 100;
                                            card_now.height = 150;
                                            oh++;
                                            cc.find("Canvas/New Sprite(Splash)/oh_label").getComponent(cc.Label).string=String(oh);
                                        } else {
                                            card_now.zIndex = epoch++;
                                            card_now.x = 321;
                                            card_now.y = 232;
                                            card_now.width = 100;
                                            card_now.height = 150;
                                            os++;
                                            cc.find("Canvas/New Sprite(Splash)/os_label").getComponent(cc.Label).string=String(os);
                                        }
                                    }
                                    layer = [];
                                }
                            }

                        } else if(type == '1'){
                            let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                            card_now.zIndex = epoch++;
                            card_now.x = 99;
                            card_now.y = 43;
                            card_now.width = 60;
                            card_now.height = 90;
                            if (layer.length == 0) {
                                layer.push(card_name);
                                if (card_kind=='C') {
                                    oc--;
                                    cc.find("Canvas/New Sprite(Splash)/oc_label").getComponent(cc.Label).string=String(oc);  
                                } else if (card_kind=='D') {
                                    od--;
                                    cc.find("Canvas/New Sprite(Splash)/od_label").getComponent(cc.Label).string=String(od);
                                } else if (card_kind=='H') {
                                    oh--;
                                    cc.find("Canvas/New Sprite(Splash)/oh_label").getComponent(cc.Label).string=String(oh);
                                } else if (card_kind=='S') {
                                    os--;
                                    cc.find("Canvas/New Sprite(Splash)/os_label").getComponent(cc.Label).string=String(os);
                                }
                            } else {
                                if (layer[layer.length-1][0] != card_kind) {
                                    layer.push(card_name);
                                    if (card_kind=='C') {
                                        oc--;
                                        cc.find("Canvas/New Sprite(Splash)/oc_label").getComponent(cc.Label).string=String(oc);  
                                    } else if (card_kind=='D') {
                                        od--;
                                        cc.find("Canvas/New Sprite(Splash)/od_label").getComponent(cc.Label).string=String(od);
                                    } else if (card_kind=='H') {
                                        oh--;
                                        cc.find("Canvas/New Sprite(Splash)/oh_label").getComponent(cc.Label).string=String(oh);
                                    } else if (card_kind=='S') {
                                        os--;
                                        cc.find("Canvas/New Sprite(Splash)/os_label").getComponent(cc.Label).string=String(os);
                                    }
                                } else if (layer[layer.length-1][0] == card_kind) {
                                    layer.push(card_name);
                                    if (card_kind=='C') {
                                        oc--;
                                        cc.find("Canvas/New Sprite(Splash)/oc_label").getComponent(cc.Label).string=String(oc);  
                                    } else if (card_kind=='D') {
                                        od--;
                                        cc.find("Canvas/New Sprite(Splash)/od_label").getComponent(cc.Label).string=String(od);
                                    } else if (card_kind=='H') {
                                        oh--;
                                        cc.find("Canvas/New Sprite(Splash)/oh_label").getComponent(cc.Label).string=String(oh);
                                    } else if (card_kind=='S') {
                                        os--;
                                        cc.find("Canvas/New Sprite(Splash)/os_label").getComponent(cc.Label).string=String(os);
                                    }
                                    for(let i=0; i<layer.length; i++) {
                                        let card_now = cc.find("Canvas/New Sprite(Splash)/"+layer[i]);
                                        if (layer[i][0] == 'C'){
                                            card_now.zIndex = epoch++;
                                            card_now.x = -280;
                                            card_now.y = 232;
                                            card_now.width = 100;
                                            card_now.height = 150;
                                            oc++;
                                            cc.find("Canvas/New Sprite(Splash)/oc_label").getComponent(cc.Label).string=String(oc);
                                        } else if(layer[i][0] == 'D') {
                                            card_now.zIndex = epoch++;
                                            card_now.x = -81;
                                            card_now.y = 232;
                                            card_now.width = 100;
                                            card_now.height = 150;
                                            od++;
                                            cc.find("Canvas/New Sprite(Splash)/od_label").getComponent(cc.Label).string=String(od);
                                        } else if(layer[i][0] == 'H') {
                                            card_now.zIndex = epoch++;
                                            card_now.x = 119;
                                            card_now.y = 232;
                                            card_now.width = 100;
                                            card_now.height = 150;
                                            oh++;
                                            cc.find("Canvas/New Sprite(Splash)/oh_label").getComponent(cc.Label).string=String(oh);
                                        } else {
                                            card_now.zIndex = epoch++;
                                            card_now.x = 321;
                                            card_now.y = 232;
                                            card_now.width = 100;
                                            card_now.height = 150;
                                            os++;
                                            cc.find("Canvas/New Sprite(Splash)/os_label").getComponent(cc.Label).string=String(os);
                                        }
                                    }
                                    layer = [];
                                }
                            }
                        }
                        if (openrobot == true) {
                            let robot = cc.find("Canvas/New Sprite(Splash)/robot").getComponent('gameonline');
                            robot.robot_start();
                        }

                    } else if(turn_store == false){// 上局是你的回合
                        cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="对方回合";
                        turn = turn_store;
                        
                    }
                }
            } else if(response.code == 400) {
                let uuid=cc.sys.localStorage.getItem("uuid");
                let url = "http://172.17.173.97:9000/api/game/" + uuid;
                let token=cc.sys.localStorage.getItem("token");
                let xhr2 = new XMLHttpRequest();
                xhr2.open("GET", url, true);
                xhr2.setRequestHeader("Authorization", token);
                xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                xhr2.send();
                xhr2.onreadystatechange = function () {
                    if (xhr2.status == 200) {
                        var response = xhr2.responseText;
                        response = JSON.parse(response);
                        if (response.data.winner == 0) {
                            cc.find("Canvas/New Sprite(Splash)/Mask").zIndex = 999;
                            cc.find("Canvas/New Sprite(Splash)/Mask").active = true;
                            cc.find("Canvas/New Sprite(Splash)/result").zIndex = 9999;
                            cc.find("Canvas/New Sprite(Splash)/result").active = true;
                            cc.find("Canvas/New Sprite(Splash)/result/result_label").getComponent(cc.Label).string = "房主获胜";
                        } else if (response.data.winner == 1) {
                            cc.find("Canvas/New Sprite(Splash)/Mask").zIndex = 999;
                            cc.find("Canvas/New Sprite(Splash)/Mask").active = true;
                            cc.find("Canvas/New Sprite(Splash)/result").zIndex = 9999;
                            cc.find("Canvas/New Sprite(Splash)/result").active = true;
                            cc.find("Canvas/New Sprite(Splash)/result/result_label").getComponent(cc.Label).string = "参与者获胜";

                        } else if (response.data.winner == -1) {
                            cc.find("Canvas/New Sprite(Splash)/Mask").zIndex = 999;
                            cc.find("Canvas/New Sprite(Splash)/Mask").active = true;
                            cc.find("Canvas/New Sprite(Splash)/result").zIndex = 9999;
                            cc.find("Canvas/New Sprite(Splash)/result").active = true;
                            cc.find("Canvas/New Sprite(Splash)/result/result_label").getComponent(cc.Label).string = "平局";

                        }

                    }
                }

            }

        }
    }

}


cc.Class({
    extends: cc.Component,
    properties: {
        idLabel : cc.Label,
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
        var uuid=cc.sys.localStorage.getItem("uuid");
        this.idLabel.string = uuid;
        self = this;
        card_c = [];
        card_d = [];
        card_h = [];
        card_s = [];
        layer = [];
        oc = 0;
        od = 0;
        oh = 0;
        os = 0;
        mc = 0;
        md = 0;
        mh = 0;
        ms = 0;
        sch = false;
        unsch = false;
        unschopen = false;
        begin = "";
        turn = false;
        epoch = 1;
        firstsch = true;
        openrobot = false;
        value = 0;
        kind = '';
    },


    start () {
        let self = this;
        let loopcallback1=()=> { // 持续监听
            if(unschopen == true) {
                self.unschedule(loopcallback);
                unschopen = false;
            }

        }
        if(sch == false) { // 只开1次
            self.schedule(loopcallback, 0.3);
            self.schedule(loopcallback1, 0.1);
            sch = true;
        }
        
        
        
    },

    robot_start() {
        if (turn == true) {
            let robot = cc.find("Canvas/New Sprite(Splash)/robot").getComponent('gameonline');
            if (value == 0) {
                let maxvalue = Math.max(card_c.length, card_d.length, card_h.length, card_s.length);
                if(maxvalue == card_c.length) {kind = 'C';}
                else if(maxvalue == card_d.length) {kind = 'D';}
                else if(maxvalue == card_h.length) {kind = 'H';}
                else {kind = 'S';}
                value = maxvalue;
            }
            if (layer.length == 0) {
                if (value == 0) {
                    robot.tap_store();
                } else {
                    if(kind == 'C') {robot.tap_c(); value--;}
                    else if(kind == 'D') {robot.tap_d(); value--;}
                    else if(kind == 'H') {robot.tap_h(); value--;}
                    else if(kind == 'S') {robot.tap_s(); value--;}
                }
            } else {
                if (value == 0) {
                    robot.tap_store();
                } else {
                    if(kind == 'C' && layer[layer.length-1][0]!='C') {robot.tap_c(); value--;}
                    else if(kind == 'D' && layer[layer.length-1][0]!='D') {robot.tap_d(); value--;}
                    else if(kind == 'H' && layer[layer.length-1][0]!='H') {robot.tap_h(); value--;}
                    else if(kind == 'S' && layer[layer.length-1][0]!='S') {robot.tap_s(); value--;}
                    else {
                        if (card_c.length!=0 && layer[layer.length-1][0]!='C') {robot.tap_c();}
                        else if (card_d.length!=0 && layer[layer.length-1][0]!='D') {robot.tap_d();}
                        else if (card_h.length!=0 && layer[layer.length-1][0]!='H') {robot.tap_h();}
                        else if (card_s.length!=0 && layer[layer.length-1][0]!='S') {robot.tap_s();}
                        else {robot.tap_store();}
                    }
                }
            }
        }
    },

    

    tap_store() {
        let self = this;
        let uuid=cc.sys.localStorage.getItem("uuid");
        let url = "http://172.17.173.97:9000/api/game/" + uuid;
        let xhr1 = new XMLHttpRequest();
        xhr1.open("PUT", url, true);
        let token=cc.sys.localStorage.getItem("token");
        xhr1.setRequestHeader("Authorization", token);
        xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhr1.send("type=0");
        xhr1.onreadystatechange = function () {
            if(xhr1.status == 200 && xhr1.readyState == 4) {
                let response_store = xhr1.responseText;
                response_store = JSON.parse(response_store);
                cc.log(response_store);
                let operation = response_store.data.last_code.split(' ');
                let card_name = operation[2];
                let card_kind = card_name[0];
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.active = true;
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y = 43;
                if (layer.length == 0) {
                    layer.push(card_name);
                } else {
                    if (layer[layer.length-1][0] != card_kind) {
                        layer.push(card_name);
                    } else if(layer[layer.length-1][0] == card_kind) {
                        layer.push(card_name);
                        for(let i=0; i<layer.length; i++) {
                            card_now = cc.find("Canvas/New Sprite(Splash)/"+layer[i]);
                            if (layer[i][0] == 'C'){
                                card_now.zIndex = epoch++;
                                card_now.x = -280;
                                card_now.y = -219;
                                card_now.width = 100;
                                card_now.height = 150;
                                card_c.push(layer[i]);
                                cc.find("Canvas/New Sprite(Splash)/mc_label").getComponent(cc.Label).string=String(card_c.length);
                            } else if (layer[i][0] == 'D') {
                                card_now.zIndex = epoch++;
                                card_now.x = -81;
                                card_now.y = -219;
                                card_now.width = 100;
                                card_now.height = 150;
                                card_d.push(layer[i]);
                                cc.find("Canvas/New Sprite(Splash)/md_label").getComponent(cc.Label).string=String(card_d.length);
                            } else if (layer[i][0] == 'H') {
                                card_now.zIndex = epoch++;
                                card_now.x = 119;
                                card_now.y = -219;
                                card_now.width = 100;
                                card_now.height = 150;
                                card_h.push(layer[i]);
                                cc.find("Canvas/New Sprite(Splash)/mh_label").getComponent(cc.Label).string=String(card_h.length);
                            } else {
                                card_now.zIndex = epoch++;
                                card_now.x = 321;
                                card_now.y = -219;
                                card_now.width = 100;
                                card_now.height = 150;
                                card_s.push(layer[i]);
                                cc.find("Canvas/New Sprite(Splash)/ms_label").getComponent(cc.Label).string=String(card_s.length);
                            }
                        }
                        layer = [];
                    }
                }
                // cc.log(self);
                turn = false;
                if (firstsch == false) {
                    cc.log('schedule开启！！');
                    self.schedule(loopcallback, 0.3);
                }
                firstsch = false;
                cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="对方回合";
                
            }

        };
    },

    sendmessage(cardname) {
        let self = this;
        let uuid=cc.sys.localStorage.getItem("uuid");
        let url = "http://172.17.173.97:9000/api/game/" + uuid;
        let xhr1 = new XMLHttpRequest();
        xhr1.open("PUT", url, true);
        let token=cc.sys.localStorage.getItem("token");
        xhr1.setRequestHeader("Authorization", token);
        xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        // let card_name = card_c[card_c.length-1]
        let str = "type=1&card=" + cardname
        xhr1.send(str);
        xhr1.onreadystatechange = function () {
            if (xhr1.status == 200 && xhr1.readyState == 4) {
                turn = false;
                self.schedule(loopcallback, 0.3);
            }
        };
    },


    tap_c() {
        let self = this;
        if (turn == true) {
            if(card_c.length != 0) {
                let card_name = card_c[card_c.length-1];
                let cardname = card_name;
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y = 43;
                card_now.width = 60;
                card_now.height = 90;
                card_c.pop();
                cc.find("Canvas/New Sprite(Splash)/mc_label").getComponent(cc.Label).string=String(card_c.length);
                if (layer.length == 0 || layer[layer.length-1][0] != card_name[0]) {
                    layer.push(card_name);
                } else if(layer[layer.length-1][0] == card_name[0]){
                    layer.push(card_name);
                    for(let i=0; i<layer.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer[i]);
                        if (layer[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_c.push(layer[i]);
                            cc.find("Canvas/New Sprite(Splash)/mc_label").getComponent(cc.Label).string=String(card_c.length);
                        } else if(layer[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_d.push(layer[i]);
                            cc.find("Canvas/New Sprite(Splash)/md_label").getComponent(cc.Label).string=String(card_d.length);
                        } else if(layer[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_h.push(layer[i]);
                            cc.find("Canvas/New Sprite(Splash)/mh_label").getComponent(cc.Label).string=String(card_h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_s.push(layer[i]);
                            cc.find("Canvas/New Sprite(Splash)/ms_label").getComponent(cc.Label).string=String(card_s.length);
                        }
                    }
                    layer = [];
                }
                self.sendmessage(cardname);
            }
        }
        
    },

    tap_d() {
        let self = this;
        if (turn == true) {
            if(card_d.length != 0) {
                let card_name = card_d[card_d.length-1];
                let cardname = card_name;
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y = 43;
                card_now.width = 60;
                card_now.height = 90;
                card_d.pop();
                cc.find("Canvas/New Sprite(Splash)/md_label").getComponent(cc.Label).string=String(card_d.length);
                if (layer.length == 0 || layer[layer.length-1][0] != card_name[0]) {
                    layer.push(card_name);
                } else if(layer[layer.length-1][0] == card_name[0]){
                    layer.push(card_name);
                    for(let i=0; i<layer.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer[i]);
                        if (layer[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_c.push(layer[i]);
                            cc.find("Canvas/New Sprite(Splash)/mc_label").getComponent(cc.Label).string=String(card_c.length);
                        } else if(layer[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_d.push(layer[i]);
                            cc.find("Canvas/New Sprite(Splash)/md_label").getComponent(cc.Label).string=String(card_d.length);
                        } else if(layer[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_h.push(layer[i]);
                            cc.find("Canvas/New Sprite(Splash)/mh_label").getComponent(cc.Label).string=String(card_h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_s.push(layer[i]);
                            cc.find("Canvas/New Sprite(Splash)/ms_label").getComponent(cc.Label).string=String(card_s.length);
                        }
                    }
                    layer = [];
                }
                self.sendmessage(cardname);
            }
        }
    },

    tap_h() {
        let self = this;
        if (turn == true) {
            if(card_h.length != 0) {
                let card_name = card_h[card_h.length-1];
                let cardname = card_name;
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y = 43;
                card_now.width = 60;
                card_now.height = 90;
                card_h.pop();
                cc.find("Canvas/New Sprite(Splash)/mh_label").getComponent(cc.Label).string=String(card_h.length);
                if (layer.length == 0 || layer[layer.length-1][0] != card_name[0]) {
                    layer.push(card_name);
                } else if(layer[layer.length-1][0] == card_name[0]){
                    layer.push(card_name);
                    for(let i=0; i<layer.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer[i]);
                        if (layer[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_c.push(layer[i]);
                            cc.find("Canvas/New Sprite(Splash)/mc_label").getComponent(cc.Label).string=String(card_c.length);
                        } else if(layer[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_d.push(layer[i]);
                            cc.find("Canvas/New Sprite(Splash)/md_label").getComponent(cc.Label).string=String(card_d.length);
                        } else if(layer[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_h.push(layer[i]);
                            cc.find("Canvas/New Sprite(Splash)/mh_label").getComponent(cc.Label).string=String(card_h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_s.push(layer[i]);
                            cc.find("Canvas/New Sprite(Splash)/ms_label").getComponent(cc.Label).string=String(card_s.length);
                        }
                    }
                    layer = [];
                }
                self.sendmessage(cardname);
            }
        }
        
    },
    
    tap_s() {
        let self = this;
        if (turn == true) {
            if(card_s.length != 0) {
                let card_name = card_s[card_s.length-1];
                let cardname = card_name;
                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                card_now.zIndex = epoch++;
                card_now.x = 99;
                card_now.y = 43;
                card_now.width = 60;
                card_now.height = 90;
                card_s.pop();
                cc.find("Canvas/New Sprite(Splash)/ms_label").getComponent(cc.Label).string=String(card_s.length);
                if (layer.length == 0 || layer[layer.length-1][0] != card_name[0]) {
                    layer.push(card_name);
                } else if(layer[layer.length-1][0] == card_name[0]){
                    layer.push(card_name);
                    for(let i=0; i<layer.length; i++) {
                        card_now = cc.find("Canvas/New Sprite(Splash)/"+layer[i]);
                        if (layer[i][0] == 'C'){
                            card_now.zIndex = epoch++;
                            card_now.x = -280;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_c.push(layer[i]);
                            cc.find("Canvas/New Sprite(Splash)/mc_label").getComponent(cc.Label).string=String(card_c.length);
                        } else if(layer[i][0] == 'D') {
                            card_now.zIndex = epoch++;
                            card_now.x = -81;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_d.push(layer[i]);
                            cc.find("Canvas/New Sprite(Splash)/md_label").getComponent(cc.Label).string=String(card_d.length);
                        } else if(layer[i][0] == 'H') {
                            card_now.zIndex = epoch++;
                            card_now.x = 119;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_h.push(layer[i]);
                            cc.find("Canvas/New Sprite(Splash)/mh_label").getComponent(cc.Label).string=String(card_h.length);
                        } else {
                            card_now.zIndex = epoch++;
                            card_now.x = 321;
                            card_now.y = -219;
                            card_now.width = 100;
                            card_now.height = 150;
                            card_s.push(layer[i]);
                            cc.find("Canvas/New Sprite(Splash)/ms_label").getComponent(cc.Label).string=String(card_s.length);
                        }
                    }
                    layer = [];
                }
                self.sendmessage(cardname);
            }
        }
        
    },

    tap_ok() {
        cc.director.loadScene("gameCenter");
    },
    
    tap_back() {
        cc.director.loadScene("MainScene");
    },
    
    tap_robot() {
        if (openrobot == true) { openrobot = false; cc.log("托管关闭");}
        else if(openrobot == false) { 
            openrobot = true; cc.log("托管开启");
            let robot = cc.find("Canvas/New Sprite(Splash)/robot").getComponent('gameonline');
            robot.robot_start();
        }
    },




});
