function isSimilar(str1, str2) {
	// console.log(str1, str2);
	if(str1.length != str2.length) {
		return false;
	}
	var length = str1.length;

	for(var i = 0; i < length; i++) {
		for(var j = i+1; j < length; j++) {
			if(
				(
					str1[i] == str1[j]
					&& str2[i] == str2[j]
				) || (
					str1[i] != str1[j]
					&& str2[i] != str2[j]
				)
			) {
				// valid
			} else {
				return false;
			}
		}
	}
	return true;
}


function getSimilarSubstringCount(str, similarTo) {
	var total = 0;
	for(var i = 0; i <= str.length - similarTo.length; i++) {
		var endIndex = i + similarTo.length;
		var s = str.substring(i, endIndex);
		if(isSimilar(s, similarTo)) {
			total += 1
		}
	}
	return total
}


function main() {
	// I had hardcoded input here-----------------------
	var input = `8 4
giggabaj
1 1
1 2
1 3
2 4`;

	console.log("Sample Input:")
	console.log(input);

	var arr = input.split("\n");

	var str = arr[1];

	console.log("Output:");

	for(var i = 2; i < arr.length; i++) {
		var pos = arr[i].split(" ");

		// var similarTo = str.substring(parseInt(pos[0]), parseInt(pos[1])+1);
		var similarTo = str.substring(parseInt(pos[0])-1, parseInt(pos[1]));

		console.log(getSimilarSubstringCount(str, similarTo));
	}
}

main();
