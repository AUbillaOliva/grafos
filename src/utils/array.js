import lodash from "lodash";

export function addItem(arr, value) {
    const tmpArr = lodash.cloneDeep(arr);
    tmpArr.push(value);
    return tmpArr;
}

export function removeItem(arr, value) {
    const tmpArr = lodash.cloneDeep(arr);
    const index = arr.indexOf(value);
    if (index > -1) {
        tmpArr.splice(index, 1);
    }
    return tmpArr;
}

export function updateItem(arr, old, newVal) {

    //Find index of specific object using findIndex method.    
    let index = arr.findIndex((val) => val === old);

    //Log object to Console.
    console.log("Before update: ", arr[index])

    //Update object's name property.
    arr[index] = newVal;

    //Log object to console again.
    console.log("After update: ", arr[index])
}
