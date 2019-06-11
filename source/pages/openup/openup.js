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

  confirm(e) {
    var that = this;
    var data = this.Base.getMyData();
    var taskapi = new TaskApi();
    var statusapi = new StatusApi();
    var id = that.Base.getMyData().id;
    var type = that.Base.getMyData().type;
    if (!id) {
      id = that.Base.getMyData().id;
    }
    
    if (data.date == undefined || data.date == "") {
      this.Base.info("请录入站点开通的时间");
      return;
    }


    var abc = this.Base.getMyData().kaitongtask;
    var data = {
      primary_id: id,
      number: abc.number,
      supervisor: abc.supervisor,
      name: abc.name,
      time: abc.time,
      taskname: abc.taskname,
      status: 'C',
      opentimes: this.Base.getMyData().date
    }

    statusapi.finish({
      id: id,
      wc: "H"
    }, (finish) => {
      console.log(finish)
    })

    var timeapi = new TimeApi();
    timeapi.kaitongtime(data, (res) => {
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
    var api = new TaskApi();
  
  }

  changeDate(e) {
    console.log(e);
    this.Base.setMyData({
      date: e.detail.value
    });
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '开通任务',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.changeDate = content.changeDate;
body.confirm = content.confirm;
Page(body)