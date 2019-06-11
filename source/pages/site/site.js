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
    var id = this.Base.getMyData().memberinfo.id;
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
    this.Base.uploadImage1("selection", (ret) => {
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
    this.Base.uploadImage1("selection", (ret) => {
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
    
    if (data.date == undefined) {
      this.Base.info("请录入选址完成的时间");
      return;
    }
    if (data.name == undefined) {
      this.Base.info("请输入物业姓名");
      return;
    }
    // data.phone[0] != "1"
    if (data.phone == null || data.phone.length != 11) {
      this.Base.info("请正确输入物业号码");
      return;
    }

    if (this.Base.getMyData().images1.length == 0) {
      this.Base.info("请至少上传一张管道图片");
      return;
    }
    if (data.mianji == null) {
      this.Base.info("请输入机房面积");
      return;
    }
    if (this.Base.getMyData().images2.length == 0) {
      this.Base.info("请至少上传一张机房面积图片");
      return;
    }

    var images1 = that.Base.getMyData().images1;
    var xuanzhiphoto_img1 = images1[0];
    var xuanzhiphoto_img2 = images1[1];
    var xuanzhiphoto_img3 = images1[2];
    var xuanzhiphoto_img4 = images1[3];
    var xuanzhiphoto_img5 = images1[4];
    var xuanzhiphoto_img6 = images1[5];
    var xuanzhiphoto_img7 = images1[6];
    var xuanzhiphoto_img8 = images1[7];
    var xuanzhiphoto_img9 = images1[8];

    var images2 = that.Base.getMyData().images2;
    var mianjiphoto_img1 = images2[0];
    var mianjiphoto_img2 = images2[1];
    var mianjiphoto_img3 = images2[2];
    var mianjiphoto_img4 = images2[3];
    var mianjiphoto_img5 = images2[4];
    var mianjiphoto_img6 = images2[5];
    var mianjiphoto_img7 = images2[6];
    var mianjiphoto_img8 = images2[7];
    var mianjiphoto_img9 = images2[8];
    //console.log(that.Base.getMyData().id)
    var abc = this.Base.getMyData().taskinfo;
    var data = {
      primary_id: id,
      number: abc.number,
      supervisor: abc.supervisor,
      name: abc.name,
      time: abc.time,
      taskname: abc.taskname,
      status: 'C',
      location_time: this.Base.getMyData().date,
      property_name: this.Base.getMyData().name,
      property_phone: this.Base.getMyData().phone,
      guandao: this.Base.getMyData().guandao,
      mianji: this.Base.getMyData().mianji,
      xuanzhiphoto_img1: xuanzhiphoto_img1,
      xuanzhiphoto_img2: xuanzhiphoto_img2,
      xuanzhiphoto_img3: xuanzhiphoto_img3,
      xuanzhiphoto_img4: xuanzhiphoto_img4,
      xuanzhiphoto_img5: xuanzhiphoto_img5,
      xuanzhiphoto_img6: xuanzhiphoto_img6,
      xuanzhiphoto_img7: xuanzhiphoto_img7,
      xuanzhiphoto_img8: xuanzhiphoto_img8,
      xuanzhiphoto_img9: xuanzhiphoto_img9,
      mianjiphoto_img1: mianjiphoto_img1,
      mianjiphoto_img2: mianjiphoto_img2,
      mianjiphoto_img3: mianjiphoto_img3,
      mianjiphoto_img4: mianjiphoto_img4,
      mianjiphoto_img5: mianjiphoto_img5,
      mianjiphoto_img6: mianjiphoto_img6,
      mianjiphoto_img7: mianjiphoto_img7,
      mianjiphoto_img8: mianjiphoto_img8,
      mianjiphoto_img9: mianjiphoto_img9,
    }
    console.log(data);
  
    statusapi.finish({
      id: id,
      wc: "A"
    }, (finish) => {
      console.log(finish)
    })


    var photoapi = new PhotoApi();
    photoapi.xuanzhiphoto(data, (res) => {
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


    return;



    var req = {
      // route: JSON.stringify(data.route),
      date: data.date,
      name: data.name,
      phone: data.phone,
      guandao: data.guandao,
      mianji: data.mianji
    };
  }

  nameChange(e) {
    this.Base.setMyData({
      name: e.detail.value
    });
  }
  phoneChange(e) {
    this.Base.setMyData({
      phone: e.detail.value
    });
  }
  mianjiChange(e) {
    this.Base.setMyData({
      mianji: e.detail.value
    });
  }
  guandaoChange(e) {
    this.Base.setMyData({
      guandao: e.detail.value
    });
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
body.nameChange = content.nameChange;
body.phoneChange = content.phoneChange;
body.guandaoChange = content.guandaoChange;
body.mianjiChange = content.mianjiChange;
Page(body)