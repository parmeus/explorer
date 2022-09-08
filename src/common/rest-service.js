import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_PREFIX;

class RestService {
    static SingleMatch = (address, traits = []) => {
        return axios.post("/api/1/recommendation/similarities", {
            digitalSelf: {
                address: address,
            },
            filter: {
                traits: traits.map(t => t.trim()),
            },
            options: {
                sort: "desc",
                count: 20,
                similarityMatrix: false,
            },
        });
    };

    static TeamMatch = (addresses, traits = []) => {
        return axios.post("/api/1/recommendation/similarityMatrix", {
            digitalSelves: addresses?.split(";").map(addr => {
                return { address: addr.trim() };
            }),
            filter: {
                traits: traits.map(t => t.trim()),
            },
            options: {},
        });
    };

    static parmeusIdentity = address => {
        return axios.get(`/api/1/identity/addresses/${address}`);
    };

    static isHuman = address => {
        return axios.get(`/api/1/identity/addresses/${address}/psbts/humanity`);
    };

    static decryptAddress = address => {
        return axios.post("/api/1/debug/identity/decryptAddress", { cryptedAddress: address });
    };
}

export default RestService;
