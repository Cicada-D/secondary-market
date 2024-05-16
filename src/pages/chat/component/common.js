export function sortMessage(message){
    console.log("message", message)
     // 使用 sort 方法对数组进行排序
     message.sort((a, b) => {
        // 将 createTime 属性转换为数字进行比较
        return parseInt(a.createTime) - parseInt(b.createTime);
    });

    // 返回排序后的数组
    return message;
}