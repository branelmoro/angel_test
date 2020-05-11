function getSubstringCount(str) {
	var substr = {};
	for(var i = 1; i <= str.length; i++) {
		for(var startIndex = 0; ; startIndex++) {
			var endIndex = i + startIndex;
			var s = str.substring(startIndex, endIndex);
			substr[s] = null;
			if(endIndex >= str.length) {
				break;
			}
		}
	}
	return Object.keys(substr).length;
}

function main() {
	// I had hardcoded input here-----------------------
	var input = `5 5
aabaa
1 1
1 4
1 1
1 4
0 2`;

	console.log("Input:")
	console.log(input);

	var arr = input.split("\n");

	var str = arr[1];

	console.log("Output:");

	for(var i = 2; i < arr.length; i++) {
		var pos = arr[i].split(" ");
		var substr = str.substring(parseInt(pos[0]), parseInt(pos[1])+1);
		console.log(getSubstringCount(substr));
	}

}

main();
