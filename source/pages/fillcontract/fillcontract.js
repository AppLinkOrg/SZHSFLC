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
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '合同资料任务',
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

    taskapi.newtasklist({}, (newtasklist) => {
      this.Base.setMyData({
        newtasklist
      })
    })
    taskapi.hetongtask({
      id: this.Base.options.id
    }, (hetongtask) => {
      this.Base.setMyData({
        hetongtask,
        date1: hetongtask.date1,
        date2: hetongtask.date2,
        date3: hetongtask.date3,
        date4: hetongtask.date4,
        remark1: hetongtask.remark1,
        remark2: hetongtask.remark2,
        remark3: hetongtask.remark3,
        remark4: hetongtask.remark4
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
    if (data.date1 == undefined || data.date1 == '') {
      this.Base.info("请录入合同资料提交的时间");
      return;
    }
    var a = this.Base.getMyData().hetongtask;
    var data = {
      primary_id: a.id,
      number: a.number,
      supervisor: a.supervisor,
      id: this.Base.getMyData().id,
      name: a.name,
      time: a.time,
      taskname: a.taskname,
      status: 'B',
      remark1: this.Base.getMyData().remark1,
      date1: this.Base.getMyData().date1

    }
    // console.log(data);
    // return

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
    if (data.date2 == undefined || data.date2 == '') {
      this.Base.info("请录入合同资料审核完成时间");
      return;
    }
    var a = this.Base.getMyData().hetongtask;
    var data = {
      primary_id: a.id,
      number: a.number,
      supervisor: a.supervisor,
      name: a.name,
      time: a.time,

      status: 'B',
      remark2: this.Base.getMyData().remark2,
      date2: this.Base.getMyData().date2
    }
    // console.log(data);
    // return
    var timeapi = new TimeApi();
    timeapi.hetongtime2(data, (res) => {
      console.log(res)
    })
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
    if (data.date3 == undefined || data.date3 == '') {
      this.Base.info("请录入合同双签时间");
      return;
    }
    var a = this.Base.getMyData().hetongtask;
    var data = {
      primary_id: a.id,
      number: a.number,
      supervisor: a.supervisor,
      name: a.name,
      time: a.time,

      status: 'B',
      remark3: this.Base.getMyData().remark3,
      date3: this.Base.getMyData().date3
    }
    // console.log(data);
    // return
    var timeapi = new TimeApi();
    timeapi.hetongtime3(data, (res) => {
      console.log(res)
    })
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
    if (data.date4 == undefined || data.date4 == '') {
      this.Base.info("请录入初次租金电费申请时间");
      return;
    }
    var a = this.Base.getMyData().hetongtask;
    var data = {
      primary_id: a.id,
      number: a.number,
      supervisor: a.supervisor,
      name: a.name,
      time: a.time,
      status: 'B',
      remark4: this.Base.getMyData().remark4,
      date4: this.Base.getMyData().date4
    }
    // console.log(data);
    // return
    var timeapi = new TimeApi();
    timeapi.hetongtime4(data, (res) => {
      console.log(res)
    })
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 1000 //持续的时间
    })
  }


  finish(e) {
    var that = this;
    var data = this.Base.getMyData();
    var taskapi = new TaskApi();
    var statusapi = new StatusApi();
    var id = that.Base.getMyData().id;
    var type = that.Base.getMyData().type;
    if (!id) {
      id = that.Base.getMyData().id;
    }
    if (data.date1 == '' || data.date2 == '' || data.date3 == '' || data.date4 == '') {
      this.Base.info("请录入所有的时间");
      return;
    }
    var a = this.Base.getMyData().hetongtask;
    var data = {
      primary_id: a.id,
      number: a.number,
      supervisor: a.supervisor,
      taskdetails: a.taskdetails,
      name: a.name,
      time: a.time,
      status: 'C',
      remark1: this.Base.getMyData().remark1,
      date1: this.Base.getMyData().date1,
      remark2: this.Base.getMyData().remark2,
      date2: this.Base.getMyData().date2,
      remark3: this.Base.getMyData().remark3,
      date3: this.Base.getMyData().date3,
      remark4: this.Base.getMyData().remark4,
      date4: this.Base.getMyData().date4
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
  }


  copy(e) {
    var that = this;
    var data = this.Base.getMyData().hetongtask.taskdetails;
    wx.setClipboardData({
      data: data,
      success(res) {
        console.log(res.data)
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
body.finish = content.finish;
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
body.copy = content.copy;
Page(body)