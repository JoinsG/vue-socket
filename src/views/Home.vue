<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="user">
      用户：
      <input type="text" v-model="form.username" />
    </div>
    <div class="password">
      密码：
      <input type="text" v-model="form.password" />
    </div>
    <div class="ss">
      朋友ID：
      <input type="text" v-model="friendID" />
    </div>
    <button @click="login">登陆</button>
    <button @click="wocket">连接</button>
    <button @click="close">断开连接</button>
    <button @click="createdUser">创建用户</button>
    <button @click="addUser">添加好友</button>
    <button @click="getFriend">获取好友</button>
    <button @click="checkUser">检查用户是否存在</button>
    <talkWindow :friendsList="friendsList" :ws="ws"></talkWindow>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import talkWindow from "./Talk.vue";
let ws = null;
export default {
  name: "Home",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      userInfo: "",
      messageId: "",
      friendsList: [],
      ws: ws,
      friendID: ""
    };
  },
  created() {
    // this.$axios.get("/test").then(res => {
    //   console.log(res);
    // });
    this.$once("hook:beforeDestroy", function() {
      ws && ws.close();
    });
  },
  methods: {
    login() {
      this.$axios
        .post("/user/login", this.form)
        .then(res => {
          console.log(res);
          this.userInfo = res.success[0];
          this.getFriends();
          // this.wocket()
        });
    },
    getFriends() {
      this.$axios
        .get("/user/friends", {
          params: {
            id: this.userInfo._id
          }
        })
        .then(res => {
          this.friendsList = res.success;
          console.log(res);
          console.log(this.friendsList);
        });
    },
    close() {
      ws && ws.close();
    },
    wocket() {
      let vueThat = this;
      ws = new WebSocket("ws://localhost:9000");
      ws.onopen = () => {
        console.log("client：打开连接");
        ws.send(
          JSON.stringify({
            content: "测试连接",
            userId: vueThat.userInfo._id,
            type: true
          }),
          function() {
            console.log("测试回调");
          }
        );
        // this.wotxt.type = "close";
      };
      ws.onmessage = function(e) {
        console.log("client：接收到服务端的消息 " + e.data);
        // setTimeout(() => {
        //   ws.close();
        // }, 5000);
      };
      ws.onclose = function(params) {
        console.log("client：关闭连接");
      };
    },
    wocketsend() {
      ws && ws.send(JSON.stringify(this.wotxt));
    },
    createdUser() {
      let data = this.form
      this.$axios.post("/user/createUser",data).then(res => {
        console.log(res);
      });
    },
    addUser() {
      this.$axios.post("/user/addFriend",{
        friendID:this.friendID,
        userId:this.userInfo._id
      }).then(res => {
        console.log(res);
      });
    },
    getFriend() {
      this.$axios.get("/getFriendInfo").then(res => {
        console.log(res);
      });
    },
    checkUser() {
      this.$axios
        .get("/user/check", {
          params: {
            username: "5f3e95ba37c6d75944e1b631"
          }
        })
        .then(res => {
          console.log(res);
        });
    }
  },
  components: {
    HelloWorld,
    talkWindow
  }
};
</script>
