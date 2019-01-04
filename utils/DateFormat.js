const type = {
    DATETIME: 'yyyy-MM-dd HH:mm:ss',
    DATE: 'yyyy-MM-dd'
}
const formatTime = (date, typeEnum = type.DATETIME) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    switch (typeEnum) {
        case type.DATETIME:
            return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
        case type.DATE:
            return [year, month, day].map(formatNumber).join('-')
    }
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

module.exports = {
    formatTime: formatTime,
    type: type
}