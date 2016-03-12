angular.module('app').filter("foodfilter", function($filter) {

       return function(array, keys, item) {
            var palavra = replaceSpecialChars(keys);

            if (palavra.length > 2 && palavra.length < 16) {
                return $filter("filter")(array, function(arrayItem) {

                    return replaceSpecialChars(arrayItem.n).indexOf(palavra) != -1;
                });

            } else if (palavra.length == 0) {
                return $filter("filter")(array, function(arrayItem) {
                    return arrayItem.amount > 0;
                });
            }

        };
    })