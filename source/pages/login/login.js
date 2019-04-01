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
import {
  MemberApi
} from "../../apis/member.api.js";

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

  login(e) {
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

    var mobile = data.mobile;
    var name = data.name;
    var openid = AppBase.UserInfo.openid;
    var session_key = AppBase.UserInfo.session_key;
    var api = new MemberApi();

    api.register({
      mobile,
      name,
      openid,
      session_key
    }, (ret) => {
      console.log(ret)
      if (ret.code == 0) {
        api.info({}, (res) => {
          if (res.supervisor == 1 && res.name == name) {
            wx.reLaunch({
              url: '/pages/index/index',
            })
          } else {
            this.Base.info("请联系管理员添加登录权限");
          }
        })

      } else {
        this.Base.info("用户信息不正确");
      }
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.getPhone = content.getPhone;
body.login = content.login;
body.phonenoCallback = content.phonenoCallback;
body.getPhoneNumber = content.getPhoneNumber;
Page(body)