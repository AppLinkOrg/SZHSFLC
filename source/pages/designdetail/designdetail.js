
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
    //var that = this;
    var taskapi = new TaskApi();
    var id = this.Base.getMyData().memberinfo.id;
    taskapi.newtasklist({ supervisor: AppBase.dd.id}, (newtasklist) => {
      this.Base.setMyData({
        newtasklist
      })
    })
    taskapi.fangansjtask({
      id: this.options.id
    }, (fangansjtask) => {
      this.Base.setMyData({
        fangansjtask
      })
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

Page(body)