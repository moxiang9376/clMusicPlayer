import axios from "axios";

export default {
  // 获取音乐列表(搜索)
  getMusic: function(style, songName, page) {
    return new Promise(function(resolve, reject) {
      let musicList = [];
      if (style == 4) {
        //自己部署的服务器接口
        let url = "http://118.24.179.175:8888/search";
        axios({
          methods: "get",
          url: url,
          params: {
            keywords: songName,
            limit: 20,
            offset: page-1,
       
          }
        }).then(res => {
          console.log(res);
          musicList = changeMusicList(style, res);
          resolve(musicList);
        });
      } else {
        let musicStyleArr = ["netease", "tencent", "kugou", "kuwo"];
        let musicUrl =
          "https://v1.itooi.cn/" + musicStyleArr[style] + "/search";
        let params = {
          keyword: songName,
          type: "song",
          pageSize: 20,
          page: page
        };
        axios
          .get(
            musicUrl,
            {
              params
            },
            {
              headers: {
                "Content-type": "application/x-www-form-urlencoded"
              }
            }
          )
          .then(res => {
            musicList = changeMusicList(style, res);
            resolve(musicList);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      }
    });
  },
  // 获取歌单列表(搜索)
  getSongList: function(style, songId) {
    return new Promise(function(resolve, reject) {
      let musicStyleArr = ["netease", "tencent", "kugou", "kuwo"];
      let musicUrl =
        "https://v1.itooi.cn/" + musicStyleArr[style] + "/songList";
      let params = {
        id: songId
      };
      axios
        .get(musicUrl, {
          params
        })
        .then(res => {
          console.log(res);
          let songList = res.data.data.tracks;
          let musicListInfo = {
            songList: [],
            name: ""
          };
          musicListInfo.name = res.data.data.name;
          // 网易
          songList.forEach(item => {
            let listInfo = {
              pic: item.album.picUrl,
              singer: item.artists[0].name,
              name: item.name,
              url:
                "https://v1.itooi.cn/netease/url?id=" +
                item.id +
                "&quality=flac"
            };
            musicListInfo.songList.push(listInfo);
          });
          resolve(musicListInfo);
        });
    });
  },
  // 修改用户歌单列表
  changeMusicList: function(musicListArr) {
    return new Promise(function(resolve, reject) {
      let newMusicListArr = [];
      let a = musicListArr.split(",");
      console.log(a);
      a.forEach(element => {
        let b = element.split("-");
        console.log(b);
        newMusicListArr.push(b);
        console.log(newMusicListArr);
      });
      resolve(newMusicListArr);
    });
  },

  getSongUrl(url) {
    return new Promise((resolve, reject) => [
      axios.get(url).then(res => {
        console.log(res);
        resolve(res.data.data[0].url);
      })
    ]);
  },

  /* 随机函数 */
  randomNum(style, length) {
    if (style == true) {
      let num = Math.floor(Math.random() * (length + 1));
      return num;
    } else {
      return 1;
    }
  },

  async test() {
    const response = await new Promise(resolve => {
      setTimeout(() => {
        resolve("async await test");
      }, 5000);
    });
    console.log(response);
  }
};

// 修改音乐列表的数据(搜索)
function changeMusicList(style, data) {
  let musicList = [];
  let getMusicList = [];
  switch (style) {
    case 0: // 网易
      getMusicList = data.data.data.songs;
      getMusicList.forEach(item => {
        let listInfo = {
          url:
            "https://v1.itooi.cn/netease/url?id=" + item.id + "&quality=flac",
          pic: item.al.picUrl,
          name: item.name,
          singer: item.ar[0].name
        };
        musicList.push(listInfo);
      });
      break;
    case 1: // 企鹅
      getMusicList = data.data.data.list;
      getMusicList.forEach(item => {
        let listInfo = {
          url:
            "https://v1.itooi.cn/tencent/url?id=" +
            item.songmid +
            "&quality=128",
          name: item.songname,
          singer: item.singer[0].name,
          pic: "https://v1.itooi.cn/tencent/pic?id=" + item.songmid
        };

        musicList.push(listInfo);
      });
      break;

    case 2: // 酷狗
      getMusicList = data.data.data.info;
      getMusicList.forEach(item => {
        let listInfo = {
          url:
            "https://v1.itooi.cn/kugou/url?id=" + item.songmid + "&quality=128",
          singer: item.singername,
          name: item.songname
        };
        musicList.push(listInfo);
      });
      break;

    case 3: // 酷我
      getMusicList = data.data.data;
      getMusicList.forEach(item => {
        let listInfo = {
          url:
            "https://v1.itooi.cn/kuwo/url?id=" + item.ALBUMID + "&quality=128",
          singer: item.ARTIST,
          name: item.SONGNAME
        };
        // listInfo.pic = "https://v1.itooi.cn/kuwo/pic?id=" + item.ALBUMID
        musicList.push(listInfo);
      });
      break;

    case 4: // 自己部署的接口
      getMusicList = data.data.result.songs;
      getMusicList.forEach(item => {
        let singerNames = checkSingerNum(item.artists);
        singerNames = singerNames.substr(0, singerNames.length - 1);
        let listInfo = {
          singer: singerNames,
          name: item.name,
          pic: item.artists[0].img1v1Url,
          id: item.id
        };
        // listInfo.pic = "https://v1.itooi.cn/kuwo/pic?id=" + item.ALBUMID
        musicList.push(listInfo);
      });
      break;
  }
  return musicList;

  function checkSingerNum(item) {
    let singerName = "";
    item.forEach(item => {
      singerName += item.name + "/";
    });
    return singerName;
  }
}

// 修改歌单列表的数据
function changeSongList(style, data) {}
