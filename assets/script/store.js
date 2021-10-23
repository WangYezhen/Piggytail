window.card_c = [];
window.card_d = [];
window.card_h = [];
window.card_s = [];
window.layer = [];
window.action = [];
window.oc = 0;
window.od = 0;
window.oh = 0;
window.os = 0;
window.mc = 0;
window.md = 0;
window.mh = 0;
window.ms = 0;
window.begin = "";
window.turn = false;
window.epoch = 1;
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

    // LIFE-CYCLE CALLBACKS:

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
        let actioncallback = function(index) {
            action[index] = true;
        };

        let loopcallback=()=>{
            xhr1.open("GET", url, true);
            xhr1.setRequestHeader("Authorization", token);
            xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            xhr1.send();
            xhr1.onreadystatechange = function () {
            if (xhr1.status == 200) {
                var response = xhr1.responseText;
                response = JSON.parse(response);
                if (begin != '对局刚开始' && response.data.last_msg == '对局刚开始') {// 刚刚进入战局
                    begin = response.data.last_msg;
                    turn = response.data.your_turn;
                    if(turn == false) {
                        turn_label.string = "对方回合";
                    } else {
                        turn_label.string = "你的回合";
                    }
                    // 弹窗显示谁的回合
                } else if (response.data.hasOwnProperty('your_turn')) {
                    let response_store = response
                    let turn_store = response_store.data.your_turn;
                    if(turn_store != turn) {// 下一轮已开始
                        self.unschedule(loopcallback);
                        if (turn_store == true) {// 到你的回合了，展示对手上一回合动画
                            turn_label.string = "你的回合";
                            turn = turn_store;
                            let operation = response_store.data.last_code.split(' ');
                            let type = operation[1];
                            let card_name = operation[2];
                            let card_kind = card_name[0];
                            if (type == '0') {
                                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                                card_now.active = true;
                                cc.log('00000000000')
                                let finished = function (index) {
                                    cc.log('44444444444444');
                                    action[index] = true;
                                    if (layer.length == 0) {
                                        layer.push(card_name);
                                    } else {
                                        if (layer[layer.length-1][0] != card_kind) {
                                            layer.push(card_name);
                                        } else if (layer[layer.length-1][0] == card_kind) {
                                            layer.push(card_name);
                                            for(let i=0; i<layer.length; i++) {
                                                card_now = cc.find("Canvas/New Sprite(Splash)/"+layer[i]);
                                                if (layer[i][0] == 'C') {
                                                    let spawn = cc.spawn(cc.moveTo(0.1, -280, 232), cc.scaleTo(0.1, 1.667, 1.667));
                                                    action.push(false);
                                                    let index_now = action.length-1;
                                                    let seq = cc.sequence(spawn, actioncallback(index_now));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(seq);
                                                    oc++;
                                                    oc_label.string = String(oc);
                                                } else if (layer[i][0] == 'D') {
                                                    let spawn = cc.spawn(cc.moveTo(0.1, -81, 232), cc.scaleTo(0.1, 1.667, 1.667));
                                                    action.push(false);
                                                    let index_now = action.length-1;
                                                    let seq = cc.sequence(spawn, actioncallback(index_now));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(seq);
                                                    od++;
                                                    od_label.string = String(od);
                                                } else if(layer[i][0] == 'H') {
                                                    let spawn = cc.spawn(cc.moveTo(0.1, 119, 232), cc.scaleTo(0.1, 1.667, 1.667));
                                                    action.push(false);
                                                    let index_now = action.length-1;
                                                    let seq = cc.sequence(spawn, actioncallback(index_now));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(seq);
                                                    oh++;
                                                    oh_label.string = String(oh);
                                                } else{
                                                    let spawn = cc.spawn(cc.moveTo(0.1, 321, 232), cc.scaleTo(0.1, 1.667, 1.667));
                                                    action.push(false);
                                                    let index_now = action.length-1;
                                                    let seq = cc.sequence(spawn, actioncallback(index_now));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(seq);
                                                    os++;
                                                    os_label.string = String(os);
                                                }
                                            }
                                            layer = [];
                                        }
                                    }
                                };
                                cc.log('11111111111');
                                action.push(false);
                                let index_now = action.length-1;
                                cc.log('555555555555')
                                let seq = cc.sequence(cc.moveTo(0.1, 99, 43), finished(index_now));
                                cc.log('222222222222222');
                                card_now.zIndex = epoch++;
                                card_now.runAction(seq);
                                cc.log('3333333333333333333333');
                            } 
                            else if (type == '1') {
                                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
    
                                let finished = function(index) {
                                    action[index] = true;
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
                                                if (layer[i][0] == 'C') {
                                                    let spawn = cc.spawn(cc.moveTo(0.1, -280, 232), cc.scaleTo(0.1, 1.667, 1.667));
                                                    action.push(false);
                                                    let index_now = action.length-1;
                                                    let seq = cc.sequence(spawn, actioncallback(index_now));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(seq);
                                                    oc++;
                                                    oc_label.string = String(oc);
                                                } else if (layer[i][0] == 'D') {
                                                    let spawn = cc.spawn(cc.moveTo(0.1, -81, 232), cc.scaleTo(0.1, 1.667, 1.667));
                                                    action.push(false);
                                                    let index_now = action.length-1;
                                                    let seq = cc.sequence(spawn, actioncallback(index_now));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(seq);
                                                    od++;
                                                    od_label.string = String(od);
                                                } else if(layer[i][0] == 'H') {
                                                    let spawn = cc.spawn(cc.moveTo(0.1, 119, 232), cc.scaleTo(0.1, 1.667, 1.667));
                                                    action.push(false);
                                                    let index_now = action.length-1;
                                                    let seq = cc.sequence(spawn, actioncallback(index_now));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(seq);
                                                    oh++;
                                                    oh_label.string = String(oh);
                                                } else{
                                                    let spawn = cc.spawn(cc.moveTo(0.1, 321, 232), cc.scaleTo(0.1, 1.667, 1.667));
                                                    action.push(false);
                                                    let index_now = action.length-1;
                                                    let seq = cc.sequence(spawn, actioncallback(index_now));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(seq);
                                                    os++;
                                                    os_label.string = String(os);
                                                }
                                            }
                                            layer = [];
                                        }
                                    }
                                };
                                action.push(false);
                                let index_now = action.length-1;
                                let spawn1 = cc.spawn(cc.moveTo(0.1, 99, 43), cc.scaleTo(0.1, 1, 1));
                                let seq = cc.sequence(spawn1, finished(index_now));
                                card_now.zIndex = epoch++;
                                card_now.runAction(seq);
                            }
                    }   else if (turn_store == false) {  // 上局是你的回合
                        turn_label.string = "对方回合";
                            turn = turn_store;
                            let operation = response_store.data.last_code.split(' ');
                            let type = operation[1];
                            let card_name = operation[2];
                            let card_kind = card_name[0];
                            if (type == '0'){ // 牌库里抽
                                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                                card_now.active = true;
    
                                let finished = function(index) {
                                    action[index] = true;
                                    if (layer.length == 0) {
                                        layer.push(card_name);
                                    } else {
                                        if (layer[layer.length-1][0] != card_kind) {
                                            layer.push(card_name);
                                        } else if(layer[layer.length-1][0] == card_kind) {
                                            cc.log("现在是对手回合：" + turn);
                                            layer.push(card_name);
                                            for(let i=0; i<layer.length; i++) {
                                                let card_now = cc.find("Canvas/New Sprite(Splash)/"+layer[i]);
                                                if (layer[i][0] == 'C') { 
                                                    let spawn = cc.spawn(cc.moveTo(0.1, -280, -219), cc.scaleTo(0.1, 1.667, 1.667));
                                                    action.push(false);
                                                    let index_now = action.length-1;
                                                    let seq = cc.sequence(spawn, actioncallback(index_now));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(seq);
                                                    card_c.push(layer[i]);
                                                    mc++;
                                                    mc_label.string = String(mc);   
                                                } else if (layer[i][0] == 'D') {
                                                    let spawn = cc.spawn(cc.moveTo(0.1, -81, -219), cc.scaleTo(0.1, 1.667, 1.667));
                                                    action.push(false);
                                                    let index_now = action.length-1;
                                                    let seq = cc.sequence(spawn, actioncallback(index_now));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(seq);
                                                    card_d.push(layer[i]);
                                                    md++;
                                                    md_label.string = String(md); 
                                                } else if (layer[i][0] == 'H') {
                                                    let spawn = cc.spawn(cc.moveTo(0.1, 119, -219), cc.scaleTo(0.1, 1.667, 1.667));
                                                    action.push(false);
                                                    let index_now = action.length-1;
                                                    let seq = cc.sequence(spawn, actioncallback(index_now));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(seq);
                                                    card_h.push(layer[i]);
                                                    mh++;
                                                    mh_label.string = String(mh); 
                                                } else{
                                                    let spawn = cc.spawn(cc.moveTo(0.1, 321, -219), cc.scaleTo(0.1, 1.667, 1.667));
                                                    action.push(false);
                                                    let index_now = action.length-1;
                                                    let seq = cc.sequence(spawn, actioncallback(index_now));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(seq);
                                                    card_s.push(layer[i]);
                                                    ms++;
                                                    ms_label.string = String(ms);
                                                }
                                            }
                                            layer = [];
                                    }
                                    }
                                };
                                action.push(false);
                                let index_now = action.length-1;
                                let seq = cc.sequence(cc.moveTo(0.1, 99, 43), finished(index_now));
                                card_now.zIndex = epoch++;
                                card_now.runAction(seq);
                                
                            } else if (type == '1') {
                                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
    
                                let finished = function(index) {
                                    action[index] = true;
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
                                        } else if (layer[layer.length-1][0] == card_kind) {
                                            layer.push(card_name);
                                            for(let i=0; i<layer.length; i++) {
                                                card_now = cc.find("Canvas/New Sprite(Splash)/"+layer[i]);
                                                if (layer[i][0] == 'C') {
                                                    let spawn = cc.spawn(cc.moveTo(0.1, -280, -219), cc.scaleTo(0.1, 1.667, 1.667));
                                                    action.push(false);
                                                    let index_now = action.length-1;
                                                    let seq = cc.sequence(spawn, actioncallback(index_now));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(seq);
                                                    card_c.push(layer[i]);
                                                    mc++;
                                                    mc_label.string = String(mc);
                                                } else if (layer[i][0] == 'D') {
                                                    let spawn = cc.spawn(cc.moveTo(0.1, -81, -219), cc.scaleTo(0.1, 1.667, 1.667));
                                                    action.push(false);
                                                    let index_now = action.length-1;
                                                    let seq = cc.sequence(spawn, actioncallback(index_now));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(seq);
                                                    card_d.push(layer[i]);
                                                    md++;
                                                    md_label.string = String(md);
                                                } else if(layer[i][0] == 'H') {
                                                    let spawn = cc.spawn(cc.moveTo(0.1, 119, -219), cc.scaleTo(0.1, 1.667, 1.667));
                                                    action.push(false);
                                                    let index_now = action.length-1;
                                                    let seq = cc.sequence(spawn, actioncallback(index_now));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(seq);
                                                    card_h.push(layer[i]);
                                                    mh++;
                                                    mh_label.string = String(mh);
                                                } else{
                                                    let spawn = cc.spawn(cc.moveTo(0.1, 321, -219), cc.scaleTo(0.1, 1.667, 1.667));
                                                    action.push(false);
                                                    let index_now = action.length-1;
                                                    let seq = cc.sequence(spawn, actioncallback(index_now));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(seq);
                                                    card_s.push(layer[i]);
                                                    ms++;
                                                    ms_label.string = String(ms);
                                                }
                                            }
                                            layer = [];
                                        }
                                    }
                                };
                                action.push(false);
                                let index_now = action.length-1;
                                let spawn1 = cc.spawn(cc.moveTo(0.1, 99, 43), cc.scaleTo(0.1, 1, 1));
                                let seq = cc.sequence(spawn1, finished(index_now));
                                card_now.zIndex = epoch++;
                                card_now.runAction(seq);
                                
                                
                            }
    
                    }   
                        
                        while(1){
                            cc.log('111111111111111111');
                            let flag = 1;
                            for(let i=0; i<action.length; i++) {
                                if(action[i] == false) {flag = 0;}
                            }
                            if(flag == 1) {break;}
                        }
                        self.schedule(loopcallback, 0.7);
                    }
                } else if (response.data.code == 400 && begin == '对局刚开始') {
                        begin = '对局已结束';
                        if (turn == true) {
                            let operation = response_store.data.last_code.split(' ');
                            let type = operation[1];
                            let card_name = operation[2];
                            let card_kind = card_name[0];
                            if (type == '0') {
                                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                                card_now.active = true;
    
                                let finished = cc.callFunc(function () {
                                    if (layer.length == 0) {
                                        layer.push(card_name);
                                    } else {
                                        if (layer[layer.length-1][0] != card_kind) {
                                            layer.push(card_name);
                                        } else if (layer[layer.length-1][0] == card_kind) {
                                            cc.log("到你的回合了：" + turn);
                                            layer.push(card_name);
                                            for(let i=0; i<layer.length; i++) {
                                                card_now = cc.find("Canvas/New Sprite(Splash)/"+layer[i]);
                                                if (layer[i][0] == 'C') {
                                                    let spawn = cc.spawn(cc.moveTo(0.3, -280, 232), cc.scaleTo(0.3, 1.667, 1.667));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(spawn);
                                                    oc++;
                                                    oc_label.string = String(oc);
                                                } else if (layer[i][0] == 'D') {
                                                    let spawn = cc.spawn(cc.moveTo(0.3, -81, 232), cc.scaleTo(0.3, 1.667, 1.667));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(spawn);
                                                    od++;
                                                    od_label.string = String(od);
                                                } else if(layer[i][0] == 'H') {
                                                    let spawn = cc.spawn(cc.moveTo(0.3, 119, 232), cc.scaleTo(0.3, 1.667, 1.667));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(spawn);
                                                    oh++;
                                                    oh_label.string = String(oh);
                                                } else{
                                                    let spawn = cc.spawn(cc.moveTo(0.3, 321, 232), cc.scaleTo(0.3, 1.667, 1.667));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(spawn);
                                                    os++;
                                                    os_label.string = String(os);
                                                }
                                            }
                                            layer = [];
                                        }
                                    }
                                });
    
                                let seq = cc.sequence(cc.moveTo(0.2, 99, 43), finished);
                                card_now.zIndex = epoch++;
                                card_now.runAction(seq);
                                
                            } 
                            else if (type == '1') {
                                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
    
                                let finished = cc.callFunc(function() {
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
                                                if (layer[i][0] == 'C') {
                                                    let spawn = cc.spawn(cc.moveTo(0.2, -280, 232), cc.scaleTo(0.2, 1.667, 1.667));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(spawn);
                                                    oc++;
                                                    oc_label.string = String(oc);
                                                } else if (layer[i][0] == 'D') {
                                                    let spawn = cc.spawn(cc.moveTo(0.2, -81, 232), cc.scaleTo(0.2, 1.667, 1.667));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(spawn);
                                                    od++;
                                                    od_label.string = String(od);
                                                } else if(layer[i][0] == 'H') {
                                                    let spawn = cc.spawn(cc.moveTo(0.2, 119, 232), cc.scaleTo(0.2, 1.667, 1.667));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(spawn);
                                                    oh++;
                                                    oh_label.string = String(oh);
                                                } else{
                                                    let spawn = cc.spawn(cc.moveTo(0.2, 321, 232), cc.scaleTo(0.2, 1.667, 1.667));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(spawn);
                                                    os++;
                                                    os_label.string = String(os);
                                                }
                                            }
                                            layer = [];
                                        }
                                    }
                                });
    
                                let spawn1 = cc.spawn(cc.moveTo(0.2, 99, 43), cc.scaleTo(0.2, 1, 1));
                                let seq = cc.sequence(spawn1, finished);
                                card_now.zIndex = epoch++;
                                card_now.runAction(seq);
                            }
                        } else {
                            let operation = response_store.data.last_code.split(' ');
                            let type = operation[1];
                            let card_name = operation[2];
                            let card_kind = card_name[0];
                            if (type == '0'){ // 牌库里抽
                                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
                                card_now.active = true;
    
                                let finished = cc.callFunc(function() {
                                    if (layer.length == 0) {
                                        layer.push(card_name);
                                    } else {
                                        if (layer[layer.length-1][0] != card_kind) {
                                            layer.push(card_name);
                                        } else if(layer[layer.length-1][0] == card_kind) {
                                            cc.log("现在是对手回合：" + turn);
                                            layer.push(card_name);
                                            for(let i=0; i<layer.length; i++) {
                                                let card_now = cc.find("Canvas/New Sprite(Splash)/"+layer[i]);
                                                if (layer[i][0] == 'C') { 
                                                    let spawn = cc.spawn(cc.moveTo(0.2, -280, -219), cc.scaleTo(0.2, 1.667, 1.667));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(spawn);
                                                    card_c.push(layer[i]);
                                                    mc++;
                                                    mc_label.string = String(mc);   
                                                } else if (layer[i][0] == 'D') {
                                                    let spawn = cc.spawn(cc.moveTo(0.2, -81, -219), cc.scaleTo(0.2, 1.667, 1.667));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(spawn);
                                                    card_d.push(layer[i]);
                                                    md++;
                                                    md_label.string = String(md); 
                                                } else if (layer[i][0] == 'H') {
                                                    let spawn = cc.spawn(cc.moveTo(0.2, 119, -219), cc.scaleTo(0.2, 1.667, 1.667));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(spawn);
                                                    card_h.push(layer[i]);
                                                    mh++;
                                                    mh_label.string = String(mh); 
                                                } else{
                                                    let spawn = cc.spawn(cc.moveTo(0.2, 321, -219), cc.scaleTo(0.2, 1.667, 1.667));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(spawn);
                                                    card_s.push(layer[i]);
                                                    ms++;
                                                    ms_label.string = String(ms);
                                                }
                                            }
                                            layer = [];
                                    }
                                    }
                                });
    
                                let seq = cc.sequence(cc.moveTo(0.2, 99, 43), finished);
                                card_now.zIndex = epoch++;
                                card_now.runAction(seq);
                                
                            } else if (type == '1') {
                                let card_now = cc.find("Canvas/New Sprite(Splash)/"+card_name);
    
                                let finished = cc.callFunc(function() {
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
                                        } else if (layer[layer.length-1][0] == card_kind) {
                                            layer.push(card_name);
                                            for(let i=0; i<layer.length; i++) {
                                                card_now = cc.find("Canvas/New Sprite(Splash)/"+layer[i]);
                                                if (layer[i][0] == 'C') {
                                                    let spawn = cc.spawn(cc.moveTo(0.2, -280, -219), cc.scaleTo(0.2, 1.667, 1.667));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(spawn);
                                                    card_c.push(layer[i]);
                                                    mc++;
                                                    mc_label.string = String(mc);
                                                } else if (layer[i][0] == 'D') {
                                                    let spawn = cc.spawn(cc.moveTo(0.2, -81, -219), cc.scaleTo(0.2, 1.667, 1.667));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(spawn);
                                                    card_d.push(layer[i]);
                                                    md++;
                                                    md_label.string = String(md);
                                                } else if(layer[i][0] == 'H') {
                                                    let spawn = cc.spawn(cc.moveTo(0.2, 119, -219), cc.scaleTo(0.2, 1.667, 1.667));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(spawn);
                                                    card_h.push(layer[i]);
                                                    mh++;
                                                    mh_label.string = String(mh);
                                                } else{
                                                    let spawn = cc.spawn(cc.moveTo(0.2, 321, -219), cc.scaleTo(0.2, 1.667, 1.667));
                                                    card_now.zIndex = epoch++;
                                                    card_now.runAction(spawn);
                                                    card_s.push(layer[i]);
                                                    ms++;
                                                    ms_label.string = String(ms);
                                                }
                                            }
                                            layer = [];
                                        }
                                    }
                                },this,0);
    
                                let spawn1 = cc.spawn(cc.moveTo(0.2, 99, 43), cc.scaleTo(0.2, 1, 1));
                                let seq = cc.sequence(spawn1, finished);
                                card_now.zIndex = epoch++;
                                card_now.runAction(seq);
                                
                                
                            }
                        }
                        // 对局结果判断
                        mycard = mc + md + mh + ms;
                        oppositecard = oc + od + oh + os;
                        if (mycard < oppositecard) {
                            this.result_label.string = "恭喜，您赢了！"
                            this.mask.active = true;
                            this.result.active = true;
                        } else if(mycard > oppositecard) {
                            this.result_label.string = "抱歉，您输了！"
                            this.mask.active = true;
                            this.result.active = true;
                        } else {
                            this.result_label.string = "平局！"
                            this.mask.active = true;
                            this.result.active = true;
                        }
                    } 
                }
            }
        }

        this.schedule(loopcallback, 0.7);
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




    // update (dt) {},
});
