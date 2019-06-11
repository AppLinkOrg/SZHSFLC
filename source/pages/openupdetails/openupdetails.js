

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
  }
  onMyShow() {
    var id = this.Base.getMyData().id;
    var taskapi = new TaskApi();
    var id = this.Base.getMyData().memberinfo.id;
    taskapi.newtasklist({ supervisor: AppBase.dd.id}, (newtasklist) => {
      this.Base.setMyData({
        newtasklist
      })
    })
    taskapi.kaitongtask({
      id: this.options.id
    }, (kaitongtask) => {
      this.Base.setMyData({
        kaitongtask
      })
    })
  }

 
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)