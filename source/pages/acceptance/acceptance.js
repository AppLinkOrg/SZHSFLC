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
      title: '验收任务',
    })
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    var now = new Date();
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
    taskapi.yanshoutask({
      id: this.options.id
    }, (yanshoutask) => {
      this.Base.setMyData({
        yanshoutask
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
  uploadimg() {
    var that = this;
    this.Base.uploadImage("acceptance", (ret) => {
      console.log(ret)
      var images = that.Base.getMyData().images;
      images.push(ret);
      that.Base.setMyData({
        images
      });
    });
  }
  shangcphoto(e) {
    var that = this;
    var seq = e.currentTarget.id;
    var images = that.Base.getMyData().images;
    var imgs = [];
    for (var i = 0; i < images.length; i++) {
      if (seq != i) {
        imgs.push(images[i]);
      }
    }
    that.Base.setMyData({
      images: imgs
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
    // if (data.date1 == undefined || data.date1 == "") {
    //   this.Base.info("请录入站点完成单优的时间");
    //   return;
    // }
    if (data.date2 == undefined || data.date2 == "") {
      this.Base.info("请录入站点完成验收的时间");
      return;
    }
    if (this.Base.getMyData().images.length == 0) {
      this.Base.info("请至少上传一张验收签字表图片");
      return;
    }

    var images = that.Base.getMyData().images;
    var signphoto1 = images[0];
    var signphoto2 = images[1];
    var signphoto3 = images[2];
    var signphoto4 = images[3];
    var signphoto5 = images[4];
    var signphoto6 = images[5];


    var abc = this.Base.getMyData().yanshoutask;
    var data = {
      primary_id: id,
      number: abc.number,
      supervisor: abc.supervisor,
      name: abc.name,
      time: abc.time,
      status: 'C',
      sheettime: this.Base.getMyData().date1,
      singlefinishtime: this.Base.getMyData().date2,
      signphoto1: signphoto1,
      signphoto2: signphoto2,
      signphoto3: signphoto3,
      signphoto4: signphoto4,
      signphoto5: signphoto5,
      signphoto6: signphoto6,
    }
    statusapi.finish({
      id: id,
      wc: "I"
    }, (finish) => {
      console.log(finish)
    })

    var photoapi = new PhotoApi();
    photoapi.yanshouphone(data, (res) => {
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

  copy(e) {
    var that = this;
    var data = this.Base.getMyData().yanshoutask.taskdetails;
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
body.uploadimg = content.uploadimg;
body.shangcphoto = content.shangcphoto;
body.confirm = content.confirm;
body.changeDate1 = content.changeDate1;
body.changeDate2 = content.changeDate2;
body.copy = content.copy;
Page(body)