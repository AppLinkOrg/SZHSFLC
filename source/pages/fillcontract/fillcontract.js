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


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcompleted = content.bindcompleted;
body.bindwaitcompleted = content.bindwaitcompleted;
body.bindcontact = content.bindcontact;
body.changeDate1 = content.changeDate1;
body.changeDate2 = content.changeDate2;
body.changeDate3 = content.changeDate3;
body.changeDate4 = content.changeDate4;
Page(body)