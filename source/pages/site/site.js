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

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    this.Base.setMyData({
      ctt: 1
    });

  }
  onMyShow() {
    var that = this;
  }

  bindwaitcompleted(e) {
    this.Base.setMyData({
      ctt: 2
    })
    this.onMyShow();
  }
  bindcontact(e) {
    this.Base.setMyData({
      ctt: 1
    })
    this.onMyShow();
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcompleted = content.bindcompleted;
body.bindwaitcompleted = content.bindwaitcompleted;
body.bindcontact = content.bindcontact;
Page(body)