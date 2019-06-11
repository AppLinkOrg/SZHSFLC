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
        if (newtasklist[i].status == 'J') {
          list.push(newtasklist[i])
        }
      }
      this.Base.setMyData({
        newtasklist: list,
      })
      console.log(list);
    })
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '超时任务',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)