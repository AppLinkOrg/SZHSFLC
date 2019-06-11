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
  TimeApi
} from "../../apis/time.api.js";
import {
  StatusApi
} from "../../apis/status.api.js";
import {
  PhotoApi
} from "../../apis/photo.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '方案设计',
    })
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    var now = new Date();
    this.Base.setMyData({
      id: this.options.id
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
    taskapi.fangansjtask({
      id: this.options.id
    }, (fangansjtask) => {
      this.Base.setMyData({
        fangansjtask
      })
    })
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
    if (data.money == undefined || data.money == "") {
      this.Base.info("请输入站点金额");
      return;
    }
    if (data.date == undefined || data.date == "") {
      this.Base.info("请录入方案设计完成的时间");
      return;
    }

    var abc = this.Base.getMyData().fangansjtask;
    var data = {
      primary_id: id,
      number: abc.number,
      supervisor: abc.supervisor,
      name: abc.name,
      taskdetails: abc.taskdetails,
      time: abc.time,
      status: 'C',
      site_amount: this.Base.getMyData().money,
      completiontime: this.Base.getMyData().date
    }

    statusapi.finish({
      id: id,
      wc: "C"
    }, (finish) => {
      console.log(finish)
    })

    var photoapi = new PhotoApi();
    photoapi.fangansj(data, (res) => {
      console.log(res)
      wx.redirectTo({
        url: '/pages/finish/finish',
      })
      wx.showToast({
        title: '完成',
        icon: 'success',
        duration: 1000
      })
    })

    var api = new TaskApi();

  }

  changeMoney(e) {
    console.log(e);
    this.Base.setMyData({
      money: e.detail.value
    });
  }



  changeDate(e) {
    console.log(e);
    this.Base.setMyData({
      date: e.detail.value
    });
  }

  copy(e) {
    var that = this;
    var data = this.Base.getMyData().fangansjtask.taskdetails;
    wx.setClipboardData({
      data: data,
      success(res) {
        console.log(res)
        // console.log("啦啦啦")
      }
    })
    wx.showToast({
      title: '复制成功',
      icon: 'success',
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.changeDate = content.changeDate;
body.changeMoney = content.changeMoney;
body.confirm = content.confirm;
body.copy = content.copy;
Page(body)