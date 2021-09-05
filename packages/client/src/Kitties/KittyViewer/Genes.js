export const BodyType = {
	mainecoon: 'mainecoon',
	cymric: 'cymric',
	laperm: 'laperm',
	munchkin: 'munchkin',
	sphynx: 'sphynx',
	ragamuffin: 'ragamuffin',
	himalayan: 'himalayan',
	chartreux: 'chartreux',
}

export const PatternType = {
	spock: 'spock',
	tigerpunk: 'tigerpunk',
	calicool: 'calicool',
	luckystripe: 'luckystripe',
	jaguar: 'jaguar',
	totesbasic: 'totesbasic',
}

export const MouthType = {
	whixtensions: 'whixtensions',
	dali: 'dali',
	saycheese: 'saycheese',
	beard: 'beard',
	tongue: 'tongue',
	happygokitty: 'happygokitty',
	pouty: 'pouty',
	soserious: 'soserious',
	gerbil: 'gerbil'
}

export const EyeType = {
	wingtips: 'wingtips',
	fabulous: 'fabulous',
	otaku: 'otaku',
	raisedbrow: 'raisedbrow',
	simple: 'simple',
	crazy: 'crazy',
	thicccbrowz: 'thicccbrowz',
	googly: 'googly',
}

let map = null;
let initialized = false;

export const Genes = async () => {
	if (initialized === true) {
		return map;
	}
	map = {};
	for (const b in BodyType) {
		for (const p in PatternType) {
			const svg = await fetch(`/cattributes/body/${b}-${p}.svg`);
			map[`${b}-${p}`] = await svg.text();
		}
	}

	for (const et in EyeType) {
		const svg = await fetch(`/cattributes/eye/${et}.svg`);
		map[`${et}`] = await svg.text();
	}

	for (const mt in MouthType) {
		const svg = await fetch(`/cattributes/mouth/${mt}.svg`);
		map[`${mt}`] = await svg.text();
	}
	initialized = true;
	return map;
};
