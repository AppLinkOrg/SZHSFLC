// pages/site/site.js
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
    
    // this.Base.setMyData({
    //   taskname: this.Base.options.aaa
    // });
    var task = this.Base.options.aaa;
    var id = this.Base.options.id;
    console.log(task);

    if (task=="A"){ 
     var taskapi=new TaskApi();
     taskapi.taskinfo({id:this.Base.options.id}, (taskinfo) => {
         this.Base.setMyData({
           taskinfo
         })
       })
      wx.navigateTo({
        url: '/pages/taskdetails/taskdetails',
      })
    }
 

  }
  onMyShow() {
    var that = this;
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
Page(body)