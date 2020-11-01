angular.module('myApp', []).controller('myCtrl', function($scope, $filter){

    $scope.list = [];
    $scope.minDate = new Date().toISOString().split('T')[0];

    //TEST DATA SET 01
    $scope.list.push({
        title:"Take the Garbage out!",
        date:"30/04/2020",
        time:"17:00:00"
    });

    //TEST DATA SET 02
    $scope.list.push({
        title:"Clean my room",
        date:"29/04/2020",
        time:"17:00:00"
    });

    //Initialize TAVO calendar & highlighted dates
    sa = [];
    for(i = 0; i < $scope.list.length; i++){
        sa[0] = sa[0] + $scope.list[i].date;
    }
  
    const calendar1 = new TavoCalendar('.calendar', {
        date: new Date(),
        past_select: true,
        format: "DD/MM/YYYY",
        highlight_sunday: false,
        highlight: sa[0]
    });

    //ADD event
    $scope.addEvent = function(){
        $scope.errortext = "";
        if (!$scope.eventTitle || !$scope.eventDate || !$scope.eventTime) {return;}

        $scope.list.push({
            title:$scope.eventTitle,
            date:moment($scope.eventDate).format('DD/MM/YYYY'),
            time:$scope.eventTime,
        });

        //used to update the sa array so the dates in the sa array can be highlighted
        sa[0] = "";
        for(i = 0; i < $scope.list.length; i++){
            sa[0] = sa[0] + $scope.list[i].date;
        }

        //need to update calendar1 -> highlight: sa[0]
        calendar1.highlight = sa[0];

        //sync the calendar to show changes -- unfortunately the  there is no way to sync the calendar
        

    };

    //DELETE event
    $scope.deleteEvent = function(x){
        $scope.list.splice(x, 1);
    }

    //UPDATE event
    $scope.updateEvent = function(x){
        let element = $scope.list[x];
        
        $scope.eventTitle = element.title;
        $scope.eventDate = new Date(element.date.toLocaleString());
        $scope.eventTime = element.time;

        $scope.list.splice(x, 1);
    }

    //SEARCH events from calender
    $scope.selectedDateArray = [];
    checkEvents = function(event){
        let date = calendar1.getSelected();
        date = date.toString();
        console.log(date);
        $scope.selectedDateArray = $filter('filter')($scope.list, {'date':date});
        console.log($scope.selectedDateArray);
    }

    //EVENT LISTENER for calendar date change
    calendar.addEventListener('calendar-select', checkEvents);

 });