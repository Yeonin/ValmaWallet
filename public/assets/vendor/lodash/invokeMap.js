var apply=require("./_apply"),baseEach=require("./_baseEach"),baseInvoke=require("./_baseInvoke"),baseRest=require("./_baseRest"),isArrayLike=require("./isArrayLike"),invokeMap=baseRest(function(e,a,r){var i=-1,s="function"==typeof a,n=isArrayLike(e)?Array(e.length):[];return baseEach(e,function(e){n[++i]=s?apply(a,e,r):baseInvoke(e,a,r)}),n});module.exports=invokeMap;