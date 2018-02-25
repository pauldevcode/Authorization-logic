
(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$menu = $('#menu'),
			$sidebar = $('#sidebar'),
			$main = $('#main');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// IE<=9: Reverse order of main and sidebar.
			if (skel.vars.IEVersion <= 9)
				$main.insertAfter($sidebar);

		// Menu.
			$menu
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-menu-visible'
				});

		

	// 	// Intro.
	// 		var $intro = $('#intro');

	// 		// Move to main on <=large, back to sidebar on >large.
	// 			skel
	// 				.on('+large', function() {
	// 					$intro.prependTo($main);
	// 				})
	// 				.on('-large', function() {
	// 					$intro.prependTo($sidebar);
	// 				});

	});

	// modal window

// open the button


// $('.js-button-campaign').click(function() { 
// 	$('.wrapper').css('filter','blur(5px)');
// 	$('.js-overlay-campaign').fadeIn();
// 	$('.js-overlay-campaign').addClass('disabled');
// 	$('.footer').css('filter','blur(5px)');
// });

// close on the cross
$('.js-close-campaign').click(function() { 
	$('.js-overlay-campaign').fadeOut();
	$('.wrapper').css('filter','none');
	$('.footer').css('filter','none');
});

// close on click outside the window
$(document).mouseup(function (e) { 
	var popup = $('.js-popup-campaign');
	if (e.target!=popup[0]&&popup.has(e.target).length === 0){
		$('.js-overlay-campaign').fadeOut();
		$('.wrapper').css('filter','none');
		$('.footer').css('filter','none');
	}
});

	// modal window
// Welcome window
$('.js-button-welcome').click(function() { 
	$('.wrapper').css('filter','blur(5px)');
	$('.js-overlay-welcome').fadeIn();
	$('.js-overlay-welcome').addClass('disabled');
	$('.footer').css('filter','blur(5px)');
});

// close on the cross
$('.js-close-welcome').click(function() { 
	$('.js-overlay-welcome').fadeOut();
	$('.wrapper').css('filter','none');
	$('.footer').css('filter','none');
});

// close on click outside the window
$(document).mouseup(function (e) { 
	var popup = $('.js-popup-welcome');
	if (e.target!=popup[0]&&popup.has(e.target).length === 0){
		$('.js-overlay-welcome').fadeOut();
		$('.wrapper').css('filter','none');
		$('.footer').css('filter','none');
	}
});



// login form
$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});

})(jQuery);

	// burger

	function toggleside(ref) {
   ref.classList.toggle("active");
   document.getElementById("burgerwrap").classList.toggle("active");
   document.getElementById("sidebar").classList.toggle("active");
};

	// get all p
	function getAll_p() {
  	return  document.querySelector('.post').querySelectorAll(".content-block")
	};
 
 	// remove last p
	function remove_lastp() {
  	var rmLast = getAll_p();
  	if (rmLast.length) {
  		rmLast[rmLast.length - 1].remove();
  	}
};

	// edit font size
	function changeFontsize(value) {
		value = parseInt(value);
		if (!value){
		document.getElementById('font-size').value = '';
		} 
		else {
				if ( value > 7 && value < 25 ) {
					var p = getAll_p();
					for (var i = 0; i < p.length; i++) {
	    			p[i].style.fontSize = value + 'px';
					}
				}
		}
};
	// change font family
	function changeFont(value) {
		var p = getAll_p();
		for (var i = 0; i < p.length; i++) {
	    			p[i].style.fontFamily = value.labels[0].htmlFor;
					}
		console.log(value.labels[0].htmlFor);
	}


// hidden modal after click
    function modalHide() {
    	document.getElementById('clickbtn').style.visibility = 'visible';
      document.getElementById('overlay').style.display = 'none';
    }

 // App initcialization
    function init() {
        getUsers();
        var isLogedIn = false;
        document.getElementById('register').addEventListener('click', signUp);
        document.getElementById('auth').addEventListener('click', signIn);
        document.getElementById('signOut').addEventListener('click', signOut);
        document.getElementById('toggleModal').addEventListener('click', function() {
            toggleModal(isLogedIn);
        });

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                document.getElementById('clickbtn').style.visibility = 'visible';
                isLogedIn = true;
            } else {
                // No user is signed in.
                isLogedIn = false;
                console.log('please login first');
            }
        });

    }
    // SignIn (Login)
    function signIn() {
        var email = document.getElementById('auth_login').value;
        var password = document.getElementById('auth_password').value;
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
        	console.log(result);
            var uid = result.uid;
            var user = result.providerDataг;
            var email = result.email;
            localStorage.setItem('uid', uid);
            localStorage.setItem('email', email);
            modalHide();
        }).catch(function(error) {
            console.log(error);
            // alert(error.code);
            alert(error.message);
        })
    }
		// SignUp (Registration)
    function signUp() {
        var email = document.getElementById('register_login').value;
        var password = document.getElementById('register_password').value;
        var password_confirmation = document.getElementById('register_confirmation').value;
        if (password !== password_confirmation) {
            alert('paswoords is not equal');
            return;
        } else {
            console.log('passwords equal');
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
                modalHide();
                addUser(email, password);
                console.log('registered successfully');
            }).catch(function(error) {
                //false
                console.log(error);
            });

        }
    }
		// Sign out 
    function signOut(e) {
        e.preventDefault();
        firebase.auth().signOut().then(function() {
            console.log('User is logOut');
            document.getElementById('clickbtn').style.visibility = 'hidden';
        }).catch(function(error) {
            console.log(error);
        });
    }

    // Get And Post to firebase

    //get all users in db
    function getUsers() {
        axios.get('https://qwertytask3.firebaseio.com/users.json').then(function(result) {
            var users = result.data;
            var total = document.getElementById('total_users');
            var total_count = 0;
            for (key in users) {
                total_count++;
            }
            total.innerHTML = total_count;

        }).catch(function(error) {
            console.log('error');
        });
    }

    //post user to db

    function addUser(email, password) {

        var user = {
            name: name || 'default',
            email: email,
            password: password
        };

        axios.post('https://qwertytask3.firebaseio.com/users.json', user).then(function(user) {
            console.log('user was added successfully!');
        }).catch(function(error) {
            console.log(error);
        });
    }

    function toggleModal(isLogedIn) {

        var uid = localStorage.getItem('uid');
        var email = localStorage.getItem('email');

        if (isLogedIn) {

            document.getElementById('welcome').style.display = 'block';
            document.getElementById('overlay').style.display = 'none';

            var user_email = document.getElementById('user');
            var user_uid = document.getElementById('uid');
            var user_email = document.getElementById('user');
            user.innerHTML = email;
            user_uid.innerHTML = uid;

        } else {
            //user is not logged
            console.log('not logged');
            document.getElementById('welcome').style.display = 'none';
            document.getElementById('overlay').style.display = 'block';
        }
    }

    window.onload = function() {
        init();
    }
 