/*
  1.name：需要获取的url中?传参的参数名,string格式；
  2.返回的值统一为字符串格式，若需要int，则需要自己手动转换，parseInt();
*/

export default function getParams (name) {
  var reg = new RegExp("(|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.hash.substr(1).match(reg);

  if (r != null) return decodeURIComponent(r[2]);    //(r[2]);
  return "";
}
