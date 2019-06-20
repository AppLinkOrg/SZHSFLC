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
        if (newtasklist[i].status == 'C') {
          list.push(newtasklist[i])
        }
      }
      this.Base.setMyData({
        newtasklist: list,
      })
      console.log(list);
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
      url = '/pages/sitedetails/sitedetails?id=' + id
    } else if (type == 'contract_data') {
      url = '/pages/fillcontractdetails/fillcontractdetails?id=' + id
    } else if (type == 'project') {
      url = '/pages/designdetail/designdetail?id=' + id
    } else if (type == 'start') {
      url = '/pages/startreportdetails/startreportdetails?id=' + id
    } else if (type == 'receive') {
      url = '/pages/getcargodetails/getcargodetails?id=' + id
    } else if (type == 'allocation') {
      url = '/pages/diaohuodetails/diaohuodetails?id=' + id
    } else if (type == 'construction') {
      url = '/pages/constructiondetails/constructiondetails?id=' + id
    } else if (type == 'open') {
      url = '/pages/openupdetails/openupdetails?id=' + id
    } else if (type == 'acceptance') {
      url = '/pages/acceptancedetails/acceptancedetails?id=' + id
    } else if (type == 'danyou') {
      url = '/pages/danyoudetails/danyoudetails?id=' + id
    } else if (type == 'rctask') {
      url = '/pages/rctaskdetails/rctaskdetails?id=' + id
    }
    console.log(url)
    wx.navigateTo({
      url: url,
    })
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '已完成任务',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.chakan = content.chakan;
Page(body)