var jsonpath = require("../").eval,
    testCase = require('nodeunit').testCase
    
    
    
var json;
initialize = function() {
  json = {
    "store": {
      "book": {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": [8.95, 8.94, 8.93]
      },
      "books": [{
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": [8.95, 8.94, 8.93]
      }]
    }
  };
}
initialize();

module.exports = testCase({
  //====================================
  "get single": function(test) {
    //====================================
    var expected = json.store.book;
    var result = jsonpath(json, "store.book", {
      flatten: true,
      wrap: false
    });
    test.deepEqual(expected, result);
    test.done();
  },
  //====================================
  "get arr": function(test) {
    //====================================
    var expected = json.store.books;
    var result = jsonpath(json, "store.books", {
      flatten: true,
      wrap: false
    });
    test.deepEqual(expected, result);
    test.done();
  },
  //====================================
  "replace object property": function(test) {
    //====================================
    var expected = {
      "store": {
        "book": {
          "category": "reference",
          "author": "Nigel Rees",
          "title": "Sayings of the Century",
          "price": [10, 20, 30]
        },
        "books": [{
          "category": "reference",
          "author": "Nigel Rees",
          "title": "Sayings of the Century",
          "price": [8.95, 8.94, 8.93]
        }]
      }
    };
    var result = jsonpath(json, "store.book", {
      flatten: true,
      wrap: false
    }, {
      "category": "reference",
      "author": "Nigel Rees",
      "title": "Sayings of the Century",
      "price": [10, 20, 30]
    });
    test.deepEqual(expected, json);
    test.done();
  },
  //====================================
  "replace arr single": function(test) {
    //====================================
    initialize();
    var expected = {
      "store": {
        "book": {
          "category": "reference",
          "author": "Nigel Rees",
          "title": "Sayings of the Century",
          "price": [8.95, 8.94, 8.93]
        },
        "books": [{
          "category": "reference",
          "author": "Nigel Rees",
          "title": "Sayings of the Century",
          "price": [10, 20, 30]
        }]
      }
    }
    var result = jsonpath(json, "store.books[0]", {
      flatten: true,
      wrap: false
    }, {
      "category": "reference",
      "author": "Nigel Rees",
      "title": "Sayings of the Century",
      "price": [10, 20, 30]
    });
    test.deepEqual(expected, json);
    test.done();
  },
  //====================================
  "replace arr multiple": function(test) {
    //====================================
    var json = {
      "store": {
        "books": [{
          "category": "reference",
          "author": "Nigel Rees",
          "title": "Sayings of the Century",
          "price": [8.95, 8.94, 8.93]
        },{
          "category": "reference",
          "author": "Nigel Rees",
          "title": "Sayings of the Century",
          "price": [8.95, 8.94, 8.93]
        }]
      }
    };

    var expected = {
      "store": {
        "books": [{
          "category": "reference",
          "author": "Nigel Rees",
          "title": "Sayings of the Century",
          "price": [10, 20, 30]
        },{
          "category": "reference",
          "author": "Nigel Rees",
          "title": "Sayings of the Century",
          "price": [10, 20, 30]
        }]
      }
    }
    var result = jsonpath(json, "store.books[*]", {
      flatten: true,
      wrap: false
    }, {
      "category": "reference",
      "author": "Nigel Rees",
      "title": "Sayings of the Century",
      "price": [10, 20, 30]
    });
    test.deepEqual(expected, json);
    test.done();
  }
});
