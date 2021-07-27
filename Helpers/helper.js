import moment from 'moment';

const helper = {
    formateDate : function (date, formate = "MMMM Do YYYY, h:mm:ss a"){
        return moment(date).format(formate);
    },
    truncate: function (str, len = 100) {
        if (str.length > len && str.length > 0) {
          let new_str = str + ' '
          new_str = str.substr(0, len)
          new_str = str.substr(0, new_str.lastIndexOf(' '))
          new_str = new_str.length > 0 ? new_str : str.substr(0, len)
          return new_str + '...'
        }
        return str
      },
      stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '')
      },

}
export default helper;