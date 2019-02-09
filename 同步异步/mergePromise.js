/*
实现mergePromise函数，把传进去的数组顺序先后执行，
并且把返回的数据先后放到数组data中
*/

const timeout = ms => new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve();
	}, ms);
});

const ajax1 = () => timeout(2000).then(() => {
	console.log('1');
	return 1;
});

const ajax2 = () => timeout(1000).then(() => {
	console.log('2');
	return 2;
});

const ajax3 = () => timeout(2000).then(() => {
	console.log('3');
	return 3;
});

const mergePromise = ajaxArray => {
	// 在这里实现你的代码
	var data =[];
	//用于每执行一次数组里面的函数返回一个新的进入resolve状态的Promise对象
	var promise = Promise.resolve();
	ajaxArray.forEach(v =>{
		promise = promise.then(v).then(res=>{
			data.push(res);
			return data; //必须在这里return data作为下一次的resolve的内容
		})
	})
	return promise;//其实就是Promise.resolve(data);
};

mergePromise([ajax1, ajax2, ajax3]).then(data => {
	console.log('done');
	console.log(data); // data 为 [1, 2, 3]
});

// 分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]