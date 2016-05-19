var map = {}
map["1"] = 1;
map["2"] = 2;
map["3"] = 3;
map["4"] = 4;
map["5"] = 5;

for(key in map){
	console.log(map[key]);
}

delete map["3"];

for(key in map){
	console.log(map[key]);
}