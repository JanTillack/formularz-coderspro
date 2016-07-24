var main = function () {
	var page = 1, numberOfElementsPerPage=5, numberOfPages = 1, start=0;
	var userArray = [], id = 0;
    function userClass(_name, _surname, _age){  //to jest konstruktor klasy!!!111
    	this.name = _name;
    	this.surname = _surname;
    	this.age = _age;

    }
    userClass.prototype.printPerson = function (){
    	console.log(this.name, this.surname, this.age);
    };
    var addToList = function (){
    	var tempUserObject = new userClass($('#name').val(), $('#surname').val(), parseInt($('#age').val()));
    	userArray.push(tempUserObject);
    	numberOfPages = Math.ceil(userArray.length/numberOfElementsPerPage);

    	printList();
    };
    var printList = function (){

    	$('#list_of_users').empty();

    	userArray.forEach(function(user, i){

    		if ( i >=(page-1)*numberOfElementsPerPage && i < page*numberOfElementsPerPage){
    			var button = $('<button>REMOVE</button>').click(function(){
    				console.log(user);
    				removeUser(user);
    			})

    			var upButton = $('<button>UP</button>').click(function(){
    				console.log(user);
    				pushUser(user);
    			})

    			var downButton = $('<button>DOWN</button>').click(function(){
    				console.log(user);
    				kickUser(user);
    			})

    			$('#list_of_users').append('<p>' + user.name + ' ' + user.surname + '</p>').append(button, upButton, downButton);

    		}



    	}) 

    	$('#page').text(page);
    	$('#number_of_pages').text(numberOfPages);
    }

    $('#next_page').click(function(){
    	if (page<numberOfPages) {
    	page++;
    }
    	printList();

    })

    $('#previous_page').click(function(){
    	if(page > 1){
    		page--;
    		printList();

    	}
    })

    $('#first_page').click(function(){
    	page = 1;
    	printList();
    })
    $('#last_page').click(function(){
    	page=numberOfPages;
    	printList();
    })








    var removeUser = function loop (user) {

    	userArray.splice(userArray.indexOf(user), 1);
    	numberOfPages = Math.ceil(userArray.length/numberOfElementsPerPage);
    	if (page>numberOfPages && numberOfPages !=0){
    		page = numberOfPages;
    	} if (page>numberOfPages && numberOfPages == 0) {
    		page = 1;
    		numberOfPages = 1;
    	}

    	
    	printList();
    };

    var pushUser = function  (user) {
    	
    	var elPosition = userArray.indexOf(user);
    	var elTake = userArray[elPosition ];
    	if (elPosition > 0) {
    		userArray[elPosition] = userArray[elPosition- 1];
    		userArray[elPosition -1] = elTake;
    		printList();
    	} else {
    		console.log("Cannot move up");
    	}

    }

    var kickUser = function  (user) {
    	var elPosition2 = userArray.indexOf(user);
    	var elGive = userArray[elPosition2 ];
    	if (elPosition2 < userArray.length -1 ){
    		userArray[elPosition2] = userArray[elPosition2 + 1]
    		userArray[elPosition2 + 1] = elGive
    		printList();
    	} else {
    		console.log("Cannot go down")
    	}
    }

    var addInput = function () {
    	userClass.prototype.newValue = '445';
    	printList();
    }
    $('#add_to_list').click(addToList);
    $('#print_list').click(printList);
    $('#add_input').click(addInput);
}

$(document).ready(main);