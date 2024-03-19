
window.onload = function() {
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx MouseMove event xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	
	firstSegmentHeight = document.documentElement.clientHeight;
	firstSegmentWidth = document.documentElement.clientWidth;
	
	// assuming all image having same height & width
	image_height = document.getElementById('img1').clientHeight;
	image_width  = document.getElementById('img1').clientWidth;
	
	//allowable movement
	img1_left_right_move_allowable = 10; //max 10px to left / right
	img1_top_down_move_allowable = 10; //max 10px to top / down
	img1_left_right_tile_alllowable = 2; // mas allowable tile is 30deg, left to right
	img1_top_down_tile_alllowable = 2; // mas allowable tile is 30deg, top to down
	img1_window_width_to_left_right_allowable_movement_ratio = firstSegmentWidth/img1_left_right_move_allowable;
	img1_window_height_to_top_down_allowable_movement_ratio = firstSegmentHeight/img1_top_down_move_allowable;
	img1_window_width_to_left_right_allowable_rotate_ratio = firstSegmentWidth/img1_left_right_tile_alllowable;
	img1_window_height_to_top_down_allowable_rotate_ratio = firstSegmentHeight/img1_top_down_tile_alllowable;
	img2_left_right_move_allowable = 20; //max 10px to left / right
	img2_top_down_move_allowable = 20; //max 10px to top / down
	img2_left_right_tile_alllowable = 2; // mas allowable tile is 30deg, left to right
	img2_top_down_tile_alllowable = 2; // mas allowable tile is 30deg, top to down
	img2_window_width_to_left_right_allowable_movement_ratio = firstSegmentWidth/img2_left_right_move_allowable;
	img2_window_height_to_top_down_allowable_movement_ratio = firstSegmentHeight/img2_top_down_move_allowable;
	img2_window_width_to_left_right_allowable_rotate_ratio = firstSegmentWidth/img2_left_right_tile_alllowable;
	img2_window_height_to_top_down_allowable_rotate_ratio = firstSegmentHeight/img2_top_down_tile_alllowable;
	
	// fit image to either max height or width, considering spaces for allowable movement
	image_height_to_width = image_height/image_width;
	windows_height_to_width = firstSegmentHeight/firstSegmentWidth;
	console.log(image_height_to_width);
	console.log(windows_height_to_width);
	console.log(img2_top_down_move_allowable/image_height_to_width);
	console.log( 2*Math.max(img2_left_right_move_allowable,img2_top_down_move_allowable/image_height_to_width));
	if (image_height_to_width >= windows_height_to_width){ // fit to height
		image_height = firstSegmentHeight + 2*Math.max(img2_top_down_move_allowable, img2_left_right_move_allowable*image_height_to_width) ; // Use max to cater for both vertical photo and horizontal
		image_width  = (firstSegmentHeight + 2*Math.max(img2_top_down_move_allowable, img2_left_right_move_allowable*image_height_to_width))/image_height_to_width;
		container_height = firstSegmentHeight + img2_top_down_move_allowable ; // container dimension no need cater max
		container_width  = (firstSegmentHeight + img2_top_down_move_allowable)/image_height_to_width;
	}
	else{ // fit to width
		image_height = (firstSegmentWidth + 2*Math.max(img2_left_right_move_allowable,img2_top_down_move_allowable/image_height_to_width))*image_height_to_width;
		image_width  = firstSegmentWidth + 2*Math.max(img2_left_right_move_allowable,img2_top_down_move_allowable/image_height_to_width);
		container_height = (firstSegmentWidth + img2_left_right_move_allowable)*image_height_to_width;
		container_width  = firstSegmentWidth + img2_left_right_move_allowable;
	}
	document.querySelector(".circle").style.setProperty('width', container_width +"px");
	document.querySelector(".circle").style.setProperty('height', container_height +"px");
	document.querySelector(".img1").style.setProperty('width', image_width +"px");
	document.querySelector(".img1").style.setProperty('height', image_height +"px");
	document.querySelector(".img2").style.setProperty('width', image_width +"px");
	document.querySelector(".img2").style.setProperty('height', image_height +"px");
	
	//initially set image to center of page
	document.querySelector(".circle").style.setProperty('top', (firstSegmentHeight-image_height)/2 + img2_top_down_move_allowable +"px");
	document.querySelector(".circle").style.setProperty('left', (firstSegmentWidth-image_width)/2 + img2_left_right_move_allowable +"px");

	
	document.addEventListener('mousemove', function() {
		// document.getElementById("headerWord1").innerHTML = rect.top +" " + event.pageY;
		// document.getElementById("sub").innerHTML = event.pageY;
		xMousePos=event.pageX;
		yMousePos=event.pageY;
		//ori_scrolling_position=document.documentElement.scrollTop;

		xMousePos_from_center = xMousePos - (firstSegmentWidth/2);
		yMousePos_from_center = yMousePos - (firstSegmentHeight/2);

		document.querySelector(".img1").style.setProperty('left', (xMousePos_from_center/img1_window_width_to_left_right_allowable_movement_ratio) +"px");
		document.querySelector(".img1").style.setProperty('top', (yMousePos_from_center/img1_window_height_to_top_down_allowable_movement_ratio) +"px");
		document.querySelector(".img1").style.setProperty('transform', "rotateY(" + (xMousePos_from_center/img1_window_width_to_left_right_allowable_rotate_ratio) +"deg) rotateX(" + (-yMousePos_from_center/img1_window_height_to_top_down_allowable_rotate_ratio) + "deg)");
		document.querySelector(".img2").style.setProperty('left', (xMousePos_from_center/img2_window_width_to_left_right_allowable_movement_ratio) +"px");
		document.querySelector(".img2").style.setProperty('top', (yMousePos_from_center/img2_window_height_to_top_down_allowable_movement_ratio) +"px");
		document.querySelector(".img2").style.setProperty('transform', "rotateY(" + (xMousePos_from_center/img2_window_width_to_left_right_allowable_rotate_ratio) +"deg) rotateX(" + (-yMousePos_from_center/img2_window_height_to_top_down_allowable_rotate_ratio) + "deg)");
		

		//console.log(xMousePos_from_center); //left right
		//console.log(yMousePos_from_center); //up down
		
		console.log((yMousePos_from_center/img1_window_height_to_top_down_allowable_rotate_ratio));

	});
	
	window.addEventListener("resize", function(){
		
		firstSegmentHeight = document.documentElement.clientHeight;
		firstSegmentWidth = document.documentElement.clientWidth;
		
		// assuming all image having same height & width
		image_height = document.getElementById('img1').clientHeight;
		image_width  = document.getElementById('img1').clientWidth;
		
		//allowable movement
		img1_left_right_move_allowable = 10; //max 10px to left / right
		img1_top_down_move_allowable = 10; //max 10px to top / down
		img1_left_right_tile_alllowable = 2; // mas allowable tile is 30deg, left to right
		img1_top_down_tile_alllowable = 2; // mas allowable tile is 30deg, top to down
		img1_window_width_to_left_right_allowable_movement_ratio = firstSegmentWidth/img1_left_right_move_allowable;
		img1_window_height_to_top_down_allowable_movement_ratio = firstSegmentHeight/img1_top_down_move_allowable;
		img1_window_width_to_left_right_allowable_rotate_ratio = firstSegmentWidth/img1_left_right_tile_alllowable;
		img1_window_height_to_top_down_allowable_rotate_ratio = firstSegmentHeight/img1_top_down_tile_alllowable;
		img2_left_right_move_allowable = 20; //max 10px to left / right
		img2_top_down_move_allowable = 20; //max 10px to top / down
		img2_left_right_tile_alllowable = 2; // mas allowable tile is 30deg, left to right
		img2_top_down_tile_alllowable = 2; // mas allowable tile is 30deg, top to down
		img2_window_width_to_left_right_allowable_movement_ratio = firstSegmentWidth/img2_left_right_move_allowable;
		img2_window_height_to_top_down_allowable_movement_ratio = firstSegmentHeight/img2_top_down_move_allowable;
		img2_window_width_to_left_right_allowable_rotate_ratio = firstSegmentWidth/img2_left_right_tile_alllowable;
		img2_window_height_to_top_down_allowable_rotate_ratio = firstSegmentHeight/img2_top_down_tile_alllowable;
		
		// fit image to either max height or width, considering spaces for allowable movement
		image_height_to_width = image_height/image_width;
		windows_height_to_width = firstSegmentHeight/firstSegmentWidth;
		console.log(image_height_to_width);
		console.log(windows_height_to_width);
		console.log(img2_top_down_move_allowable/image_height_to_width);
		console.log( 2*Math.max(img2_left_right_move_allowable,img2_top_down_move_allowable/image_height_to_width));
		if (image_height_to_width >= windows_height_to_width){ // fit to height
			image_height = firstSegmentHeight + 2*Math.max(img2_top_down_move_allowable, img2_left_right_move_allowable*image_height_to_width) ; // Use max to cater for both vertical photo and horizontal
			image_width  = (firstSegmentHeight + 2*Math.max(img2_top_down_move_allowable, img2_left_right_move_allowable*image_height_to_width))/image_height_to_width;
			container_height = firstSegmentHeight + img2_top_down_move_allowable ; // container dimension no need cater max
			container_width  = (firstSegmentHeight + img2_top_down_move_allowable)/image_height_to_width;
		}
		else{ // fit to width
			image_height = (firstSegmentWidth + 2*Math.max(img2_left_right_move_allowable,img2_top_down_move_allowable/image_height_to_width))*image_height_to_width;
			image_width  = firstSegmentWidth + 2*Math.max(img2_left_right_move_allowable,img2_top_down_move_allowable/image_height_to_width);
			container_height = (firstSegmentWidth + img2_left_right_move_allowable)*image_height_to_width;
			container_width  = firstSegmentWidth + img2_left_right_move_allowable;
		}
		document.querySelector(".circle").style.setProperty('width', container_width +"px");
		document.querySelector(".circle").style.setProperty('height', container_height +"px");
		document.querySelector(".img1").style.setProperty('width', image_width +"px");
		document.querySelector(".img1").style.setProperty('height', image_height +"px");
		document.querySelector(".img2").style.setProperty('width', image_width +"px");
		document.querySelector(".img2").style.setProperty('height', image_height +"px");
		
		//initially set image to center of page
		document.querySelector(".circle").style.setProperty('top', (firstSegmentHeight-image_height)/2 + img2_top_down_move_allowable +"px");
		document.querySelector(".circle").style.setProperty('left', (firstSegmentWidth-image_width)/2 + img2_left_right_move_allowable +"px");

	});
	
	window.addEventListener('deviceorientation', handleOrientation);

	function handleOrientation(event) {
	  alpha = event.alpha;
	  beta = event.beta;
	  gamma = event.gamma;
	  // Do stuff...
	  
	  document.getElementById("word1").innerHTML = 'alpha = ' + alpha + ', beta = ' + beta + ', gamma = '+gamma;
	}
	
}