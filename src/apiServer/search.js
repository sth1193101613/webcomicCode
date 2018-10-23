import jsonp from "../common/js/jsonp.js"
import {commonParams,options} from "../common/js/config"

export  function searchs(value) {
  const url="https://proxy.comicool.cn/searchinfo4web";
  const data=Object.assign({},commonParams,{
    keyword:value,
    t:new Date().getDate(),
    device_id:"a061fe306e472f285fa6968c66a4e8d3",
  })
  return jsonp(url,data,options);
}

