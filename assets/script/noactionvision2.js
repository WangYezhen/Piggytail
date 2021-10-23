window.card_c = [];
window.card_d = [];
window.card_h = [];
window.card_s = [];
window.layer = [];
window.oc = 0;
window.od = 0;
window.oh = 0;
window.os = 0;
window.mc = 0;
window.md = 0;
window.mh = 0;
window.ms = 0;
window.sch = false;
window.begin = "";
window.turn = false;
window.epoch = 1;
// window.self = null;


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

        
    },

    start () {
        let self = this;
        let oc_label = this.oc_label;
        let od_label = this.od_label;
        let os_label = this.os_label;
        let oh_label = this.oh_label;
        let mc_label = this.mc_label;
        let md_label = this.md_label;
        let ms_label = this.ms_label;
        let mh_label = this.mh_label;
        let turn_label = this.turn_label;

        let uuid=cc.sys.localStorage.getItem("uuid");
        cc.log(uuid)
        let url = "http://172.17.173.97:9000/api/game/" + uuid + "/last";
        let token=cc.sys.localStorage.getItem("token");
        let xhr1 = new XMLHttpRequest();
        
        

        let loopcallback=()=>{
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
                        } else {
                            cc.find("Canvas/New Sprite(Splash)/turn_label").getComponent(cc.Label).string="你的回合";
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
                                turn_label.string = "你的回合";
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
                                                    oc_label.string = String(oc);
                                                } else if(layer[i][0] == 'D') {
                                                    card_now.zIndex = epoch++;
                                                    card_now.x = -81;
                                                    card_now.y = 232;
                                                    card_now.width = 100;
                                                    card_now.height = 150;
                                                    od++;
                                                    od_label.string = String(od);
                                                } else if(layer[i][0] == 'H') {
                                                    card_now.zIndex = epoch++;
                                                    card_now.x = 119;
                                                    card_now.y = 232;
                                                    card_now.width = 100;
                                                    card_now.height = 150;
                                                    oh++;
                                                    oh_label.string = String(oh);
                                                } else {
                                                    card_now.zIndex = epoch++;
                                                    card_now.x = 321;
                                                    card_now.y = 232;
                                                    card_now.width = 100;
                                                    card_now.height = 150;
                                                    os++;
                                                    os_label.string = String(os);
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
                                            oc_label.string = String(oc);  
                                        } else if (card_kind=='D') {
                                            od--;
                                            od_label.string = String(od);
                                        } else if (card_kind=='H') {
                                            oh--;
                                            oh_label.string = String(oh);
                                        } else if (card_kind=='S') {
                                            os--;
                                            os_label.string = String(os);
                                        }
                                    } else {
                                        if (layer[layer.length-1][0] != card_kind) {
                                            layer.push(card_name);
                                            if (card_kind=='C') {
                                                oc--;
                                                oc_label.string = String(oc);  
                                            } else if (card_kind=='D') {
                                                od--;
                                                od_label.string = String(od);
                                            } else if (card_kind=='H') {
                                                oh--;
                                                oh_label.string = String(oh);
                                            } else if (card_kind=='S') {
                                                os--;
                                                os_label.string = String(os);
                                            }
                                        } else if (layer[layer.length-1][0] == card_kind) {
                                            layer.push(card_name);
                                            if (card_kind=='C') {
                                                oc--;
                                                oc_label.string = String(oc);  
                                            } else if (card_kind=='D') {
                                                od--;
                                                od_label.string = String(od);
                                            } else if (card_kind=='H') {
                                                oh--;
                                                oh_label.string = String(oh);
                                            } else if (card_kind=='S') {
                                                os--;
                                                os_label.string = String(os);
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
                                                    oc_label.string = String(oc);
                                                } else if(layer[i][0] == 'D') {
                                                    card_now.zIndex = epoch++;
                                                    card_now.x = -81;
                                                    card_now.y = 232;
                                                    card_now.width = 100;
                                                    card_now.height = 150;
                                                    od++;
                                                    od_label.string = String(od);
                                                } else if(layer[i][0] == 'H') {
                                                    card_now.zIndex = epoch++;
                                                    card_now.x = 119;
                                                    card_now.y = 232;
                                                    card_now.width = 100;
                                                    card_now.height = 150;
                                                    oh++;
                                                    oh_label.string = String(oh);
                                                } else {
                                                    card_now.zIndex = epoch++;
                                                    card_now.x = 321;
                                                    card_now.y = 232;
                                                    card_now.width = 100;
                                                    card_now.height = 150;
                                                    os++;
                                                    os_label.string = String(os);
                                                }
                                            }
                                            layer = [];
                                        }
                                    }
                                }
                            } else if(turn_store == false){// 上局是你的回合
                                turn_label.string = "对方回合";
                                turn = turn_store;
                                let operation = response_store.data.last_code.split(' ');
                                let type = operation[1];
                                let card_name = operation[2];
                                let card_kind = card_name[0];
                                if (type == '0'){ // 牌库里抽
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
                                                    mc++;
                                                    mc_label.string = String(mc);
                                                } else if (layer[i][0] == 'D') {
                                                    card_now.zIndex = epoch++;
                                                    card_now.x = -81;
                                                    card_now.y = -219;
                                                    card_now.width = 100;
                                                    card_now.height = 150;
                                                    card_d.push(layer[i]);
                                                    md++;
                                                    md_label.string = String(md);
                                                } else if (layer[i][0] == 'H') {
                                                    card_now.zIndex = epoch++;
                                                    card_now.x = 119;
                                                    card_now.y = -219;
                                                    card_now.width = 100;
                                                    card_now.height = 150;
                                                    card_h.push(layer[i]);
                                                    mh++;
                                                    mh_label.string = String(mh);
                                                } else {
                                                    card_now.zIndex = epoch++;
                                                    card_now.x = 321;
                                                    card_now.y = -219;
                                                    card_now.width = 100;
                                                    card_now.height = 150;
                                                    card_s.push(layer[i]);
                                                    ms++;
                                                    ms_label.string = String(ms);
                                                }
                                            }
                                            layer = [];
                                        }
                                    }
                                } else if(type == '1') {
                                    let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                                    card_now.zIndex = epoch++;
                                    card_now.x = 99;
                                    card_now.y = 43;
                                    card_now.width = 60;
                                    card_now.height = 90;
                                    if (card_kind == 'C' && card_name == card_c[card_c.length-1]) {
                                        card_c.pop();
                                        mc--;
                                        mc_label.string = String(mc);
                                    }
                                    else if(card_kind == 'D' && card_name == card_d[card_d.length-1]) {
                                        card_d.pop();
                                        md--;
                                        md_label.string = String(md);
                                    }
                                    else if(card_kind == 'H' && card_name == card_h[card_h.length-1]) {
                                        card_h.pop();
                                        mh--;
                                        mh_label.string = String(mh);
                                    }
                                    else if(card_kind == 'S' && card_name == card_s[card_s.length-1]) {
                                        card_s.pop();
                                        ms--;
                                        ms_label.string = String(ms);
                                    }
                                    if (layer.length == 0) {
                                        layer.push(card_name);
                                    } else {
                                        if (layer[layer.length-1][0] != card_kind) {
                                            layer.push(card_name);
                                        } else if(layer[layer.length-1][0] == card_kind) {
                                            layer.push(card_name);
                                            for(let i=0; i<layer.length; i++) {
                                                card_now = cc.find("Canvas/New Sprite(Splash)/"+layer[i]);
                                                if (layer[i][0] == 'C') {
                                                    card_now.zIndex = epoch++;
                                                    card_now.x = -280;
                                                    card_now.y = -219;
                                                    card_now.width = 100;
                                                    card_now.height = 150;
                                                    card_c.push(layer[i]);
                                                    mc++;
                                                    mc_label.string = String(mc);
                                                } else if(layer[i][0] == 'D') {
                                                    card_now.zIndex = epoch++;
                                                    card_now.x = -81;
                                                    card_now.y = -219;
                                                    card_now.width = 100;
                                                    card_now.height = 150;
                                                    card_d.push(layer[i]);
                                                    md++;
                                                    md_label.string = String(md);
                                                } else if(layer[i][0] == 'H') {
                                                    card_now.zIndex = epoch++;
                                                    card_now.x = 119;
                                                    card_now.y = -219;
                                                    card_now.width = 100;
                                                    card_now.height = 150;
                                                    card_h.push(layer[i]);
                                                    mh++;
                                                    mh_label.string = String(mh);
                                                } else {
                                                    card_now.zIndex = epoch++;
                                                    card_now.x = 321;
                                                    card_now.y = -219;
                                                    card_now.width = 100;
                                                    card_now.height = 150;
                                                    card_s.push(layer[i]);
                                                    ms++;
                                                    ms_label.string = String(ms);
                                                }
                                            }
                                            layer = [];
                                        }
                                    }
                                }
                            }
                        }
                    }
    
                }
            }
        }
        if(sch == false) {
            self.schedule(loopcallback, 0.7);
            sch = true;
            cc.log('565656565656');
        }
        
        
    },

    sendmessage() {
        

    },

    tap_store(event, CustomEventData) {
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
                let type = operation[1];
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
                                mc++;
                                mc_label.string = String(mc);
                            } else if (layer[i][0] == 'D') {
                                card_now.zIndex = epoch++;
                                card_now.x = -81;
                                card_now.y = -219;
                                card_now.width = 100;
                                card_now.height = 150;
                                card_d.push(layer[i]);
                                md++;
                                md_label.string = String(md);
                            } else if (layer[i][0] == 'H') {
                                card_now.zIndex = epoch++;
                                card_now.x = 119;
                                card_now.y = -219;
                                card_now.width = 100;
                                card_now.height = 150;
                                card_h.push(layer[i]);
                                mh++;
                                mh_label.string = String(mh);
                            } else {
                                card_now.zIndex = epoch++;
                                card_now.x = 321;
                                card_now.y = -219;
                                card_now.width = 100;
                                card_now.height = 150;
                                card_s.push(layer[i]);
                                ms++;
                                ms_label.string = String(ms);
                            }
                        }
                        layer = [];
                    }
                }
                self.schedule(loopcallback, 0.7);
            }

        };
    },

    tap_c(event, CustomEventData) {
        let uuid=cc.sys.localStorage.getItem("uuid");
        let url = "http://172.17.173.97:9000/api/game/" + uuid;
        let xhr1 = new XMLHttpRequest();
        xhr1.open("PUT", url, true);
        let token=cc.sys.localStorage.getItem("token");
        xhr1.setRequestHeader("Authorization", token);
        xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        let card_name = card_c[card_c.length-1]
        let str = "type=1&card=" + card_name
        xhr1.send(str);
        xhr1.onreadystatechange = function () {
        };
    },

    tap_d(event, CustomEventData) {
        let uuid=cc.sys.localStorage.getItem("uuid");
        let url = "http://172.17.173.97:9000/api/game/" + uuid;
        let xhr1 = new XMLHttpRequest();
        xhr1.open("PUT", url, true);
        let token=cc.sys.localStorage.getItem("token");
        xhr1.setRequestHeader("Authorization", token);
        xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        let card_name = card_d[card_d.length-1]
        let str = "type=1&card=" + card_name
        xhr1.send(str);
        xhr1.onreadystatechange = function () {
        };
    },

    tap_h(event, CustomEventData) {
        let uuid=cc.sys.localStorage.getItem("uuid");
        let url = "http://172.17.173.97:9000/api/game/" + uuid;
        let xhr1 = new XMLHttpRequest();
        xhr1.open("PUT", url, true);
        let token=cc.sys.localStorage.getItem("token");
        xhr1.setRequestHeader("Authorization", token);
        xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        let card_name = card_h[card_h.length-1]
        let str = "type=1&card=" + card_name
        xhr1.send(str);
        xhr1.onreadystatechange = function () {
        };
    },
    
    tap_s(event, CustomEventData) {
        let uuid=cc.sys.localStorage.getItem("uuid");
        let url = "http://172.17.173.97:9000/api/game/" + uuid;
        let xhr1 = new XMLHttpRequest();
        xhr1.open("PUT", url, true);
        let token=cc.sys.localStorage.getItem("token");
        xhr1.setRequestHeader("Authorization", token);
        xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        let card_name = card_s[card_s.length-1]
        let str = "type=1&card=" + card_name
        xhr1.send(str);
        xhr1.onreadystatechange = function () {
        };
    },

    tap_ok(event, CustomEventData) {
        cc.director.loadScene("gameCenter");
    },



});
