// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  TaskApi
} from "../../apis/task.api.js";
import {
  StatusApi
} from "../../apis/status.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }


  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      ctt: 1
    });
  }
  onMyShow() {
    var that = this;
    var taskapi = new TaskApi();
    taskapi.newtasklist({}, (newtasklist) => {
      var list = [];
      var list1 = [];
      for (var i = 0; i < newtasklist.length; i++) {
        if (newtasklist[i].status == 'A') {
          list.push(newtasklist[i])
        } else if(newtasklist[i].status == 'B'){
          list1.push(newtasklist[i])
        }
      }
      this.Base.setMyData({
        newtasklist: list,
        ontasklist: list1
      })
      console.log(list);
    })
    taskapi.taskinfo({}, (taskinfo) => {
      this.Base.setMyData({
        taskinfo
      })
    })
    // taskapi.hetongtask({}, (hetongtask) => {
    //   this.Base.setMyData({
    //     hetongtask
    //   })
    // })

  }
  guaqi() {
    wx.showModal({
      title: '确认挂起吗？',
      content: '挂起任务可在我的中心查看',
      success: function(res) {
        if (res.confirm) { //这里是点击了确定以后
          console.log('用户点击确定')
        } else { //这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  }
  linqurenwu(e) {
    var that = this;
    var statusapi = new StatusApi();
    var type = e.currentTarget.dataset.type;
    console.log(type);
    var id = e.currentTarget.id;
    var url = '';
    wx.showModal({
      title: '确认领取吗？',
      //content: '挂起任务可在我的中心查看',
      success: function(res) {
        if (res.confirm) {
          if (type == 'selectio') {
            url = '/pages/site/site?id=' + id
          } else if (type == 'contract_data') {
            url = '/pages/fillcontract/fillcontract?id=' + id
          } else if (type == 'project') {
            url = '/pages/design/design?id=' + id
          } else if (type == 'start') {
            url = '/pages/startreport/startreport?id=' + id
          } else if (type == 'receive') {
            url = '/pages/getcargo/getcargo?id=' + id
          } else if (type == 'allocation') {
            url = '/pages/diaohuo/diaohuo?id=' + id
          } else if (type == 'construction') {
            url = '/pages/construction/construction?id=' + id
          } else if (type == 'open') {
            url = '/pages/openup/openup?id=' + id
          } else if (type == 'acceptance') {
            url = '/pages/acceptance/acceptance?id=' + id
          }
          console.log(url)
          wx.navigateTo({
            url: url,
          })
          wx.showToast({
            title: '领取成功',
            icon: 'success',
            duration: 1000 //持续的时间
          })
          statusapi.site({
            id: id
          }, (site) => {
            console.log(site)
          })
        } else {
          console.log('用户点击取消')
        }
      }
    })
  }
  chakan(e) {
    var id = e.currentTarget.id;
    var type = e.currentTarget.dataset.type;
    console.log(type);
    var url = '';
    //   var aa = e.currentTarget.dataset.name;
    //   console.log(aa);
    //   //return;
    //   wx.navigateTo({
    //     url: '/pages/site/site?aaa=' + id + '&id=' + aa,
    //   })
    // 
    
    if (type == 'selectio') {
      console.log(111);
      url = '/pages/site/site?id=' + id
    } else if (type == 'contract_data') {
      url = '/pages/fillcontract/fillcontract?id=' + id
    } else if (type == 'project') {
      url = '/pages/design/design?id=' + id
    } else if (type == 'start') {
      url = '/pages/startreport/startreport?id=' + id
    } else if (type == 'receive') {
      url = '/pages/getcargo/getcargo?id=' + id
    } else if (type == 'allocation') {
      url = '/pages/diaohuo/diaohuo?id=' + id
    } else if (type == 'construction') {
      url = '/pages/construction/construction?id=' + id
    } else if (type == 'open') {
      url = '/pages/openup/openup?id=' + id
    } else if (type == 'acceptance') {
      url = '/pages/acceptance/acceptance?id=' + id
    }
    console.log(url)
    wx.navigateTo({
      url: url,
    })
  }
  bindwaitcompleted(e) {
    this.Base.setMyData({
      ctt: 2
    })
    this.onMyShow();
  }
  bindcontact(e) {
    this.Base.setMyData({
      ctt: 1
    })
    this.onMyShow();
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcompleted = content.bindcompleted;
body.bindwaitcompleted = content.bindwaitcompleted;
body.bindcontact = content.bindcontact;
body.guaqi = content.guaqi;
body.linqurenwu = content.linqurenwu;
body.chakan = content.chakan;
Page(body)