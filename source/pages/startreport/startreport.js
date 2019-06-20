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
  PhotoApi
} from "../../apis/photo.api.js";
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
    this.Base.setMyData({
      id: this.options.id,
      images1: [],
      images2: []
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
    taskapi.startreport({
      id: this.options.id
    }, (startreport) => {
      this.Base.setMyData({
        startreport
      })
    })
  }
  uploadimg1() {
    var that = this;
    this.Base.uploadImage1("start", (ret) => {
      console.log(ret)
      var images1 = that.Base.getMyData().images1;
      images1.push(ret);
      that.Base.setMyData({
        images1
      });
    },undefined,6);
  }


  shangcphoto1(e) {
    var that = this;
    var seq = e.currentTarget.id;
    var images1 = that.Base.getMyData().images1;
    var imgs = [];
    for (var i = 0; i < images1.length; i++) {
      if (seq != i) {
        imgs.push(images1[i]);
      }
    }
    that.Base.setMyData({
      images1: imgs
    });
  }

  uploadimg2() {
    var that = this;
    this.Base.uploadImage1("start", (ret) => {
      console.log(ret)
      var images2 = that.Base.getMyData().images2;
      images2.push(ret);
      that.Base.setMyData({
        images2
      });
    });
  }
  shangcphoto2(e) {
    var that = this;
    var seq = e.currentTarget.id;
    var images2 = that.Base.getMyData().images2;
    var imgs = [];
    for (var i = 0; i < images2.length; i++) {
      if (seq != i) {
        imgs.push(images2[i]);
      }
    }
    that.Base.setMyData({
      images2: imgs
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
    // if (this.Base.getMyData().images.length == 0) {
    //   this.Base.info("请至少上传一张验收签字表图片");
    //   return;
    // }
    // if (data.money == undefined) {
    //   this.Base.info("请输入站点金额");
    //   return;
    // }


    var images1 = that.Base.getMyData().images1;
    var startphoto_img1 = images1[0];
    var startphoto_img2 = images1[1];
    var startphoto_img3 = images1[2];
    var startphoto_img4 = images1[3];
    var startphoto_img5 = images1[4];
    var startphoto_img6 = images1[5];

    var images2 = that.Base.getMyData().images2;
    var problemphoto_img1 = images2[0];
    var problemphoto_img2 = images2[1];
    var problemphoto_img3 = images2[2];
    var problemphoto_img4 = images2[3];
    var problemphoto_img5 = images2[4];
    var problemphoto_img6 = images2[5];
    console.log(that.Base.getMyData().id)


    var abc = this.Base.getMyData().startreport;
    var data = {
      primary_id: id,
      number: abc.number,
      supervisor: abc.supervisor,
      taskdetails:abc.taskdetails,
      name: abc.name,
      time: abc.time,
      taskname: abc.taskname,
      reportamount: abc.reportamount,
      status: 'C',
      startphoto_img1: startphoto_img1,
      startphoto_img2: startphoto_img2,
      startphoto_img3: startphoto_img3,
      startphoto_img4: startphoto_img4,
      startphoto_img5: startphoto_img5,
      startphoto_img6: startphoto_img6,
      problemphoto_img1: problemphoto_img1,
      problemphoto_img2: problemphoto_img2,
      problemphoto_img3: problemphoto_img3,
      problemphoto_img4: problemphoto_img4,
      problemphoto_img5: problemphoto_img5,
      problemphoto_img6: problemphoto_img6,
    }

    statusapi.finish({
      id: id,
      wc: "D"
    }, (finish) => {
      console.log(finish)
    })

    var photoapi = new PhotoApi();
    photoapi.startphoto(data, (res) => {
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
    var req = {
      // route: JSON.stringify(data.route),
      date: data.date,
      name: data.name,
      phone: data.phone,
      mianji: data.mianji
    };
  }

  
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '开工报告',
    })
  }

  copy(e){
    var that = this;
    var data = this.Base.getMyData().startreport.taskdetails;
    // console.log(data);
    // return;
    wx.getClipboardData({
      data:data,
      success(res){
        console.log(res);
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
body.uploadimg1 = content.uploadimg1;
body.shangcphoto1 = content.shangcphoto1;
body.uploadimg2 = content.uploadimg2;
body.shangcphoto2 = content.shangcphoto2;
body.confirm = content.confirm;
body.changeMoney = content.changeMoney;
body.copy = content.copy;
Page(body)