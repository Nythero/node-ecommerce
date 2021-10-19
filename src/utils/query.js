class QueryWhere {
  constructor(strings, properties) {
    for(let string in strings) {
      for(let property in properties) {
        this[properties[property]] = strings[string];
      }
    }
  }

  toSqlString () {
    let string = "";
    for(let i = 0, entries = Object.entries(this); i < entries.length; i++) {
      let operand = (i == entries.length - 1)? "" : ((i % 2 == 0)? ' OR' : ' AND');
      string += ` ${entries[i][0]} LIKE "%${entries[i][1]}%"${operand}`;
    }
    return string;
  }
}

module.exports = QueryWhere;
