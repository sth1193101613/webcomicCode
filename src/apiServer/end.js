import jsonp from "../common/js/jsonp.js"
import {commonParams,options} from "../common/js/config"

export  function conts(num) {
  const url="https://proxy.comicool.cn/allcomic4h5";//数据
  const data=Object.assign({},commonParams,{
    device_id:"a061fe306e472f285fa6968c66a4e8d3",
    page_size:40,
    page_direction:2,
    comic_id:0,
    list_type:"category",
    order_type:'rating',
    req_id:num,
    req_param:1
  })
  return jsonp(url,data,options);
}
