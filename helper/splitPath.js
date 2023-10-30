const splitPath = (path,userId) => {
    const pathArr = path.split('/')
    if(pathArr[0] === ''){
        pathArr.shift()
    }
    let docsToSave = []
    for(let i = 0;i<pathArr.length;i++){
    if(i==0){
        docsToSave.push({
        userId: userId,
        parentPath: '/',
        path: pathArr[0]
    })
    }else{
        docsToSave.push({
        userId: userId,
        parentPath: pathArr[i-1],
        path: pathArr[i]
        })
    }
    
    }
    return docsToSave
}

module.exports = {splitPath}