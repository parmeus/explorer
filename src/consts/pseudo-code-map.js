const PseudoCodeMap = {
    singleMatch: `
        let findSimilarities = await findSimilarities(
            "0xa0BcEeffDf6FA19A5e4Ac5117B97CE180Cd7039a",
            {
                "sort": "desc",
                "count": 20,
                "similarityMatrix": false
            },
            {
                "traits": [
                    "critical_thinking",
                    "curiosity",
                    "fluid_intelligence",
                    "flexibility",
                    "grit",
                    "initiative"
                ]
            }
        );
    `,
    teamMatch: `
        let similarityMatrix = await similarityMatrix(
            [
                "0xa0BcEeffDf6FA19A5e4Ac5117B97CE180Cd7039a",
                "0x625Abfe8dA14930279Dc8B60AcF78bA9551C1895"
            ],
            {
                "traits": [
                    "critical_thinking",
                    "curiosity",
                    "fluid_intelligence",
                    "flexibility",
                    "grit",
                    "initiative"
                ]
            }
        );
    `,
    parmeusIdentity: `
        let parmeusIdentity = await parmeusIdentity(
            "0x625Abfe8dA14930279Dc8B60AcF78bA9551C1895"
        );
    `,
    isHuman: `
        let isHuman = await isHuman(
            "0x625Abfe8dA14930279Dc8B60AcF78bA9551C1895"
        );
    `,
};

export default PseudoCodeMap;
