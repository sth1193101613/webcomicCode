
import jsonp from "../common/js/jsonp.js"
import {commonParams,options} from "../common/js/config"

export  function rightTab() {
  const url="https://proxy.comicool.cn/ranklist4web";//右侧全部数据
  const data=Object.assign({},commonParams,{
    device_id:"a061fe306e472f285fa6968c66a4e8d3",
  })
  return jsonp(url,data,options);
}

