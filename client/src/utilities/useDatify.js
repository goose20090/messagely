export function useDatify(date){
    const createdDate = new Date(date);
    const todayDate = new Date();
    if (createdDate.toDateString() === todayDate.toDateString()) {
      let minutes = createdDate.getMinutes();
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      return `${createdDate.getHours()}:${minutes}`;
    } else {
      let month = createdDate.getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      }
      let minutes = createdDate.getMinutes();
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (minutes % 10){
        minutes = minutes + '0'
      }
       return `${createdDate.getDate()}/${month}/${createdDate.getFullYear()}`;
    }
}