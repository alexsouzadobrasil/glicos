'use strict';

angular.module('app').controller('foodController', function($scope, $http, $timeout) {
    $scope.appName = "glicos";
    $scope.step = "configuração";
    $scope.myHistory = [];
    $scope.foods = [];
    $scope.datatime = Number(new Date());
    $scope.glicemia;
    $scope.cho = 0;
    $scope.kcal = 0;
    $scope.insulina = 0;
    $scope.selectTypeFood = 0;
    $scope.metaGlicemica = 100;
    $scope.fatorCorrecao = 50;
    $scope.razaoInsulina = 10;
    $scope.translate = translate;
    $scope.searchFood = "";
    $scope.dica = sessionStorage.setItem('glicos.dica', false);
    $scope.tools = {
        load: (function() {
            var url = 'js/json.js';
            $.ajax(url, {
                dataType: 'json',
                async: true,
                type: 'GET'
            }).done(function(response) {
                $scope.foods = response.alimentos;


            }).fail(function(e) {
                alert("Alimentos não carregados, verifique a conexão");
            });
        })(),

        calc: function() { //Todo  
            var kcal = 0;
            var cho = 0;
            for (var i = $scope.foods.length - 1; i >= 0; i--) {
                if ($scope.foods[i].amount === undefined) $scope.foods[i].amount = 0;
                cho += $scope.foods[i].c * $scope.foods[i].amount;
                kcal += $scope.foods[i].k * $scope.foods[i].amount;
            }
            $scope.cho = cho;
            $scope.kcal = kcal;
            $scope.insulina = (($scope.glicemia - $scope.metaGlicemica) / $scope.fatorCorrecao) + ($scope.cho / $scope.razaoInsulina);

        },
        increase: function(elementsItem) {
            console.log(" increase");
            if (elementsItem.amount === undefined) elementsItem.amount = 0;
            if (elementsItem.amount < 30) {
                elementsItem.amount = elementsItem.amount + 1;
            }
            $scope.searchFood = "";
        },
        decrease: function(elementsItem) {
            if (elementsItem.amount > 0) {
                elementsItem.amount = elementsItem.amount - 1;
            }
        },
       
        dica: function(texto) {
            alert(texto);
        },

        quit: function() {
            navigator.app.exitApp();

        },
        history: (function() {
            $scope.myHistory = sessionStorage.getItem('glicos.historico');
        })(),
        salve: function() {
            var resume = {
                "myFoods": $scope.myFoods,
                "datatime": $scope.datatime,
                "glicemia": $scope.glicemia,
                "cho": $scope.cho,
                "kcal": $scope.kcal,
                "insulina": $scope.insulina
            }
            try {
                var tmp = [];
                tmp = $scope.myHistory;
                if (tmp) {
                    console.log(typeof tmp);
                    tmp.push(resume);
                } else {
                    tmp = resume;
                }
                sessionStorage.setItem('glicos.historico', tmp);
                console.table(tmp);
            } catch (e) {
                console.warn(e);
            }
        }
    }

});

//end


function replaceSpecialChars(str) {
    str = str.toUpperCase();
    str = str.replace(/[ÀÁÂÃÄÅ]/, "A");
    str = str.replace(/[ÈÉÊË]/, "E");
    str = str.replace(/[Ç]/, "C");
    str = str.replace(/[^a-z0-9]/gi, '');
    return str;

}


function translate(text) {
    var itens = {
        "0": "bebidas",
        "1": "doces",
        "2": "carnes",
        "3": "verduras",
        "4": "frutas",
        "5": "preparacoes",
        "6": "leite",
        "7": "fastfood",
        "8": "n/a",
        "9": "n/a",
        "n": "Nome",
        "m": "dose",
        "w": "Peso/Quantidade",
        "k": "kcal",
        "c": "cho",
        "t": "Categoria",
        "g": "glicemia",
        "r": "Relevancia"
    }
    return itens[text];
}
