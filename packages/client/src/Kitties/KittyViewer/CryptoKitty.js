import React, { Component } from 'react';
import * as c from './colors';

import { Genes } from './Genes';

const nullSvg = '/cattributes/nullcat.svg';

const styles = {
	fixed: { position: 'absolute', top: 0, left: 0, height: "300px", width: "300px" }
};

export default class CryptoKitty extends Component {

    constructor(props) {
		super(props);
        this.cache = {};
		this.state = {};
	}

	async componentWillMount() {
		const genes = await Genes();
		this.setState({ genes });
	}

	detectKittyColors(svgText) {
		const colors = [null, null, null, null];
		for (const color in c.Primary) {
			if (svgText.indexOf(c.Primary[color]) > -1) {
				colors[0] = color;
			}
		}
		for (const color in c.Secondary) {
			if (svgText.indexOf(c.Secondary[color]) > -1) {
				colors[1] = color;
			}
		}
		for (const color in c.Tertiary) {
			if (svgText.indexOf(c.Tertiary[color]) > -1) {
				colors[2] = color;
			}
		}

		for (const color in c.EyeColor) {
			if (svgText.indexOf(c.EyeColor[color]) > -1) {
				colors[3] = color;
			}
		}

		return colors;
	}

	render() {
        const { genes } = this.state;
        const { body, pattern, mouth, eye, primaryColor, secondaryColor, patternColor, eyeColor } = this.props;

		if (!genes) {
			return (
                <div style={{ position: 'relative', height: '300px', width: '300px', }}>
                    <img style={styles.fixed} src={nullSvg} alt="Null cat" />
                </div>
            );
		}

		let kittyImage = genes[`${body}-${pattern}`] || '';
		let kittyMouth = genes[mouth] || '';
		let kittyEye = genes[eye] || '';

		const bodyColors = this.detectKittyColors(kittyImage);
		const eyeColors = this.detectKittyColors(kittyEye);
		const mouthColors = this.detectKittyColors(kittyMouth);

		if (bodyColors?.[0]) {
			kittyImage = kittyImage.replace(new RegExp(c.Primary[bodyColors[0]], "g"), c.Primary[primaryColor]);
		}

		if (bodyColors?.[1]) {
			kittyImage = kittyImage.replace(new RegExp(c.Secondary[bodyColors[1]], "g"), c.Secondary[secondaryColor]);
		}

		if (eyeColors?.[3]) {
			kittyEye = kittyEye.replace(new RegExp(c.EyeColor[eyeColors[3]], "g"), c.EyeColor[eyeColor]);
		}

		if (bodyColors?.[2]) {
			kittyImage = kittyImage.replace(new RegExp(c.Tertiary[bodyColors[2]], "g"), c.Tertiary[patternColor]);
		}

		if (mouthColors?.[0]) {
			kittyMouth = kittyMouth.replace(new RegExp(c.Primary[mouthColors[0]], "g"), c.Primary[primaryColor]);
		}

		// replace ids in svgs with something more unique
		const idRegex = /id="([^"]*)"/mg;
		const suffix = (Math.random() * 1000).toFixed(0);

		let matches = kittyImage.match(idRegex);
		if (matches) {
			for (let i = 1; i < matches.length; i++) {
				const id = matches[i].replace(idRegex, '$1');

				if (id === 'body') {
					continue;
				}
				kittyImage = kittyImage.replaceAll(new RegExp(`${id}`, 'mg'), `${id}${suffix}`);
			}
		}

		matches = kittyEye.match(idRegex);
		if (matches) {
			for (let i = 1; i < matches.length; i++) {
				const id = matches[i].replace(idRegex, '$1');

				if (id === 'body') {
					continue;
				}
				kittyEye = kittyEye.replaceAll(new RegExp(`${id}`, 'mg'), `${id}${suffix}`);
			}
		}

		matches = kittyMouth.match(idRegex);
		if (matches) {
			for (let i = 1; i < matches.length; i++) {
				const id = matches[i].replace(idRegex, '$1');

				if (id === 'body') {
					continue;
				}
				kittyMouth = kittyMouth.replaceAll(new RegExp(`${id}`, 'mg'), `${id}${suffix}`);
			}
		}

		return (
			<div style={{ position: 'relative', height: '300px', width: '300px', }}>
				{
					(kittyImage === null || kittyMouth === null || kittyEye === null ?
						<div style={{ position: 'absolute'}}>
							<img style={styles.fixed} src={nullSvg} alt="null cat" />
						</div> :
						<div style={{ position: 'absolute'}}>
							<div style={styles.fixed} dangerouslySetInnerHTML={{ __html: kittyImage }}/>
							<div style={styles.fixed} dangerouslySetInnerHTML={{ __html: kittyMouth }}/>
							<div style={styles.fixed} dangerouslySetInnerHTML={{ __html: kittyEye }}/>
						</div> )
				}
			</div>
		);
	}
}
