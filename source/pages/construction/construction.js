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

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    this.Base.setMyData({
      id: this.options.id,
      images: []
    });
    this.setData({
      user_id: options.user_id
    })
    console.log(this.data.user_id)

    var taskapi = new TaskApi(); 
    taskapi.shigongnumber({
      shigong: this.Base.options.id
    }, (shigongnumber) => {
      this.Base.setMyData({
        shigongnumber: shigongnumber
      })
    })
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
    taskapi.shigongtask({
      id: this.Base.options.id
    }, (shigongtask) => {
      this.Base.setMyData({
        shigongtask
      })
    })

  }

  uploadimg() {
    var that = this;
    this.Base.uploadImage1("construction", (ret) => {
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
    var type = that.Base.getMyData().type;
    if (!id) {
      id = that.Base.getMyData().id;
    }
    
    // console.log(abc+"三生三世")
   

    
    // console.log(abc);
    // return;
    if (this.Base.getMyData().images.length == 0) {
      this.Base.info("请至少上传一张现场图片");
      return;
    }
    var abc = this.Base.getMyData().shigongnumber;
    
    for (var i = 0; i < abc.length; i++) {

       var sss = {
        primary_id: abc[i].id,
        name: abc[i].name,
        // shigongdui: abc[i].shigongdui,
        number: abc[i].number,
        numbers: abc[i].numbers,
        shigong: abc[i].shigong,
        status: 'C'
      }
    
      if (abc[i].numbers == "" || abc[i].numbers == undefined || abc[i].numbers == "0") {
        this.Base.info("请输入实际使用的数量");
        return;
      }
      var photoapi = new PhotoApi();

      photoapi.shigonginfo(sss, (res) => {
        console.log(res);
      })

      var images = that.Base.getMyData().images;
      var technologyphoto1 = images[0];
      var technologyphoto2 = images[1];
      var technologyphoto3 = images[2];
      var technologyphoto4 = images[3];
      var technologyphoto5 = images[4];
      var technologyphoto6 = images[5];
     // console.log(that.Base.getMyData().id)

      var ab = this.Base.getMyData().shigongtask;
      console.log(ab);
      var aaa = {
        primary_id: id,
        number: ab.number,
        shigongdui: ab.shigongdui,
        supervisor: ab.supervisor,
        name: ab.name,
        time: ab.time,
        status: 'C',
        technologyphoto1: technologyphoto1,
        technologyphoto2: technologyphoto2,
        technologyphoto3: technologyphoto3,
        technologyphoto4: technologyphoto4,
        technologyphoto5: technologyphoto5,
        technologyphoto6: technologyphoto6,
      }
      
      // return

    }

    // this.Base.setMyData({ sss})
    // console.log("啊啊啊");
    // console.log(this.Base.getMyData().sss);
    // console.log("啊啊啊");

  
    statusapi.finish({
      id: id,
      wc: "G"
    }, (finish) => {
      console.log(finish)
    })

     
     //return;

    //var da = this.Base.getMyData().abc;

    // console.log("搜索");
    // console.log(abc);
    // console.log("手术室");
    // console.log(sss);
    // console.log("搜索");

    //  return;
    

    photoapi.shigongphoto(aaa, (res) => {
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
  numbersChange(e) {
    var asd = this.Base.getMyData().shigongnumber;
    asd[e.target.id].numbers = e.detail.value;
    this.Base.setMyData({
      shigongnumber: asd
    });
  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '施工任务',
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
body.numbersChange = content.numbersChange;
Page(body)