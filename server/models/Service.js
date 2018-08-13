const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Mongoose Schema
const ServiceSchema = new Schema({
    jeansAndKhaki : {
        regularHem : {
            type: String,
            default: 12.95
        },
        originalHem : {
            type: String,
            default: 14.95
        },
        wideHem : {
            type: String,
            default: 14.95
        },
        takeInWaist : {
            type: String,
            default: 14.95
        },
        takeInWaistJean : {
            type: String,
            default: 18.95
        },
        taperLegs : {
            type: String,
            default: 15.95
        },
        takeInCrotch : {
            type: String,
            default: 15.95
        },
    },
    trousers : {
        plainHem : {
            type: String,
            default: 11.95
        },
        hemsWithCuffs : {
            type: String,
            default: 14.95
        },
        hemsWithLining : {
            type: String,
            default: 15.95
        },
        hemsCuffLining : {
            type: String,
            default: 18.95
        },
        hemsWithVents : {
            type: String,
            default: 15.95
        },
        menWaist : {
            type: String,
            default: 12.95
        },
        womenWaist : {
            type: String,
            default: 14.95
        },
        waistWithLining : {
            type: String,
            default: 18.95
        },
        taperLegs : {
            type: String,
            default: 18.95
        },
        taperLegsWithLining : {
            type: String,
            default: 21.95
        },
    },
    shirts : {
        shortenHem : {
            type: String,
            default: 14.95
        },
        shortenHemWithCurve : {
            type: String,
            default: 16.95
        },
        shortenSleeves : {
            type: String,
            default: 14.95
        },
        takeIn : {
            type: String,
            default: 14.95
        },
        withDoubleStitches : {
            type: String,
            default: 16.95
        },
        alterToShortSleeves : {
            type: String,
            default: 11.95
        },
        tShirtShortenHem : {
            type: String,
            default: 12.95
        },
        tShirtShortenSleeves : {
            type: String,
            default: 11.95
        },
    },
    suitsAndSuitJackets : {
        shortenHem : {
            type: String,
            default: 44.95
        },
        shortenSleeves : {
            type: String,
            default: 28.95
        },
        takeInOrOut : {
            type: String,
            default: 26.95
        },
    },
    jackets : {
        shortenSleeves : {
            type: String,
            default: 18.95
        },
        shortenSleevesWithLining : {
            type: String,
            default: 26.95
        },
        shortenHem : {
            type: String,
            default: 22.95
        },
        shortenHemWithLining : {
            type: String,
            default: 28.95
        },
        takeInOrOut : {
            type: String,
            default: 19.95
        },
        takeInOrOutWithLining : {
            type: String,
            default: 26.95
        },
    },
    longCoat : {
        shortenSleeves : {
            type: String,
            default: 18.95
        },
        shortenHem : {
            type: String,
            default: 55.95
        },
        takeInOrOut : {
            type: String,
            default: 45.95
        },
    },
    skirt : {
        shortenHem : {
            type: String,
            default: 18.95
        },
        shortenHemWithLining : {
            type: String,
            default: 23.95
        },
        takeInOrOutWaist : {
            type: String,
            default: 18.95
        },
        takeInOrOutWaistAndLining : {
            type: String,
            default: 22.95
        },
        pleatedSkirtHem : {
            type: String,
            default: 30.95
        },
    },
    gowns : {
        shortenHem : {
            type: String,
            default: 32.95
        }, 
        shortenHemTwoLayers : {
            type: String,
            default: 42.95
        },
        shortenHemThreeLayers : {
            type: String,
            default: 52.95
        },
        shortenHemFourLayers : {
            type: String,
            default: 62.95
        },
        takeInOrOut : {
            type: String,
            default: 25.95
        },
        takeInOrOutWithLining : {
            type: String,
            default: 35.95
        },
        takeInOrOutThreeLayers : {
            type: String,
            default: 40.95
        },
        shortenStraps : {
            type: String,
            default: 21.95
        },
    },
    weddingGowns : {
        shortenHem : {
            type: String,
            default: 45.00
        },  
        takeIn : {
            type: String,
            default: 75.00
        },
        makeBustles : {
            type: String,
            default: 15.00
        }
    },
    dresses : {
        shortenHem : {
            type: String,
            default: 24.95
        },
        shortenHemWithLining : {
            type: String,
            default: 34.95
        },
        takeInOrOut : {
            type: String,
            default: 23.95
        },
        takeInOrOutWaistAndLining : {
            type: String,
            default: 33.95
        },
        shortenStraps : {
            type: String,
            default: 21.95
        },
    },
    zipperReplacement : {
        jeans : {
            type: String,
            default: 14.95
        },
        slacks : {
            type: String,
            default: 14.95
        },
        slacksWithLining : {
            type: String,
            default: 18.95
        },
        skirts : {
            type: String,
            default: 22.95
        },
        DressOrGown : {
            type: String,
            default: 28.95
        },
        winterCoat : {
            type: String,
            default: 45.00
        },
        jacket : {
            type: String,
            default: 45.00
        },
        zipperRepir : {
            type: String,
            default: 8.00
        },
    },
    others : {
        type: String,
    }

});

module.exports = mongoose.model('Service', ServiceSchema);