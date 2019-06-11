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
    var id = this.Base.getMyData().memberinfo.id;
    taskapi.newtasklist({
      supervisor:
      AppBase.dd.id
    }, (newtasklist) => {
      var list = [];
      for (var i = 0; i < newtasklist.length; i++) {
        if (newtasklist[i].status == 'E') {
          list.push(newtasklist[i])
        }
      }
      this.Base.setMyData({
        newtasklist: list,
      })
      console.log(list);
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
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '挂起任务',
    })
  }



}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.linqurenwu = content.linqurenwu;
Page(body)