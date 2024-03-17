export function fmtForm(object, keys) {
  const subset = {};

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      subset[key] = object[key];
    } else {
      subset[key] = null;
    }
  }
  return subset;
}

/**
 * 将字符串的首字母大写
 */
export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 手工分页
 * @param array   要分页的数组
 * @param currentPage   当前页
 * @param itemsPerPage  每页的元素个数
 */
export function paginateArray(array, currentPage, itemsPerPage) {
  // 计算起始索引和结束索引
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // 截取数组的部分
  if(array){
    return array.slice(startIndex, endIndex);
  } else {
    return []
  }

}

export function extractYearAndMonth(dateString) {
  // 创建一个 Date 对象，将日期字符串传递给构造函数
  let dateObject = new Date(dateString);

  // 使用 Date 对象的方法获取年份和月份
  let year = dateObject.getFullYear();
  let month = dateObject.getMonth() + 1; // 月份是从0开始的，所以要加1

  // 将结果以对象的形式返回
  return year + '-' + month
}

/*
* 提取数组中元素的属性为单独的数组
* [{attr1: 1, attr2: 2}, {attr1: 3, attr2: 4}]
* 转换为
* [{name: 'attr1', data:[1, 3]}, {name: 'attr2', data:[2, 4]}]
*/
export function extractAttrArray(dataArray) {
  const transformedData = [];

  // Extract unique keys from the input data
  const keys = Array.from(
      new Set(dataArray.flatMap((item) => Object.keys(item)))
  );

  // Exclude the first key as it will be used as the x-axis
  const dataKeys = keys.slice(1);

  // Iterate over data keys to create transformed data
  dataKeys.forEach((key) => {
    const newData = {
      name: key,
      data: dataArray.map((item) => item[key]),
    };

    transformedData.push(newData);
  });

  return transformedData;
}

/**
 * // 示例用法
 * var url = "https://openalex.org/W2513506562";
 * var result = getLastSegment(url);
 * console.log(result); // 输出: W2513506562
 */
export function getLastSegment(url) {
  // 使用split方法将URL按照'/'进行分割，并取得最后一个部分
  let segments = url.split('/');
  return segments[segments.length - 1];
}

export function getLastElement(array) {
  // 检查数组是否为空
  if (array && array.length > 0) {
    // 返回数组的最后一个元素
    return array[array.length - 1];
  } else {
    // 数组为空时返回 1
    return 1;
  }
}
