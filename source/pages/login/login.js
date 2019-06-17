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
    this.Base.setMyData({
      name: "",
      mobile: ""
    });
  }
  onMyShow() {
    var that = this;
  }

  nameChange(e) {
    this.Base.setMyData({
      nameChange: e.detail.value
    });
  }

  mobileChange(e) {
    this.Base.setMyData({
      mobileChange: e.detail.value
    });
  }
  // getPhone(e) {
  //   console.log(e)
  //   this.Base.setMyData({
  //     mobile: e.detail.mobile
  //   });
  // }

  phonenoCallback(phoneno, e) {
    console.log(phoneno);
    this.Base.setMyData({
      mobile: phoneno
    });
  }

  confirm(e) {
    var that = this;
    console.log(e);
    var data = e.detail.value;
    var name = this.Base.getMyData().nameChange;
    var mobile = this.Base.getMyData().mobile || this.Base.getMyData().mobileChange;
    console.log(data);
    var id = that.Base.getMyData().id;
    if (!id) {
      id = that.Base.getMyData().id;
    }
    if (name == "") {
      this.Base.info("请输入用户名");
      return;
    }
    if (mobile == "") {
      this.Base.info("请输入手机号");
      return;
    }

    var api = new MemberApi();
    api.register({
      mobile,
      name
    }, (ret) => {
      console.log(ret)
      if (ret.code == 0) {
        AppBase.dd = ret.result;
        wx.setStorage({
          key: "userinfo",
          data: ret.result
        })
        wx.reLaunch({
          url: '/pages/index/index',
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
body.confirm = content.confirm;
body.phonenoCallback = content.phonenoCallback;
body.nameChange = content.nameChange;
body.mobileChange = content.mobileChange;
Page(body)