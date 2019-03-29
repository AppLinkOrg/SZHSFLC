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

class Content extends AppBase {
  constructor() {
    super();
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
    taskapi.newtasklist({}, (newtasklist) => {
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
    // if (this.Base.getMyData().images.length == 0) {
    //   this.Base.info("请至少上传一张验收签字表图片");
    //   return;
    // }
    // if (data.date == undefined) {
    //   this.Base.info("请录入选址完成的时间");
    //   return;
    // }
    // if (data.name == undefined) {
    //   this.Base.info("请输入物业姓名");
    //   return;
    // }
    // if (data.phone == null || data.phone.length != 11 || data.phone[0] != "1") {
    //   this.Base.info("请正确输入物业号码");
    //   return;
    // }
    // if (data.mianji == null) {
    //   this.Base.info("请输入机房面积");
    //   return;
    // }

    statusapi.finish({
      id: id,
      wc: "C"
    }, (finish) => {
      console.log(finish)
    })


    wx.redirectTo({
      url: '/pages/finish/finish',
    })
    wx.showToast({
      title: '完成',
      icon: 'success',
      duration: 1000
    })
    var api = new TaskApi();
    var req = {
      // route: JSON.stringify(data.route),
      date: data.date,
      name: data.name,
      phone: data.phone,
      mianji: data.mianji
    };
  }



  changeDate(e) {
    console.log(e);
    this.Base.setMyData({
      date: e.detail.value
    });
  }

  changeMoney(e){
    console.log(e);
    this.Base.setMyData({
      money: e.detail.value
    });
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.changeDate = content.changeDate;
body.changeMoney = content.changeMoney;
body.confirm = content.confirm;
Page(body)