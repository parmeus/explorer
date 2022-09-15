const PseudoCodeMap = {
    singleMatch: {
        api: `
POST /api/1/recommendation/similarities HTTP/1.1

Content-Type: application/json

{
    "digitalSelf": {
        "address": "0x80567F7200fd57f7FDb1DBe39960B600dC9B6d2B"
    },
    "filter": {
        "traits": [
            "critical_thinking",
            "curiosity",
            "fluid_intelligence",
            "flexibility",
            "grit",
            "initiative"
        ]
    },
    "options": {
        "sort": "desc",
        "count": 20,
        "similarityMatrix": false
    }
}
        `,
        js: `
let findSimilarities = await findSimilarities(
    "0x80567F7200fd57f7FDb1DBe39960B600dC9B6d2B",
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
        `
    },


    teamMatch: {
        api: `
POST /api/1/recommendation/similarityMatrix HTTP/1.1

Content-Type: application/json

{
    "digitalSelves": [
        {
            "address": "0x80567F7200fd57f7FDb1DBe39960B600dC9B6d2B"
        },
        {
            "address": "0x18c081B0ed72bd5D11192Ff7584214dAB265d218"
        },
        {
            "address": "0x048d73b36921321878c7fd9d8d2c2c69857b6784"
        },
        {
            "address": "0x27103c2e31b51cd8a8d0c09415c10016e81ed963"
        },
        {
            "address": "0x01e4fbb2cea00da319f786525c5f568e41e688e7"
        },
        {
            "address": "0xc359ee496265231e9f38359fe1fc3a7b0bc857df"
        },
        {
            "address": "0x3d005090005723e2f8391ada83d77da0d9700783"
        },
        {
            "address": "0x807b3cf6a5110d55b4664cfc65282ecc55e9cdea"
        }
    ],
    "filter": {
        "traits": [
            "critical_thinking",
            "curiosity",
            "fluid_intelligence",
            "flexibility",
            "grit",
            "initiative"
        ]
    },
    "options": {}
}
        `,
        js: `
let similarityMatrix = await similarityMatrix(
    [
        "0x80567F7200fd57f7FDb1DBe39960B600dC9B6d2B",
        "0x18c081B0ed72bd5D11192Ff7584214dAB265d218",
        "0x048d73b36921321878c7fd9d8d2c2c69857b6784",
        "0x27103c2e31b51cd8a8d0c09415c10016e81ed963",
        "0x01e4fbb2cea00da319f786525c5f568e41e688e7",
        "0xc359ee496265231e9f38359fe1fc3a7b0bc857df",
        "0x3d005090005723e2f8391ada83d77da0d9700783",
        "0x807b3cf6a5110d55b4664cfc65282ecc55e9cdea"
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
        `
    },


    parmeusIdentity: {
        api: `
GET /api/1/identity/addresses/0x80567F7200fd57f7FDb1DBe39960B600dC9B6d2B HTTP/1.1

        `,
        js: `
let parmeusIdentity = await parmeusIdentity(
    "0x80567F7200fd57f7FDb1DBe39960B600dC9B6d2B"
);
        `
    } ,
    isHuman: {
        api: `
GET /api/1/identity/addresses/0x80567F7200fd57f7FDb1DBe39960B600dC9B6d2B/psbts/humanity HTTP/1.1
        `,
        js: `
let isHuman = await isHuman(
    "0x80567F7200fd57f7FDb1DBe39960B600dC9B6d2B"
);
        `
    },
};

export default PseudoCodeMap;
