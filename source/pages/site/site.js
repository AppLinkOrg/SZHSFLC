// pages/site/site.js
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
  ExampleApi
} from '../../apis/example.api';
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
      images1: [],
      images2: []
    });
    this.setData({
      id: options.id
    })
    console.log(this.data.id)
  }
  onMyShow() {
    // var that = this;
    var taskapi = new TaskApi();
    var exampleApi = new ExampleApi();
    taskapi.newtasklist({}, (newtasklist) => {
      this.Base.setMyData({
        newtasklist
      })
    })
    taskapi.taskinfo({
      id: this.options.id
    }, (taskinfo) => {
      this.Base.setMyData({
        taskinfo
      })
    })
  }
  changeDate(e) {
    console.log(e);
    this.Base.setMyData({
      date: e.detail.value
    });
  }
  uploadimg1() {
    var that = this;
    this.Base.uploadImage("photo", (ret) => {
      console.log(ret)
      var images1 = that.Base.getMyData().images1;
      images1.push(ret);
      that.Base.setMyData({
        images1
      });
    });
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
    this.Base.uploadImage("photo", (ret) => {
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

  // confirm(e) {
  //   var that = this;
  //   var id = that.Base.getMyData().id;
  //   if (!id) {
  //     id = that.Base.getMyData().id;
  //   }
  //   // if (this.Base.getMyData().images.length == 0) {
  //   //   this.Base.info("请至少上传一张验收签字表图片");
  //   //   return;
  //   // }

  //   var images1 = that.Base.getMyData().images1;
  //   var xuanzhiphoto_img1 = images1[0];
  //   var xuanzhiphoto_img2 = images1[1];
  //   var xuanzhiphoto_img3 = images1[2];
  //   var xuanzhiphoto_img4 = images1[3];
  //   var xuanzhiphoto_img5 = images1[4];
  //   var xuanzhiphoto_img6 = images1[5];

  //   var images2 = that.Base.getMyData().images2;
  //   var mianjiphoto_img1 = images2[0];
  //   var mianjiphoto_img2 = images2[1];
  //   var mianjiphoto_img3 = images2[2];
  //   var mianjiphoto_img4 = images2[3];
  //   var mianjiphoto_img5 = images2[4];
  //   var mianjiphoto_img6 = images2[5];
  //   console.log(that.Base.getMyData().id)

  //   var data = {
  //     id: id,
  //     xuanzhiphoto_img1: xuanzhiphoto_img1,
  //     xuanzhiphoto_img2: xuanzhiphoto_img2,
  //     xuanzhiphoto_img3: xuanzhiphoto_img3,
  //     xuanzhiphoto_img4: xuanzhiphoto_img4,
  //     xuanzhiphoto_img5: xuanzhiphoto_img5,
  //     xuanzhiphoto_img6: xuanzhiphoto_img6,
  //     mianjiphoto_img1: mianjiphoto_img1,
  //     mianjiphoto_img2: mianjiphoto_img2,
  //     mianjiphoto_img3: mianjiphoto_img3,
  //     mianjiphoto_img4: mianjiphoto_img4,
  //     mianjiphoto_img5: mianjiphoto_img5,
  //     mianjiphoto_img6: mianjiphoto_img6,
  //   }

  //   var photoapi = new PhotoApi();
  //   photoapi.uploadimg(data, (res) => {
  //     console.log(res)
  //     wx.redirectTo({
  //       url: '/pages/finish/finish',
  //     })
  //     wx.showToast({
  //       title: '上传成功',
  //       icon: 'success',
  //       duration: 1000
  //     })
  //   })
  // }

  confirm1(e) {
    var that = this;
    var data = this.Base.getMyData();
    var id = that.Base.getMyData().id;
    if (!id) {
      id = that.Base.getMyData().id;
    }
    // if (this.Base.getMyData().images.length == 0) {
    //   this.Base.info("请至少上传一张验收签字表图片");
    //   return;
    // }
    if (data.date == undefined) {
      this.Base.info("请录入选址完成的时间");
      return;
    }
    if (data.name.length == 0) {
      this.Base.info("请输入物业姓名");
      return;
    }
    if (data.phone == null || data.phone.length != 11 || data.phone[0] != "1") {
      this.Base.info("请正确输入物业号码");
      return;
    }
    if (data.mianji == null) {
      this.Base.info("请输入机房面积");
      return;
    }

    var images1 = that.Base.getMyData().images1;
    var xuanzhiphoto_img1 = images1[0];
    var xuanzhiphoto_img2 = images1[1];
    var xuanzhiphoto_img3 = images1[2];
    var xuanzhiphoto_img4 = images1[3];
    var xuanzhiphoto_img5 = images1[4];
    var xuanzhiphoto_img6 = images1[5];

    var images2 = that.Base.getMyData().images2;
    var mianjiphoto_img1 = images2[0];
    var mianjiphoto_img2 = images2[1];
    var mianjiphoto_img3 = images2[2];
    var mianjiphoto_img4 = images2[3];
    var mianjiphoto_img5 = images2[4];
    var mianjiphoto_img6 = images2[5];
    console.log(that.Base.getMyData().id)

    var data = {
      id: id,
      xuanzhiphoto_img1: xuanzhiphoto_img1,
      xuanzhiphoto_img2: xuanzhiphoto_img2,
      xuanzhiphoto_img3: xuanzhiphoto_img3,
      xuanzhiphoto_img4: xuanzhiphoto_img4,
      xuanzhiphoto_img5: xuanzhiphoto_img5,
      xuanzhiphoto_img6: xuanzhiphoto_img6,
      mianjiphoto_img1: mianjiphoto_img1,
      mianjiphoto_img2: mianjiphoto_img2,
      mianjiphoto_img3: mianjiphoto_img3,
      mianjiphoto_img4: mianjiphoto_img4,
      mianjiphoto_img5: mianjiphoto_img5,
      mianjiphoto_img6: mianjiphoto_img6,
    }

    var photoapi = new PhotoApi();
    photoapi.uploadimg(data, (res) => {
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

  nameChange(e) {
    this.Base.setMyData({ name: e.detail.value });
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.uploadimg1 = content.uploadimg1;
body.uploadimg2 = content.uploadimg2;
body.shangcphoto1 = content.shangcphoto1;
body.shangcphoto2 = content.shangcphoto2;
body.changeDate = content.changeDate;
body.confirm = content.confirm;
body.confirm1 = content.confirm1;
body.nameChange = content.nameChange;
Page(body)