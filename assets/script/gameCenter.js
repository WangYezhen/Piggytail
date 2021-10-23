

cc.Class({
    extends: cc.Component,

    properties: {
        button_back : cc.Button,
        button_creat : cc.Button,
        button_enter : cc.Button,
        login_enter : cc.Node,
        login_close : cc.Button,
        login_ok : cc.Button,
        mask : cc.Node,
        exText_1: cc.EditBox,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let count =0;
        let colldownCallback=()=>{
            count ++;
            this.unschedule(colldownCallback);
            cc.log('count');
            count ++;
            cc.log("count: ",count);
        }
        this.schedule(colldownCallback, 1);

        
        this.button_back.node.on('click', this.callback_back, this);
        this.button_creat.node.on('click', this.callback_creat, this);
        this.button_enter.node.on('click', this.callback_enter, this);
        this.login_close.node.on('click', this.callback_login_close, this);
        this.login_ok.node.on('click', this.callback_login_ok, this);
        this.mask.node.on('click', this.callback_mask, this);
        this.exText_1.node.on('editing-did-ended', this.editEnd, this);

        

    },

    callback_mask(mask) {

    },

    callback_login_close(login_close) {
        this.login_enter.active = false;
        this.mask.active = false;
    },

    editEnd(){
    },

    callback_login_ok(login_ok) {
        cc.log(this.exText_1.string);
        let uuid = this.exText_1.string;
        cc.sys.localStorage.setItem("uuid",uuid);
        let url = "http://172.17.173.97:9000/api/game/" + uuid;
        let xhr = new XMLHttpRequest();

        xhr.open("POST", url, true);
        var token=cc.sys.localStorage.getItem("token");
        xhr.setRequestHeader("Authorization", token);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.status == 200) {
                var response_enter = xhr.responseText;
                cc.director.loadScene("gameScene_online");
                // cc.log(uuid)

            } else {
                cc.log("enter出错！");
            }
            };
    },

    callback_back(button_back) {
        cc.director.loadScene("MainScene");
    },

    callback_creat(button_creat) {
        cc.log("button_creat");
        let url = "http://172.17.173.97:9000/api/game";
        let xhr1 = new XMLHttpRequest();
        xhr1.open("POST", url, true);
        let token=cc.sys.localStorage.getItem("token");
        cc.log(token)
        xhr1.setRequestHeader("Authorization", token);
        xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhr1.send();
        xhr1.onreadystatechange = function () {
        if (xhr1.status == 200) {
            var response_creat = xhr1.responseText;
            response_creat = JSON.parse(response_creat);
            // cc.log(response.data.token);
            // cc.log(response_creat);
            let uuid = response_creat.data.uuid;
            cc.sys.localStorage.setItem("uuid",uuid);
            cc.log(uuid);
            cc.director.loadScene("gameScene_online");

        } else {
            cc.log("creat出错！");
        }
        };
        xhr1.onerror = function(evt){
        console.log(evt);
        }     
    },

    callback_enter(button_enter) {
        cc.log("button_enter");
        this.login_enter.active = true;
        this.mask.active = true;
    },

    // update (dt) { },
});
