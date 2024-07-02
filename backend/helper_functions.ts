

// This converts numbers to special notations.
// For example:
// - 1000 -> 1.0K
// 1982 -> 1.9K
export function number_as_letters(i: number){
	var generated_number:string = i.toString();
	if(i.toString().length > 3){
		generated_number = (i / 1000).toString().slice(0,3) + "K";
	}
	return generated_number;
}
