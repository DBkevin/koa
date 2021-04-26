exports = module.exports = (count, host="/users",page = 1, pageSize = 5)=>{
    const pagination = [];
    const Count = Math.ceil(count / pageSize);
    for (let index = 1; index <= Count; index++){
        if (page == index) {
            pagination.push(`<li class="active page-item"><a href="${host}?page=${index}" class="page-link">${index}</a></li>`);
        } else {
            pagination.push(`<li class="page-item"><a href="${host}?page=${index}" class="page-link">${index}</a></li>`);
        }
    }
    return pagination;
}
