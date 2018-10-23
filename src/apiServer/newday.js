
import jsonp from "../common/js/jsonp.js"
import {commonParams,options} from "../common/js/config"

export  function newDay() {
  const url="https://proxy.comicool.cn/timeline4web";
  const data=Object.assign({},commonParams,{
    device_id:"a062855d3abe59cbc6bf455ae2fd3dd8",
  })
  return jsonp(url,data,options);
}
