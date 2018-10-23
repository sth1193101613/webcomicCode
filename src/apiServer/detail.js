import jsonp from "../common/js/jsonp.js"
import {commonParams,options} from "../common/js/config"

export  function detailcont(id) {
  const url="https://proxy.comicool.cn/comicdetail4web";//详情数据
  const data=Object.assign({},commonParams,{
    comic_id:id,
    device_id:"a063722458e9523d94b09a99c00760a8",

  })
  return jsonp(url,data,options);
}
