var LodashWrapper=require("./_LodashWrapper"),flatRest=require("./_flatRest"),getData=require("./_getData"),getFuncName=require("./_getFuncName"),isArray=require("./isArray"),isLaziable=require("./_isLaziable"),FUNC_ERROR_TEXT="Expected a function",WRAP_CURRY_FLAG=8,WRAP_PARTIAL_FLAG=32,WRAP_ARY_FLAG=128,WRAP_REARG_FLAG=256;function createFlow(_){return flatRest(function(R){var i=R.length,e=i,r=LodashWrapper.prototype.thru;for(_&&R.reverse();e--;){var a=R[e];if("function"!=typeof a)throw new TypeError(FUNC_ERROR_TEXT);if(r&&!A&&"wrapper"==getFuncName(a))var A=new LodashWrapper([],!0)}for(e=A?e:i;++e<i;){a=R[e];var t=getFuncName(a),n="wrapper"==t?getData(a):void 0;A=n&&isLaziable(n[0])&&n[1]==(WRAP_ARY_FLAG|WRAP_CURRY_FLAG|WRAP_PARTIAL_FLAG|WRAP_REARG_FLAG)&&!n[4].length&&1==n[9]?A[getFuncName(n[0])].apply(A,n[3]):1==a.length&&isLaziable(a)?A[t]():A.thru(a)}return function(){var e=arguments,r=e[0];if(A&&1==e.length&&isArray(r))return A.plant(r).value();for(var a=0,t=i?R[a].apply(this,e):r;++a<i;)t=R[a].call(this,t);return t}})}module.exports=createFlow;