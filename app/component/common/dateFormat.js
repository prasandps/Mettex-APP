const dateFormat = (date, onlyDate=false) => {
    date = new Date(date);
    
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    hours = hours < 10 ? '0'+hours : hours;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + '.' + minutes + '.'+seconds+' '+ ampm;

    let dateStr =
        ("00" + date.getDate()).slice(-2) + "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
            date.getFullYear() + " " + strTime;
    if(onlyDate === true){
        dateStr = ("00" + date.getDate()).slice(-2) + "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
            date.getFullYear()
    }
    return dateStr;

}

export default dateFormat;