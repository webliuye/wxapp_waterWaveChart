//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.renderChart();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  renderChart(){
    var ctx = wx.createCanvasContext('myCanvas');
    this.percent=70;//定义比率
    var waveWidth = 200,
    offset = 0,
    waveHeight = 4,//调整波浪高度
    waveCount = 2,//调整波浪宽度
    startX = -100,
    startY = 108,
    lineWidth=2,//圈的宽度
    progress = 0,
    progressStep = 1,
    d2 = waveWidth / waveCount,
    d = d2 / 2,
    hd = d / 2;
    var c={
      width:50,
      height:50
    };    
    function tick() {
      offset -= 5;
      progress += progressStep;
      if (progress > 70|| progress < 0) progressStep *= 0;      
      if (-1 * offset === d2) offset = 0;
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.beginPath();
      ctx.arc(c.width,c.height,c.width-lineWidth-1,0,2 * Math.PI);
      ctx.lineWidth=lineWidth;
      ctx.strokeStyle = 'blue';//圈的颜色
      ctx.stroke()//画实心圆;
      ctx.clip();//限定范围；
      ctx.beginPath();
      var offsetY = startY - progress;
      ctx.moveTo(startX - offset, offsetY);  
      for (var i = 0; i < waveCount; i++) {
          var dx = i * d2;
          var offsetX = dx + startX - offset;
          ctx.quadraticCurveTo(offsetX + hd, offsetY + waveHeight, offsetX + d, offsetY);
          ctx.quadraticCurveTo(offsetX + hd + d, offsetY - waveHeight, offsetX + d2, offsetY);
      }
      const gradient = ctx.createLinearGradient(0, 0, 0,progress);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(1, '#1890FF');
      ctx.fillStyle = gradient;
      ctx.lineTo(startX + waveWidth, 200);
      ctx.lineTo(startX, 200);
      ctx.fill(); 
      ctx.draw();
      setTimeout(tick,100);
  }
 
  tick();
      
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
