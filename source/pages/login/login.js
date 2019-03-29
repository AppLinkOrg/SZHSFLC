// pages/login/login.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
  }

  getPhone(e) {
    console.log(e)
    this.Base.setMyData({
      mobile: e.detail.mobile
    });
  }

  phonenoCallback(phoneno, e) {
    console.log(phoneno);
    this.Base.setMyData({
      phone: phone
    });
  }

  confirm(e) {
    var that = this;
    var data = e.detail.value;
    if (data.name == "") {
      this.Base.info("请输入您的姓名");
      return;
    }
    if (data.phone == "") {
      this.Base.info("请点击绑定手机号");
      return;
    }
  }
  login() {
    wx.switchTab({
      url: '../index/index',
    })
  }

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.getPhone = content.getPhone;
body.phonenoCallback = content.phonenoCallback;
body.login = content.login;
body.getPhoneNumber = content.getPhoneNumber;
Page(body)