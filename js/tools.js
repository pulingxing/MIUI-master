/**
 * Created by pp on 2017/9/26.
 * 功能：函数封装
 */

/**
 * 将location.search -> Obj
 * @param  {string} searchStr [location.search]
 * @return {object}           [转换后的结果]
 */
function locSearchValToObj(searchStr) {
    // 异常处理
    if (!searchStr) {
        return null;
    }else {
        var str = searchStr.slice(1);
        var strArr = str.split('&');
        var obj = {};
        strArr.forEach(function(item, idx, arr){
            var arr = item.split('=');
            var key = decodeURI(arr[0]);
            var val = decodeURI(arr[1]);
            obj[key] = val;
        });
        return obj;
    }
}


/**
 * 异常处理（断言）
 * @param  {boolean} expression [判断条件]
 * @param  {string} message     [提示信息]
 * @return {object}             [描述错误的对象]
 */
function assert(expression, message) {
	if (!expression){
		throw {name: 'Assertion Exception', message: message};
	}
}


/**
 * 添加事件
 * @param {object} element   [元素节点]
 * @param {string} type       [事件类型]
 * @param {function} callBack [监听函数]
 */
function addEvent(element, type, callBack) {
    // 兼容IE10.0以下
    if(element.attachEvent) {
        element.attachEvent('on' + type, callBack);
    }else {
        element.addEventListener(type, callBack, null);
    }
}


/**
 * 获取非行间样式
 * @param  {object} obj  [元素节点]
 * @param  {string} attr  [要获取的样式属性]
 * @return {string}       [样式属性值]
 */
function getStyle(obj, attr) {
	// 兼容IE
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}else {
		return getComputedStyle(obj, null)[attr];
	}
}

/**
 * 获取任意数之间的随机数
 * @param  {number} min [最小值]
 * @param  {number} max [最大值]
 * @return {number}     [随机数]
 */
function randomDecimals(min, max) {
	if (!min || !max || isNaN(min) || isNaN(max)) {
		return -1;
	}else {
		return Math.random() * (max - min) + min;
	}
}


/**
 * 获取任意数之间的整数随机数
 * @param  {number} min [最小值]
 * @param  {number} max [最大值]
 * @return {number}     [随机数]
 */
function randomInteger(min, max) {
	if (!min || !max || isNaN(min) || isNaN(max)) {
		return -1;
	}else {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}


/**
 * 获取随机字符
 * @param  {number} length [字符长度]
 * @return {string}        [随机结果]
 */
function random_char(length) {
  var bStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  bStr += 'abcdefghijklmnopqrstuvwxyz';
  bStr += '0123456789';
  var rStr = '';
  for (var i = 0; i < length; ++i) {
    var idx = Math.floor(Math.random() * bStr.length);
    rStr += bStr.substring(idx, idx + 1);
  }
  return rStr;
}



/**
 * 获取元素节点
 * @param  {string} Selector [选择器（id/class/tagName）]
 * @return {object}           [返回节点]
 */
function $(Selector) {
	// 异常处理
	if (typeof Selector != 'string' || Selector == '' || /\s/.test(Selector) == true) {
		return null;
	}
	if (/^#/.test(Selector) == true) {
		return document.getElementById(Selector.slice(1));
	}
	if (/^\./.test(Selector) == true) {
		return document.getElementsByClassName(Selector.slice(1));
	}
	return document.getElementsByTagName(Selector);
}


/**
 * XMLHttpRequest for GET
 * @param {string} url     [请求地址]
 * @param {function} success [请求成功回调函数]
 * @param {function} fail    [请求失败回调函数]
 */
function GET(url, success, fail) {
	// 异常处理
	assert(url, "缺乏请求参数！");
	// 创建请求对象
	var request = new XMLHttpRequest();
	// 配置请求
	request.open("GET", url, true);
	// 发送请求
	request.send(null);
	// 监听请求
	request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200) {
			// 请求成功
			// 解析数据
			var response = JSON.parse(request.responseText);
			if(success) { success(response); }
		}else {
			// 请求失败
			if(fail) { fail(request.status); }
		}
	}
}

/**
 * 将字符串转为Unicode编码
 * 
 */
{
	Object.prototype.toUnicodeString = function(val) {
		var s = val || this.valueOf() ;
		var numCode = "";
		var resStr = "";
		for (var i = 0; i < s.length; i++) {
			numCode = s.charCodeAt(i);
			numCode = numCode.toString(16);
			numCode = '\\u' + numCode;
			resStr += numCode;
		}
		return resStr;
		
	}
}


/**
 * 分页
 * opt {
 *    id:'',
 * 	  curPage:..,
 *    allPage:..,
 *    callBack:..
 * }
 */

