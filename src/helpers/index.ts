export * from "./sdkDappHelpers";

export const string2hex = (tmp: string): string => {
	var str = "";
	for (var i = 0; i < tmp.length; i++) {
		str += tmp[i].charCodeAt(0).toString(16);
	}
	return str;
};
