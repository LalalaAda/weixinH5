window.tWxRec = (function($) {
  
  var wxREC = function() {
    this.status = 0;
    //0位代表录音状态码
    //录音状态 0就绪 1录音中 2停止录音 3播放
    this.time = 0;//时间
    this.timer = 0;//计时器
    this.isAndroid = /android/.test(navigator.userAgent.toLowerCase()) ? true : false;
    this.countRECFail = 0;//调用录音失败次数
    this.recMid;
    this.serverId;
    this.qid;
  }
  wxREC.prototype = {
    init: function(params) {
      var _self = this;
      _self.params = params;
      _self.ajaxurl = params.ajaxurl;
      _self.recBtn = document.querySelector(params.recBtn);
      _self.retryBtn = document.querySelector(params.retryBtn);
      $('#lu').on('click', function(e){
        console.log('sssss');
        switch(_self.status){
          case 0:
            startREC();
            break;
          case 1:
            stopREC();
            break;
          case 2:
            playREC();
            break;
          case 3:
            pauseREC();
            break;
          default:
            break;
        }
        return false;
      });
      $(_self.retryBtn).on('touchstart click', function(e){
        initREC();
        return false;
      });
    },
    getStatus: function(){
      return this.status;
    },
    doTime: function(){
      this.time++;
      if(this.time==58 && this.isAndroid){
        clearTime();
        stopREC();
        return;
      }else if(this.time>=59){
        clearTime();
        stopREC();
        return;
      }
      this.timer = setInterval(doTime, 1000);
    },
    clearTime: function(){
      var xx = this.time;
      clearInterval(xx-1);
      clearInterval(xx);
      clearInterval(xx+1);
    },
    startREC: function(){
      var _self = this;
      pauseAllAudio();
      wx.startRecord({
        cancel: function(){console.log('用户拒绝了录音');return;},
        success: function(){
          Timer();
          //todo update UI
          console.log('rec start -- -- --');
          _self.status = 1;
          scaleREC();
        },
        fail: function(res){
          _self.countRECFail++;
          if(getClientVersion() < 602){
            alert('获取录音权限失败，微信版本过低，请更新微信');
          }else if(_self.countRECFail >= 2){
            wx.checkJsApi({
              success: function(res) {
                alert("录音初始化失败，请刷新页面重试");
              },
              fail: function(){
                alert("设备不支持");
              } 
            });
          }
          return;
        }
      });
    },
    scaleREC: function(){
      var _self = this;
      wx.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行complete回调
        complete: function(res) {
          _self.recMid = res.localId;
          _self.status = 2;
          clearTime();
          //todo update UI
          console.log('rec scale -- -- --');
        },
        fail: function(){
          console.log('wx.onVoiceRecordEnd error');
          clearTime();
        }
      });
    },
    stopREC: function(){
      var _self = this;
      wx.stopRecord({
        success: function(res){
          _self.recMid = res.localId;
          _self.status = 2;
          clearTime();
          uploadRECToWX();
          //todo update UI
          console.log('rec stop -- -- --');
        },
        fail: function(e){
          console.log('wx.stopRecord error');
          return;
        }
      });
    },
    uploadRECToWX: function(){
      var _self = this;
      wx.uploadVoice({
        localId: _self.recMid,
        isShowProgressTips: 1,
        success: function(res){
          _self.serverId = res.serverId;
        },
        fail: function(e){
          console.log('wx.uploadVoice error');
        }
      });
    },
    playREC: function(){
      var _self = this;
      pauseAllAudio();
      wx.playVoice({
        localId: _self.recMid
      });
      //todo upload UI
      console.log('rec play -- -- --');
      _self.status=3;
      wx.onVoicePlayEnd({
        success: function(res){
          var localId = res.localId;
          //todo upload UI
          console.log('rec playend -- -- --');
          _self.status=2;
        }
      });
    },
    pauseREC: function(){
      var _self = this;
      wx.pauseVoice({
        localId: _self.recMid
      });
      //todo upload UI
      console.log('rec pause -- -- --');
      _self.status = 2;
    },
    initREC: function(){
      var _self = this;
      _self.status = 0;
      _self.time = 0;
      clearTime();
      _self.timer = 0;
      _self.countRECFail = 0;
      //todo upload UI
      console.log('rec init -- -- --');
    },
    uploadRECToSE: function(){
      var _self = this;
      //需要jquery或者zepto
      //注意 传递的data 是否错误？
      _self.next = 1;//防止多次点击
      $.ajax({
        type: 'POST',
        url: _self.ajaxurl,
        dataType: 'json',
        data: "meidaId="+_self.serverId+"&eventId="+_self.qid+"&length="+(_self.time<1?1:_self.time),
        beforeSend: function(){
          showLongTips('正在上传语音');
        },
        success: function(data){
          if(data.rc!=0){
            alert('录音失败，请刷新页面重试');
          }else{
            //todo next
          }
        },
        complete: function(){
          _self.next = 0;
        }
      })
    }
  }

  //工具方法
  /*获取微信版本号*/
  function getClientVersion(){
    var uaStr = navigator.userAgent,
        wechatInfo = uaStr.match(/MicroMessenger\/([\d\.]+)/i),
        version;
    if(wechatInfo){
      version=parseInt(wechatInfo[1].split('.').join('').substring(0, 3), 10);
    }else{
      version=0;
    }
    return version;
  }
  /*检测页面所有audio*/
  /*暂停页面所有的audio*/
  function pauseAllAudio(){
    var audios = document.querySelectorAll("audio"),
        alength = audios.length;
    if(alength>0){
      for(var i=0; i<alength; i++) {
        audios[i].pause();
      }
    }else{
      return;
    }
  }
  /*一个全屏提示*/
  function showLongTips(a){
    var el = document.createElement('div');
    el.className = "Aertips";
    el.setAttribute("id", "LongTips");
    el.innerText = a;
    document.body.appendChild(el);
    setTimeout(function(){
      document.querySelector('LongTips').style.visibility="hidden";
    }, 1000);
  }

  return wxREC;
})(window.Zepto);

