import getBase32Genes from "./getBase32Genes";

const valueToExpression = {
    body: (value) => {
        // TODO use a bitmask to determine the body type
        switch (value) {
            case 9:
                return "cymric";
            case 10:
                return "chartreux";
            case 11:
                return "himalayan";
            case 12:
                return "munchkin";
            case 13:
                return "sphynx";
            case 25: // actually kurilian
            case 14:
                return "ragamuffin";
            case 21:
                return "mainecoon";
            case 22:
                return "laperm";
            default: // using a nice default
                console.log('default body', value);
                return "cymric";
        }
    },
    pattern(value) {
        // TODO use a bitmask to determine the pattern type
        switch (value) {
            case 0b00110:
            case 0b10111:
                return "totesbasic";
            case 8:
                return "calicool";
            case 10: // Actually amur
            case 9:
                return "luckystripe";
            case 11:
                return "jaguar";
            case 12:
                return "spock";
            case 20:
                return "tigerpunk";
            
            default: // Using a nice default
                console.log('default pattern', value);
                return "totesbasic";
        }
    },
    eyeColor(value) {
        // TODO
        /*
        gold
        bubblegum
        limegreen
        chestnut
        */
        switch (value) {
            case 0b00010:
                return "topaz";
            case 0b00110:
                return "chestnut";
            case 0b00011:
                return "mintgreen";
            case 0b00101:
                return "sizzurp";
            case 0b00111:
                return "strawberry";
            default: // Using a nice default
                console.log('default eyeColor', value);
                return "topaz";
        }
    },
    eye(value) {
        // TODO 
        /*
            wingtips
            fabulous
            otaku
            raisedbrow
            simple
            crazy
            googly
        */
        switch (value) {
            case 0b10011:
                return "raisedbrow"; 
            case 0b00110:
                return "crazy";
            case 0b00111:
                return "thicccbrowz";
            default: // Using a nice default
                console.log('default eyes', value);
                return "simple";
        }
    },
    primaryColor(value) {
        // TODO
        /*
            mauveover
            aquamarine
            oldlace
            cottoncandy
        */
        switch (value) {
            case 0b00001:
                return "salmon";
            case 0b00011:
                return "orangesoda";
            case 0b00000:
                return "shadowgrey";
            case 0b1010:
                return "greymatter";
            case 0b10000:
                return "cloudwhite";
            default: // Using a nice default
                console.log('default primary color', value);
                return "cottoncandy";
        }
    },
    patternColor(value) {
        // TODO
        /*
            cerulian
            scarlet
            royalpurple
            lemonade
            chocolate
            royalblue
            wolfgrey
        */
        switch (value) {
            case 0b01000:
                return "swampgreen";
            case 0b10110:
                return "skyblue";
            case 0b01011:
                return "barkbrown";
            case 0b01110:
                return "chocolate";
            case 0b01100:
                return "coffee";
            default: // Using a nice default
                console.log('default pattern color', value);
                return "cottoncandy";
        }
    },
    secondaryColor(value) {
        // TODO
        /*
            peach
            emeraldgreen
            kittencream
        */
        switch (value) {
            case 0b00100:
                return "granitegrey";
            case 0b00110:
                return "kittencream";
            case 0b01011:
            case 0b10011:
                return "bloodred";
            default: // Using a nice default
                console.log('default secondary color', value);
                return "peach";
        }
    },
    mouth(value) {
        // TODO
        /*
            whixtensions
            dali
            saycheese
            
            
            happygokitty
            soserious
            gerbil
        */
        switch (value) {
            case 0b10111:
                return "tongue";
            case 0b01000:
                return "beard";
            case 0b01001:
                return "pouty";
            case 0b01110:
                return "happygokitty";
            case 0b01111:
                return "soserious";
            default: // Using a nice default
                console.log('default mouth', value);
                return "whixtensions";
        }
    },
};

export default function getGeneMapping(geneString) {
    console.log(`------ ${geneString} -----`)
    const base32 = getBase32Genes(geneString);

    const len = 48 - 1;

    const indicies = {
        body: len,
        pattern: len - 4,
        eyeColor: len - 8,
        eye: len - 12,
        primaryColor: len - 16,
        patternColor: len - 20,
        secondaryColor: len - 24,
        // Unknown
        mouth: len - 32,
    };

    const mappedProperties = {};

    Object.entries(indicies).forEach(([type, offset]) => {
        const value = base32.charAt(offset);

        mappedProperties[type] = valueToExpression[type](parseInt(value, 32));
    });

    return mappedProperties;
}