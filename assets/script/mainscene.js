

cc.Class({
    extends: cc.Component,

    properties: {
        button1 : cc.Button,
        button2 : cc.Button,
        button3 : cc.Button,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.button1.node.on('click', this.callback1, this);
        this.button2.node.on('click', this.callback2, this);
        this.button3.node.on('click', this.callback3, this);

    },

    callback1(button1) {
        cc.log("button1");
        let url = "http://172.17.173.97:8080/api/user/login";
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        var obj = { student_id: "021900128", password: "wyz010727"};
        xhr.send('student_id=021900128&password=wyz010727');
        xhr.onreadystatechange = function () {
        if (xhr.status == 200) {
            var response = xhr.responseText;
            response = JSON.parse(response);
            // cc.log(response.data.token);
            cc.sys.localStorage.setItem("token",response.data.token);
            cc.director.loadScene("gameCenter");
        }
        };
        xhr.onerror = function(evt){
        console.log(evt);
        }
    },

    callback2(button2) {
        cc.director.loadScene("gameScene_p2c");
    },

    callback3(button3) {
        cc.director.loadScene("gameScene_p2p");
    },


    // update (dt) {},
});
