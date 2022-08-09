const stringToColor = (string: string) => {
	let hash: number = 0;
	let i: number;

	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color: string = '#';

	for (i = 0; i < 3; i += 1) {
		const value: number = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}

	return color;
};

const stringAvatar = (name: string) => {
	name = name.toUpperCase();
	return {
		sx: {
			bgcolor: stringToColor(name),
			height: 25,
			width: 25,
		},
		children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
	};
};

export { stringAvatar };