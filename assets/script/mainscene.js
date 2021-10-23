

cc.Class({
    extends: cc.Component,

    properties: {
        button1 : cc.Button,
        button2 : cc.Button,
        button3 : cc.Button,
        mask : cc.Node,
        login_ok : cc.Button,
        login_enter : cc.Node,
        login_close : cc.Button,
        id: cc.EditBox,
        password: cc.EditBox,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.button1.node.on('click', this.callback1, this);
        this.button2.node.on('click', this.callback2, this);
        this.button3.node.on('click', this.callback3, this);
        this.login_close.node.on('click', this.callback_login_close, this);
        this.login_ok.node.on('click', this.callback_login_ok, this);
        this.mask.node.on('click', this.callback_mask, this);
        this.id.node.on('editing-did-ended', this.editEnd, this);
        this.password.node.on('editing-did-ended', this.editEnd, this);

    },

    callback_login_close(login_close) {
        this.login_enter.active = false;
        this.mask.active = false;
    },

    callback_mask(mask) {

    },

    editEnd(){
    },

    callback_login_ok() {
        let url = "http://172.17.173.97:8080/api/user/login";
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        let id = this.id.string;
        let password = this.password.string;
        let sendmessage = 'student_id=' + id + '&password=' + password;
        xhr.send(sendmessage);
        xhr.onreadystatechange = function () {
        if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            // cc.log(response.data.token);
            cc.sys.localStorage.setItem("token",response.data.token);
            cc.director.loadScene("gameCenter");
        }
        };

    },


    callback1(button1) {
        this.login_enter.active = true;
        this.mask.active = true;
    },

    callback2(button2) {
        cc.director.loadScene("gameScene_p2c");
    },

    callback3(button3) {
        cc.director.loadScene("gameScene_p2p");
    },


    // update (dt) {},
});
