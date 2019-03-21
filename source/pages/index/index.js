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
      this.Base.setMyData({
        newtasklist
      })
    })

  }
  asd() {
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
    var type = e.currentTarget.dataset.type;
    console.log(type);
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
  tianxie(e) {
    var id = e.currentTarget.id;
    var aa = e.currentTarget.dataset.name;
    console.log(aa);
    //return;
    wx.navigateTo({
      url: '/pages/taskdetails/taskdetails?aaa=' + id + '&id=' + aa,
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
body.asd = content.asd;
body.linqurenwu = content.linqurenwu;
body.tianxie = content.tianxie;
Page(body)