function page(opt) {
	// 异常处理：判断调用时是否传入id，只在传入id的情况下使用该分页函数
	if (!opt.id || opt.curPage <= 0 || opt.allPage <= 0 || opt.curPage > opt.allPage) {return null};

	// 获取元素及参数，对参数做异常处理
	var obj      = document.getElementById(opt.id);
	var curPage  = opt.curPage  || 1; // 当前页，默认1
	var allPage  = opt.allPage  || 5; // 总页码，默认5
	var callBack = opt.callBack || function(){};

	//【首页】仅在当前页大于等于4，且总页数大于等于6的情况下出现首页
	if (curPage >= 4 && allPage >= 6) {
		var oA = document.createElement('a');
		oA.href = '#1';
		oA.innerHTML = '首页';
		obj.appendChild(oA);
	}

	// 【上一页】在当前页大于等于2的情况下出现上一页
	if (curPage >= 2) {
		var oA = document.createElement('a');
		oA.href = '#' + (curPage - 1);
		oA.innerHTML = '上一页';
		obj.appendChild(oA);
	}

	// 假设页码显示的数量为五个，则分为两种情况
	// 1、总页码小于等于5
	// 2、总页码大于5
	if (allPage <= 5) { // 当总页数少于5个的时候
		for (var i = 1; i <= allPage; i++) {
			var oA = document.createElement('a');
			oA.href = '#' + i;
			if (curPage == i) { // 当前页码不加‘[]’
				oA.innerHTML = i; 
			}else {
				oA.innerHTML = '[' + i + ']';
			}
			obj.appendChild(oA);
		}
	}else { // 当总页数大于5页的时候
		for(var i = 1; i <= 5; i++) {
			var oA = document.createElement('a');
			if (curPage < 3) {  // 当前页小于3，即1、2页时
				oA.href = '#' + i;
				if (curPage == i) {
					oA.innerHTML = i;
				}else {
					oA.innerHTML = '['+ i +']'
				}
			}else if(curPage > allPage - 2){ // 当前页为最后两页时
				oA.href = '#' + (allPage - 5 + i);
				if (curPage == (allPage - 5 + i)) {
					oA.innerHTML = (allPage - 5 + i);
				}else {
					oA.innerHTML = '[' + (allPage - 5 + i) + ']'
				}
			}else {
				oA.href = '#' + (curPage - 3 + i);
				if (i == 3) {
					oA.innerHTML = (curPage - 3 + i);
				}else {
					oA.innerHTML = '[' + (curPage - 3 + i) + ']';
				}
			}
			obj.appendChild(oA);
		}
	}

	// 【下一页】当前页不等于总页码数且总页码数大于等于2的情况下
	if ((allPage - curPage) >= 1)  {
		var oA = document.createElement('a');
		oA.href = '#' + (curPage + 1);
		oA.innerHTML = '下一页';
		obj.appendChild(oA);
	}

	// 【尾页】当总页数比当前页至少大3，且总页码数大于等于6的情况下出现
	if ((allPage - curPage) >= 3 && allPage >= 6) {
		var oA = document.createElement('a');
		oA.href = '#' + allPage;
		oA.innerHTML = '尾页';
		obj.appendChild(oA);
	}

	// 总页码
	var oA = document.createElement('a');
	oA.innerHTML = '共' + allPage + '页';
	obj.appendChild(oA);

	// 执行回调函数
	callBack(curPage, allPage);

	// 为每一个a添加点击事件
	var aA = obj.getElementsByTagName('a');
	for (var i = 0; i < aA.length; i++) {
		aA[i].onclick = function() {
			var curPage = parseInt(this.getAttribute('href').slice(1));
			obj.innerHTML = '';
			page({
				id: opt.id,
				curPage: curPage,
				allPage: allPage,
				callBack: callBack

			});
			// 阻止默认事件
			return false;
		}
	}
}



/**
 * 本地存储：添加用户
 * @param key      存储用户信息的key
 * @param user     用户信息
 * @param callBack 存储成功回调函数
 */
function addUser(key, user, callBack) {
    // 定义存储用户信息的集合
    var users = null;
    // 判断本地是否已经存在该用户数据集合
    if(localStorage[key]) {
        // 存在，根据本地用户数据集合来初始化users
        users = JSON.parse(localStorage[key]);
    }else {
        // 不存在，创建一个空数组
        users = [];
    }
    // 添加用户
    users.push(user);
    // 更新本地数据
    localStorage[key] = JSON.stringify(users);
    // 数据存储成功之后调用回调函数
    if(callBack) {
        callBack();
    }
}

/**
 * 判断用户是否存在
 * @param key      存储用户信息在本地的key
 * @param gist     判断用户是否存在的依据
 * @param value    用户输入的值
 * @param response 响应结果（0用户存在 1用户不存在）
 */
function determineUserIsExists(key, gist, value, response) {
    if(!localStorage[key]) {
        response(1);
        return;
    }
    // 获取本地用户数据集合
    var users = JSON.parse(localStorage[key]);
    // 遍历本地用户数据集合，判断用户是否存在
    var tag = false;
    for(var i = 0; i < users.length; i++) {
        if(users[i][gist] == value) {
            // 用户存在
            tag = true;
        }
    }
    tag ? response(0) : response(1);
}

/**
 * 判断是否登录成功
 * @param key      存储用户信息在本地的key
 * @param gists    判断依据
 * @param response 响应结果
 * 0   用户不存在
 * 1   账号或密码错误
 * 2   账号或密码密码为空
 * 200 登录成功
 */

function login(key, gists, response) {
    // 判断本地数据用户集合是否存在
    // 如果不存在，则直接提示用户不存在
    if(!localStorage[key]) {
        response(0);
        return;
    }

    // 判断用户输入的账号或密码为空
    var username = Object.keys(gists)[0];
    var password = Object.keys(gists)[1];
    if(!gists[username] || !gists[password]) {
        response(2);
        return;
    }

    // 判断是否登录成功
    var users = JSON.parse(localStorage[key]);
    var idx = undefined;
    for(var i = 0; i < users.length; i++) {
        // 判断用户是否存在
        if(users[i][username] == gists[username]) {
            idx = i;
            break;
        }
    }
    if(idx == undefined) {
        // 用户不存在
        response(0);
    }else {
        // 用户存在
        if((users[idx][username] == gists[username]) &&  (users[idx][password] == gists[password])) {
            response(200);
        }else {
            response(1);
        }
    }

}
























