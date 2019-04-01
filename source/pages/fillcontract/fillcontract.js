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
    taskapi.hetongtask({
      id: this.options.id
    }, (hetongtask) => {
      this.Base.setMyData({
        hetongtask
      })
    })
  }

  inputChange1(e) {
    console.log(e);
    this.Base.setMyData({
      remark1: e.detail.value
    });
  }
  inputChange2(e) {
    console.log(e);
    this.Base.setMyData({
      remark2: e.detail.value
    });
  }
  inputChange3(e) {
    console.log(e);
    this.Base.setMyData({
      remark3: e.detail.value
    });
  }
  inputChange4(e) {
    console.log(e);
    this.Base.setMyData({
      remark4: e.detail.value
    });
  }
  
  changeDate1(e) {
    console.log(e);
    this.Base.setMyData({
      date1: e.detail.value
    });
  }

  changeDate2(e) {
    console.log(e);
    this.Base.setMyData({
      date2: e.detail.value
    });
  }

  changeDate3(e) {
    console.log(e);
    this.Base.setMyData({
      date3: e.detail.value
    });
  }

  changeDate4(e) {
    console.log(e);
    this.Base.setMyData({
      date4: e.detail.value
    });
  }
  submit1(e) {
    var that = this;
    var data = this.Base.getMyData();
    var id = that.Base.getMyData().id;
    if (!id) {
      id = that.Base.getMyData().id;
    }
    if (data.date1 == undefined) {
      this.Base.info("请录入合同资料提交的时间");
      return;
    }
    var a = this.Base.getMyData().hetongtask;
    var data = {
      primary_id: id,
      number: a.number,
      supervisor: a.supervisor,
      name: a.name,
      time: a.time,
      taskname: a.taskname,
      status: 'C',
      remark1: this.Base.getMyData().remark1
    }
    var timeapi = new TimeApi();
    timeapi.hetongtime(data, (res) => {
      console.log(res)
      })
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 1000 //持续的时间
    })
  }

  submit2(e) {
    var that = this;
    var data = this.Base.getMyData();
    var id = that.Base.getMyData().id;
    if (!id) {
      id = that.Base.getMyData().id;
    }
    if (data.date2 == undefined) {
      this.Base.info("请录入合同资料审核完成时间");
      return;
    }
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 1000 //持续的时间
    })
  }

  submit3(e) {
    var that = this;
    var data = this.Base.getMyData();
    var id = that.Base.getMyData().id;
    if (!id) {
      id = that.Base.getMyData().id;
    }
    if (data.date3 == undefined) {
      this.Base.info("请录入合同双签时间");
      return;
    }
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 1000 //持续的时间
    })
  }

  submit4(e) {
    var that = this;
    var data = this.Base.getMyData();
    var id = that.Base.getMyData().id;
    if (!id) {
      id = that.Base.getMyData().id;
    }
    if (data.date4 == undefined) {
      this.Base.info("请录入初次租金电费申请时间");
      return;
    }
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 1000 //持续的时间
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
  
    statusapi.finish({
      id: id,
      wc: "B"
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
      date1: data.date1,
      date2: data.date2,
      date3: data.date3,
      date4: data.date4
    };
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcompleted = content.bindcompleted;
body.bindwaitcompleted = content.bindwaitcompleted;
body.bindcontact = content.bindcontact;
body.confirm = content.confirm;
body.changeDate1 = content.changeDate1;
body.changeDate2 = content.changeDate2;
body.changeDate3 = content.changeDate3;
body.changeDate4 = content.changeDate4;
body.submit1 = content.submit1;
body.submit2 = content.submit2;
body.submit3 = content.submit3;
body.submit4 = content.submit4;
body.inputChange1 = content.inputChange1;
body.inputChange2 = content.inputChange2;
body.inputChange3 = content.inputChange3;
body.inputChange4 = content.inputChange4;
Page(body)