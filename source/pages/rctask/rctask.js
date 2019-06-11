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
  PhotoApi
} from "../../apis/photo.api.js";
import {
  StatusApi
} from "../../apis/status.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '日常任务',
    })
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    var now = new Date();
    var tomorrow = now.getTime() + 24 * 60 * 60 * 1000;
    var aftermonth = tomorrow + 30 * 24 * 60 * 60 * 1000;
    var startdate = this.Base.util.FormatDate(new Date(tomorrow));
    var enddate = this.Base.util.FormatDate(new Date(aftermonth));
    this.Base.setMyData({
      mobile: "",
      realname: "",
      remark: "",
      startdate: startdate,
      enddate: enddate
    });
    console.log('tomorrow:' + enddate)
    this.Base.setMyData({
      id: this.options.id,
      images: []
    });
    this.setData({
      user_id: options.user_id
    })

    console.log(this.data.user_id)
  }

  onMyShow() {
    // var that = this;
    var taskapi = new TaskApi();
    // var exampleApi = new ExampleApi();
    var id = this.Base.getMyData().memberinfo.id;
    taskapi.newtasklist({
      supervisor: AppBase.dd.id
    }, (newtasklist) => {
      this.Base.setMyData({
        newtasklist
      })
    })
    taskapi.rctask({
      id: this.options.id
    }, (rctask) => {
      this.Base.setMyData({
        rctask: rctask
      })
    })
  }


  // changeDate(e) {
  //   console.log(e);
  //   this.Base.setMyData({
  //     date: e.detail.value
  //   });
  // }
  inputChange1(e) {
    console.log(e);
    this.Base.setMyData({
      remark: e.detail.value
    });
  }

  confirm(e) {
    var that = this;
    var data = this.Base.getMyData();
    var taskapi = new TaskApi();
    var statusapi = new StatusApi();
    var id = that.Base.getMyData().id;
    if (!id) {
      id = that.Base.getMyData().id;
    }
    if (data.remark == undefined || data.remark == "") {
      this.Base.info("请填写备注信息");
      return;
    }

    var abc = this.Base.getMyData().rctask;
    var data = {
      primary_id: id,
      number: abc.number,
      taskinfo:abc.taskinfo,
      supervisor: abc.supervisor,
      name: abc.name,
      time: abc.time,
      status: 'C',
      // sheettime: this.Base.getMyData().date,
      remark: this.Base.getMyData().remark
    }
    statusapi.finish({
      id: id,
      wc: "K"
    }, (finish) => {
      console.log(finish)
    })

    var photoapi = new PhotoApi();
    photoapi.rctaskinfo(data, (res) => {
      console.log(res)
      wx.redirectTo({
        url: '/pages/finish/finish',
      })
    })
    wx.showToast({
      title: '完成',
      icon: 'success',
      duration: 1000
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.confirm = content.confirm;
body.inputChange1 = content.inputChange1;
Page(body)