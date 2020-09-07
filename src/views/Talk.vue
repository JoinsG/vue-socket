<template>
  <div id="talk_each">
    <div class="talk_each__left">
      <div class="user_info">
        <el-avatar icon="el-icon-user-solid"></el-avatar>
        <p class="user_name"></p>
      </div>
      <div class="talk_lists">
        <div class="friends__item">
          <div class="left__friends">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
          </div>
          <div class="right__firends">
            <span>朋友名字</span>
            <p class="new_lists">最新消息</p>
          </div>
          <el-badge :value="3" class="info_ts"></el-badge>
        </div>
      </div>
    </div>
    <div class="talk_each__right">
      <div class="talk_main">
        <div class="talk_txt_lists">
          <div class="talk_txt_lists__scroll">
            <div class="tall__from_user">
              <div class="from_user__left">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
              </div>
              <div class="from_user__txt talk_list">我撒打算放爱打架杀戮空间啊</div>
            </div>
            <div class="talk__me">
              <div class="from_user__txt talk_list">我撒打算放爱打架杀戮空间啊</div>
            </div>
            <div class="tall__from_user">
              <div class="from_user__left">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
              </div>
              <div class="from_user__txt talk_list">我撒打算放爱打架杀戮空间啊</div>
            </div>
            <div class="talk__me">
              <div class="from_user__txt talk_list">我撒打算放爱打架杀戮空间啊</div>
            </div>
            <div class="tall__from_user">
              <div class="from_user__left">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
              </div>
              <div class="from_user__txt talk_list">我撒打算放爱打架杀戮空间啊</div>
            </div>
            <div class="talk__me">
              <div class="from_user__txt talk_list">我撒打算放爱打架杀戮空间啊</div>
            </div>
            <div class="tall__from_user">
              <div class="from_user__left">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
              </div>
              <div class="from_user__txt talk_list">我撒打算放爱打架杀戮空间啊</div>
            </div>
            <div class="talk__me">
              <div class="from_user__txt talk_list">我撒打算放爱打架杀戮空间啊</div>
            </div>
            <div class="tall__from_user">
              <div class="from_user__left">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
              </div>
              <div class="from_user__txt talk_list">我撒打算放爱打架杀戮空间啊</div>
            </div>
            <div class="talk__me">
              <div class="from_user__txt talk_list">我撒打算放爱打架杀戮空间啊</div>
            </div>
            <div class="tall__from_user">
              <div class="from_user__left">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
              </div>
              <div class="from_user__txt talk_list">我撒打算放爱打架杀戮空间啊</div>
            </div>
            <div class="talk__me">
              <div class="from_user__txt talk_list">我撒打算放爱打架杀戮空间啊</div>
            </div>
            <div class="tall__from_user">
              <div class="from_user__left">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
              </div>
              <div class="from_user__txt talk_list">我撒打算放爱打架杀戮空间啊</div>
            </div>
            <div class="talk__me">
              <div class="from_user__txt talk_list">我撒打算放爱打架杀戮空间啊</div>
            </div>
          </div>
        </div>
      </div>
      <div class="talk_input">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="modelMessage.txt"></el-input>
        <div class="tall_input__btn">
          <el-button type="primary" @click="sendWsMessage" size="mini">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "talk_each",
  props: ["friendsList","ws"],
  data() {
    return {
    
      modelMessage: {
        to: "",
        from: "",
        txt:''
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
      sendWsMessage(){
          let mess = JSON.stringify({...modelMessage})
          this.ws.send(mess)
      }
  },
  components: {}
};
</script>

<style scoped>
#talk_each {
  width: 75%;
  border-radius: 6px;
  overflow: hidden;
  background-color: deepskyblue;
  border: 1px solid deepskyblue;
  display: flex;
  margin: auto;
  height: 600px;
}
#talk_each .talk_each__left {
  flex: 0 0 25%;
  background-color: white;
  margin: 4px;
  border-radius: 6px;
}
#talk_each .talk_each__right {
  flex: 1 1 75%;
  background-color: white;
  padding: 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 6px;
  margin: 4px;
}
.user_info {
  display: flex;
  padding: 6px;
  border-bottom: 1px solid #232323;
}
.talk_each__right .talk_main {
  margin-bottom: 15px;
  border-bottom: 1px solid #434343;
  padding: 0 0 10px 0;
  flex-grow: 4;
  height: 100%;
}
#talk_each .talk_each__right .talk_input {
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 15%;
}
.talk_lists {
  padding: 0 10px;
}
.talk_lists .friends__item {
  display: flex;
  border-bottom: 1px solid #333;
  padding: 4px 0;
}
.friends__item .info_ts {
  margin-left: auto;
  position: relative;
  top: 10px;
}
.right__firends .new_lists {
  margin: 0;
  line-height: 14px;
}
.tall__from_user {
  display: flex;
  align-items: center;
}
.tall__from_user .from_user__txt {
  padding: 5px;
}
.talk_txt_lists {
  overflow: auto;
  height: 100%;
  background-color: #4343432b;
  padding: 6px;
  border-radius: 6px;
}
.talk_txt_lists .talk_list {
  padding: 6px;
  border-radius: 6px;
  overflow: hidden;
  background-color: aqua;
}
.talk__me {
  display: flex;
  justify-content: flex-end;
}
.tall_input__btn {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
