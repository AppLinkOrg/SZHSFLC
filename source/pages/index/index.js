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
import {
  SupervisorApi
} from "../../apis/supervisor.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }

  onLoad(options) {
    this.Base.Page = this;
    super.onLoad(options);
    this.Base.setMyData({
      ctt: 1
    });
    console.log(AppBase.dd);
    var userinfo = wx.getStorageSync('userinfo')
    console.log(userinfo);
    AppBase.dd = userinfo;
    if (userinfo==''){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  }

  onMyShow() {
    var that = this;
    var taskapi = new TaskApi();
    var supervisorapi = new SupervisorApi();
    var id = this.Base.getMyData().memberinfo.id;
    taskapi.newtasklist({
      supervisor: 
      AppBase.dd.id
    }, (newtasklist) => {
      var list = [];
      var list1 = [];
      console.log(newtasklist);
      for (var i = 0; i < newtasklist.length; i++) {
        if (newtasklist[i].status == 'A') {
          list.push(newtasklist[i])
        } else if (newtasklist[i].status == 'B') {
          list1.push(newtasklist[i])
        }
      }
      this.Base.setMyData({
        newtasklist: list,
        ontasklist: list1
      })
      console.log(list);
    })

    //return;
  }
  guaqi(e) {
    var that = this;
    var statusapi = new StatusApi();
    var type = e.currentTarget.dataset.type;
    console.log(type);
    var id = e.currentTarget.id;
    wx.showModal({
      title: '确认挂起吗？',
      content: '挂起任务可在我的中心查看',
      success: function(res) {
        if (res.confirm) { //这里是点击了确定以后
          if (type == 'selectio') {
            statusapi.guaqi({
              id: id,
              gq: "A"
            }, (guaqi) => {})
          } else if (type == 'contract_data') {
            statusapi.guaqi({
              id: id,
              gq: "B"
            }, (guaqi) => {
              console.log(guaqi)
            })
          } else if (type == 'project') {
            statusapi.guaqi({
              id: id,
              gq: "C"
            }, (guaqi) => {
              console.log(guaqi)
            })
          } else if (type == 'start') {
            statusapi.guaqi({
              id: id,
              gq: "D"
            }, (guaqi) => {
              console.log(guaqi)
            })
          } else if (type == 'receive') {
            statusapi.guaqi({
              id: id,
              gq: "E"
            }, (guaqi) => {
              console.log(guaqi)
            })
          } else if (type == 'allocation') {
            statusapi.guaqi({
              id: id,
              gq: "F"
            }, (guaqi) => {
              console.log(guaqi)
            })
          } else if (type == 'construction') {
            statusapi.guaqi({
              id: id,
              gq: "G"
            }, (guaqi) => {
              console.log(guaqi)
            })
          } else if (type == 'open') {
            statusapi.guaqi({
              id: id,
              gq: "H"
            }, (guaqi) => {
              console.log(guaqi)
            })
          } else if (type == 'acceptance') {
            statusapi.guaqi({
              id: id,
              gq: "I"
            }, (guaqi) => {
              console.log(guaqi)
            })
          } else if (type == 'danyou') {
            statusapi.guaqi({
              id: id,
              gq: "J"
            }, (guaqi) => {
              console.log(guaqi)
            })
          }
          else if (type == 'rctask') {
            statusapi.guaqi({
              id: id,
              gq: "K"
            }, (guaqi) => {
              console.log(guaqi)
            })
          }
          wx.showToast({
            title: '挂起任务成功',
            icon: 'success',
            duration: 1000 //持续的时间
          })
        }
      }
    })
    this.onMyShow();
  }

  linqurenwu(e) {
    var that = this;
    var statusapi = new StatusApi();
    var type = e.currentTarget.dataset.type;
    console.log(type);
    var id = e.currentTarget.id;
    var url = '';
    wx.showModal({
      content: '确认领取吗？',
      //content: '挂起任务可在我的中心查看',
      success: function(res) {
        if (res.confirm) {
          if (type == 'selectio') {
            url = '/pages/site/site?id=' + id
            statusapi.site({
              id: id,
              jx: "A"
            }, (site) => {
              console.log(site)
            })
          } else if (type == 'contract_data') {
            url = '/pages/fillcontract/fillcontract?id=' + id
            statusapi.site({
              id: id,
              jx: "B"
            }, (site) => {
              console.log(site)
            })
          } else if (type == 'project') {
            url = '/pages/design/design?id=' + id
            statusapi.site({
              id: id,
              jx: "C"
            }, (site) => {
              console.log(site)
            })
          } else if (type == 'start') {
            url = '/pages/startreport/startreport?id=' + id
            statusapi.site({
              id: id,
              jx: "D"
            }, (site) => {
              console.log(site)
            })
          } else if (type == 'receive') {
            url = '/pages/getcargo/getcargo?id=' + id
            statusapi.site({
              id: id,
              jx: "E"
            }, (site) => {
              console.log(site)
            })
          } else if (type == 'allocation') {
            url = '/pages/diaohuo/diaohuo?id=' + id
            statusapi.site({
              id: id,
              jx: "F"
            }, (site) => {
              console.log(site)
            })
          } else if (type == 'construction') {
            url = '/pages/construction/construction?id=' + id
            statusapi.site({
              id: id,
              jx: "G"
            }, (site) => {
              console.log(site)
            })
          } else if (type == 'open') {
            url = '/pages/openup/openup?id=' + id
            statusapi.site({
              id: id,
              jx: "H"
            }, (site) => {
              console.log(site)
            })
          } else if (type == 'acceptance') {
            url = '/pages/acceptance/acceptance?id=' + id
            statusapi.site({
              id: id,
              jx: "I"
            }, (site) => {
              console.log(site)
            })
          } else if (type == 'danyou') {
            url = '/pages/danyou/danyou?id=' + id
            statusapi.site({
              id: id,
              jx: "J"
            }, (site) => {
              console.log(site)
            })
          } else if (type == 'rctask') {
            url = '/pages/rctask/rctask?id=' + id
            statusapi.site({
              id: id,
              jx: "K"
            }, (site) => {
              console.log(site)
            })
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

        }
      }

    })
  }




  chakan(e) {
    var that = this;
    var taskapi = new TaskApi();
    var statusapi = new StatusApi();
    var type = e.currentTarget.dataset.type;
    console.log(type);
    // return;
    var id = e.currentTarget.id;
    var url = '';
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
    } else if (type == 'danyou') {
      url = '/pages/danyou/danyou?id=' + id
    } else if (type == 'rctask') {
      url = '/pages/rctask/rctask?id=' + id
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
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '数字化室分管理',
    })
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