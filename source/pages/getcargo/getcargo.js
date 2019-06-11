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
    taskapi.newtasklist({
      supervisor: AppBase.dd.id
    }, (newtasklist) => {
      this.Base.setMyData({
        newtasklist
      })
    })

    taskapi.linghuonumber({
      linghuo: this.Base.options.id
    }, (linghuonumber) => {
      this.Base.setMyData({
        linghuonumber: linghuonumber
      })
    })

    taskapi.linghuotask({
      id: this.Base.options.id
    }, (linghuotask) => {
      this.Base.setMyData({
        linghuotask
      })
    })
  }

  confirm(e) {
    var that = this;
    var data = this.Base.getMyData();
    var taskapi = new TaskApi();
    var statusapi = new StatusApi();
    var id = that.Base.getMyData().id;
    var type = that.Base.getMyData().type;
    if (!id) {
      id = that.Base.getMyData().id;
    }
    var abc = this.Base.getMyData().linghuonumber;
    for (var i = 0; i < abc.length; i++) {
      var data = {
        primary_id: abc[i].id,
        name: abc[i].name,
        taskdetails: abc[i].taskdetails,
        number: abc[i].number,
        numbers: abc[i].numbers,
        linghuo: abc[i].linghuo,
        status: 'C'
      }
      // console.log(abc[i].numbers);
      if (abc[i].numbers == '' || abc[i].numbers == undefined) {
        this.Base.info("请输入实际领货的数量");
        return;
      }

      console.log("电放费");
      console.log(data);
      console.log("电放费");
      // return;
      var photoapi = new PhotoApi();
      photoapi.linghuoinfo(data, (res) => {
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

    }



    statusapi.finish({
      id: id,
      wc: "E"
    }, (finish) => {
      console.log(finish)
    })


  }


  numbersChange(e) {
    var asd = this.Base.getMyData().linghuonumber;
    asd[e.target.id].numbers = e.detail.value;
    this.Base.setMyData({
      linghuonumber: asd
    });
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '领货任务',
    })
  }
  copy(e) {
    var that = this;
    var data = this.Base.getMyData().linghuotask.taskdetails;
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
body.confirm = content.confirm;
body.copy = content.copy;
body.numbersChange = content.numbersChange;
Page(body)