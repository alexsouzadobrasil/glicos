angular.module('app').controller('salve', function($scope) {
    console.log("started salve");
    $scope.today = new Date();
    $scope.saved = localStorage.getItem('glicosHistory');
    $scope.taskItem = (localStorage.getItem('glicosHistory')!==null) ? JSON.parse($scope.saved) : [ {description: "glicos", date: $scope.today, complete: false}];
    localStorage.setItem('glicosHistory', JSON.stringify($scope.taskItem));
    
    $scope.newTask = null;
    $scope.newTaskDate = null;
    $scope.categories = [
        {name: 'jejum'},
        {name: '2h apos café'},
        {name: 'antes do almoço'},
        {name: 'antes do jantar'},
        {name: 'ao deitar'},
        {name: 'madrugada'}
    ];
    $scope.newTaskCategory = $scope.categories;
    $scope.addNew = function () {
        console.log('step'+$scope.step );
        if ($scope.newTaskDate == null || $scope.newTaskDate == '') {
            $scope.taskItem.push({
                description: $scope.newTask,
                date: "No deadline",
                complete: false,
                category: $scope.newTaskCategory.name
            }) 
        } else {
            $scope.taskItem.push({
                description: $scope.newTask,
                date: $scope.newTaskDate,
                complete: false,
                category: $scope.newTaskCategory.name
            })
        };
        $scope.newTask = '';
        $scope.newTaskDate = '';
        $scope.newTaskCategory = $scope.categories;
        localStorage.setItem('glicosHistory', JSON.stringify($scope.taskItem));
    };
    $scope.deleteTask = function () {
        var completedTask = $scope.taskItem;
        $scope.taskItem = [];
        angular.forEach(completedTask, function (taskItem) {
            if (!taskItem.complete) {
                $scope.taskItem.push(taskItem);
            }
        });
        localStorage.setItem('glicosHistory', JSON.stringify($scope.taskItem));
    };
    
    $scope.save = function () {
        localStorage.setItem('glicosHistory', JSON.stringify($scope.taskItem));
    }
});