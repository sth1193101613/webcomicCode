
import jsonp from "../common/js/jsonp.js"
import {commonParams,options} from "../common/js/config"

export  function comicContList(id,cid) {
  const url="https://proxy.comicool.cn/epinfo4web";//首页全部数据
  const data=Object.assign({},commonParams,{
    ep_id:id,
    comic_id:cid,
    device_id:"a061fe306e472f285fa6968c66a4e8d3",
  })
  return jsonp(url,data,options);
}

