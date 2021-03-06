var getMessage = {
  appKey:"x18ywvqfxn0nc",
  token:"5cdqi7M319jD9dt3+EK5K3cvfpBMyPSTAUbzy3yG9ub43qQTjT46PCq8DbZPrkGGrkmQswDhi71IeJrWruKGEg==",
  userId:'12',
  name:"vivian",
  init: function () {
    var me = this
    me.getToken()
  },
  getToken: function () {
    var me = this;
    RongIMClient.init(me.appKey);
    RongIMClient.setConnectionStatusListener({
      onChanged : function(status) {
        switch (status) {
          // 链接成功
          case RongIMLib.ConnectionStatus.CONNECTED:
            console.log('***链接成功');
            break;
          // 正在链接
          case RongIMLib.ConnectionStatus.CONNECTING:
            console.log('***正在链接');
            break;
          // 重新链接
          case RongIMLib.ConnectionStatus.DISCONNECTED:
            console.log('***断开连接');
            break;
          // 其他设备登陆
          case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
            console.log('***其他设备登陆');
            break;
          // 网络不可用
          case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
            console.log('***网络不可用');
            break;
        }
      }
    });

    me.connect()
    // 消息监听器
    RongIMClient.setOnReceiveMessageListener({
      // 接收到的消息
      onReceived: function (message) {
        // 判断消息类型
        switch (message.messageType) {
          case RongIMClient.MessageType.TextMessage:
            // 发送的消息内容将会被打印
            // alert(message.content.content);
            var id = message.content.senderUserId;
            // var obj = loadUsInfo(id);//通过发送者的信息
            var obj = {
              userId:'12',
              realname:"vivian",
              id:"ffff"
            }
            var htm = '<span>' + obj.realname + '</span>'
            htm += '<span>'+ JSON.stringify(message.content) +'</span>'
            document.getElementById('uslist').innerHTML = htm
            break;
          case RongIMClient.MessageType.VoiceMessage:
            // 对声音进行预加载
            // message.content.content 格式为 AMR 格式的 base64 码
            RongIMLib.RongIMVoice.preLoaded(message.content.content);
            break;
          case RongIMClient.MessageType.ImageMessage:
            // do something...
            break;
          case RongIMClient.MessageType.DiscussionNotificationMessage:
            // do something...
            break;
          case RongIMClient.MessageType.LocationMessage:
            // do something...
            break;
          case RongIMClient.MessageType.RichContentMessage:
            // do something...
            break;
          case RongIMClient.MessageType.DiscussionNotificationMessage:
            // do something...
            break;
          case RongIMClient.MessageType.InformationNotificationMessage:
            // do something...
            break;
          case RongIMClient.MessageType.ContactNotificationMessage:
            // do something...
            break;
          case RongIMClient.MessageType.ProfileNotificationMessage:
            // do something...
            break;
          case RongIMClient.MessageType.CommandNotificationMessage:
            // do something...
            break;
          case RongIMClient.MessageType.CommandMessage:
            // do something...
            break;
          case RongIMClient.MessageType.UnknownMessage:
            // do something...
            break;
          default:
        // 自定义消息
        // do something...
                console.log("*************message");
        }
      }
    })

  },
  connect: function(){
    var me = this
    RongIMClient.connect(me.token, {
      onSuccess: function (userId) {
        console.log("*********Login successfully."+ userId);
        // userId是申请token时的填写的id，到时候可以封装在下面的extra中传过去
      },
      onTokenIncorrect: function () {
        console.log('token无效')
      },
      onError:function(errorCode){
        var info = ''
        switch (errorCode) {
          case RongIMLib.ErrorCode.TIMEOUT:
            info = '超时'
            break;
          case RongIMLib.ErrorCode.UNKNOWN_ERROR:
            info = '未知错误'
            break;
          case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
            info = '不可接受的协议版本'
            break;
          case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
            info = 'appkey不正确'
            break;
          case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
            info = '服务器不可用'
            break;
        }
        console.log(errorCode)
      }
    })
  }
}
getMessage.init();
