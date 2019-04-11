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
      if (data.money == undefined) {
        this.Base.info("请输入站点金额");
        return;
      }
      if (data.date == undefined) {
        this.Base.info("请录入方案设计完成的时间");
        return;
      }

      var abc = this.Base.getMyData().fangansjtask;
      var data = {
        primary_id: id,
        number: abc.number,
        supervisor: abc.supervisor,
        name: abc.name,
        time: abc.time,
        taskname: abc.taskname,
        status: 'C',
        completiontime: this.Base.getMyData().date,
        site_amount: this.Base.getMyData().money
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



      }
      var content = new Content();
      var body = content.generateBodyJson();
      body.onLoad = content.onLoad;
      body.onMyShow = content.onMyShow;
      body.changeDate = content.changeDate;
      body.changeMoney = content.changeMoney;
      body.confirm = content.confirm;
      Page(body)