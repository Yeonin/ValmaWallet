var baseGetTag=require("./_baseGetTag"),isObjectLike=require("./isObjectLike"),isPlainObject=require("./isPlainObject"),domExcTag="[object DOMException]",errorTag="[object Error]";function isError(e){if(!isObjectLike(e))return!1;var r=baseGetTag(e);return r==errorTag||r==domExcTag||"string"==typeof e.message&&"string"==typeof e.name&&!isPlainObject(e)}module.exports=isError;