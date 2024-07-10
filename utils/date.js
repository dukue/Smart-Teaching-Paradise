const nowTime = () => {
    // 创建一个新的Date对象，表示当前时间
    var now = new Date();

    // 使用Date对象的方法获取年、月、日、小时、分钟和秒
    var year = now.getFullYear(); // 获取完整的年份（4位）
    var month = now.getMonth() + 1; // getMonth()返回的月份是从0开始的，所以需要+1
    var day = now.getDate(); // 获取日期
    var hours = now.getHours(); // 获取小时
    var minutes = now.getMinutes(); // 获取分钟
    var seconds = now.getSeconds(); // 获取秒

    // 格式化月、日、小时、分钟和秒，不足10的前面补0
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // 将年、月、日、小时、分钟和秒拼接成MySQL DATETIME格式的字符串
    var datetimeString = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds;

    return datetimeString;
}

export default nowTime;