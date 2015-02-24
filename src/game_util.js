var getPointByLine=function(line){
	if(line==1){
		return 100;
	}if(line==2){
		return 255;
	}if(line==3){
		return 410;
	}
	return 0;
}
var getSpeedByLine=function(speed,line){
	if(line==1){
		return speed-30;
	}if(line==2){
		return speed-20;
	}if(line==3){
		return speed-10;
	}
	return speed;
}
var getLineByPoint=function(point){
	if(point<255){
		return 1;
	}else if(point<410){
		return 2;
	}else{
		return 3;
	}
}