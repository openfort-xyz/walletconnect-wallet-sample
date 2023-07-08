import {BigNumberish, ethers} from "ethers";

export const ENTRYPOINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
export const VERIFYINGPAYMASTER_ADDRESS = "0xF26ACbbf356Fb561b64B29aae887FFDb1dD19802";

export const ERC721_ABI = [
    "function transferFrom(address from, address to, uint256 tokenId) external",
    "function safeTransferFrom(address from, address to, uint256 tokenId) external",
    "function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata _data) external",
    "function balanceOf(address owner) external view returns (uint256 balance)",
];

export const ERC20_ABI = [
    "function transfer(address to, uint256 value) external returns (bool)",
    "function transferFrom(address from, address to, uint256 value) external returns (bool)",
    "function approve(address spender, uint256 value) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    "function balanceOf(address owner) external view returns (uint256)",
];

export const ERC1155_ABI = [
    "function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes calldata data) external",
    "function safeBatchTransferFrom(address from, address to, uint256[] calldata ids, uint256[] calldata amounts, bytes calldata data) external",
    "function balanceOf(address account, uint256 id) external view returns (uint256)",
    "function balanceOfBatch(address[] calldata accounts, uint256[] calldata ids) external view returns (uint256[] memory)",
];

export const BUNDLER_URLS: {[key: number]: any} = {
    80001: "...MUMBAI_BUNDLER..." // Put your Mumbai bundler URL here
};

export const MOCK_VALID_UNTIL = "0x00000000deadbeef";
export const MOCK_VALID_AFTER = "0x0000000000001234";

export const UPGRADEABLE_ACCOUNT_FACTORY_ADDRESS = "0x2dEf63aaCab2C2b2985692452be9B567bA5aEd41";

export const UPDATE_SINGLETON_ADDRESS = "0x3d4d0cab438cee791b7405cf10448daaa98087c0";

export enum ChainId {
    // Mainnet = 1,
    // Goerli = 5,
    // Polygon = 137,
    Mumbai = 80001,
    // Localhost = 1337,
    // Hardhat = 31337,
    // Fantom = 250,
    // FantomTestnet = 4002,
    // Avalanche = 43114,
    // AvalancheFujiTestnet = 43113,
    // Optimism = 10,
    // OptimismGoerli = 420,
    // Arbitrum = 42161,
    // ArbitrumGoerli = 421613,
    // BinanceSmartChainMainnet = 56,
    // BinanceSmartChainTestnet = 97,
}

export const SupportedNetworkToChainIdMap = [
    // ChainId.Goerli,
    ChainId.Mumbai,
    // ChainId.BinanceSmartChainTestnet,
    // ChainId.AvalancheFujiTestnet,
    // ChainId.ArbitrumGoerli,
];

export const VerificationStatus = {
    FAILED: "Fail - Unable to verify",
    SUCCESS: "Pass - Verified",
    PENDING: "Pending in queue",
    ALREADY_VERIFIED: "Contract source code already verified",
    AUTOMATICALLY_VERIFIED: "Already Verified",
};

export const USDC_ADDRESS: {[key: number]: string} = {
    1: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    // 5: '0x2f3A40A3db8a7e3D09B0adfEfbCe4f6F81927557',
    137: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    // 80001: '',
    // 420: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    42161: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    // 421613: '',
    43114: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    // 43113: '',
    // 56: '',
    // 97: ''
};

export const blockExplorerMap: Record<number, {name: string; url: string}> = {
    1: {name: "Etherscan", url: "https://etherscan.io/"},
    3: {name: "Ropsten Etherscan", url: "https://ropsten.etherscan.io/"},
    5: {name: "Goerli Etherscan", url: "https://goerli.etherscan.io/"},
    10: {
        name: "Optimism Etherscan",
        url: "https://optimistic.etherscan.io/",
    },
    42: {name: "Kovan Etherscan", url: "https://kovan.etherscan.io/"},
    56: {name: "Bscscan", url: "https://bscscan.com/"},
    420: {
        name: "Optimism Goerli Etherscan",
        url: "https://goerli-optimistic.etherscan.io/",
    },
    97: {name: "Bscscan Testnet", url: "https://testnet.bscscan.com/"},
    137: {name: "Polygonscan", url: "https://polygonscan.com/"},
    250: {name: "FTMScan", url: "https://ftmscan.com/"},
    4002: {name: "FTMScan Testnet", url: "https://testnet.ftmscan.com/"},
    42161: {name: "Arbiscan", url: "https://arbiscan.io/"},
    43113: {name: "Snowtrace Testnet", url: "https://testnet.snowtrace.io/"},
    43114: {name: "Snowtrace", url: "https://snowtrace.io/"},
    421613: {
        name: "Arbiscan Goerli",
        url: "https://goerli-rollup-explorer.arbitrum.io/",
    },
    80001: {
        name: "Mumbai Polygonscan",
        url: "https://mumbai.polygonscan.com/",
    },
};

export const apiKeyMap: Record<number, string> = {
    // [ChainId.Mainnet]: process.env.ETHERSCAN_KEY as string,
    // [ChainId.Goerli]: process.env.ETHERSCAN_KEY as string,
    // [ChainId.Polygon]: process.env.POLYGONSCAN_KEY as string,
    [ChainId.Mumbai]: process.env.POLYGONSCAN_KEY as string,
    // [ChainId.Fantom]: process.env.FANTOMSCAN_KEY as string,
    // [ChainId.FantomTestnet]: process.env.FANTOMSCAN_KEY as string,
    // [ChainId.Avalanche]: process.env.SNOWTRACE_KEY as string,
    // [ChainId.AvalancheFujiTestnet]: process.env.SNOWTRACE_KEY as string,
    // [ChainId.Arbitrum]: process.env.ARBITRUMSCAN_KEY as string,
    // [ChainId.ArbitrumGoerli]: process.env.ARBITRUMSCAN_KEY as string,
    // [ChainId.Optimism]: process.env.OPTIMISMSCAN_KEY as string,
    // [ChainId.OptimismGoerli]: process.env.OPTIMISMSCAN_KEY as string,
    // [ChainId.BinanceSmartChainMainnet]: process.env.BSCSCAN_KEY as string,
    // [ChainId.BinanceSmartChainTestnet]: process.env.BSCSCAN_KEY as string,
};

export const apiMap: Record<number, string> = {
    1: "https://api.etherscan.io/api",
    3: "https://api-ropsten.etherscan.io/api",
    5: "https://api-goerli.etherscan.io/api",
    10: "https://api-optimistic.etherscan.io/api",
    25: "https://api.cronoscan.com/api",
    42: "https://api-kovan.etherscan.io/api",
    56: "https://api.bscscan.com/api",
    97: "https://api-testnet.bscscan.com/api",
    128: "https://api.hecoinfo.com/api",
    137: "https://api.polygonscan.com/api",
    199: "https://api.bttcscan.com/api",
    250: "https://api.ftmscan.com/api",
    256: "https://api-testnet.hecoinfo.com/api",
    420: "https://api-goerli-optimistic.etherscan.io/api",
    1029: "https://api-testnet.bttcscan.com/api",
    1284: "https://api-moonbeam.moonscan.io/api",
    1285: "https://api-moonriver.moonscan.io/api",
    1287: "https://api-moonbase.moonscan.io/api",
    4002: "https://api-testnet.ftmscan.com/api",
    42161: "https://api.arbiscan.io/api",
    43113: "https://api-testnet.snowtrace.io/api",
    43114: "https://api.snowtrace.io/api",
    421613: "https://api-goerli.arbiscan.io/api",
    80001: "https://api-testnet.polygonscan.com/api",
    1313161554: "https://api.aurorascan.dev/api",
    1313161555: "https://api-testnet.aurorascan.dev/api",
};

export const ERC20_APPROVAL_AMOUNT: {[key: string]: BigNumberish} = {
    // ETH
    [USDC_ADDRESS[1]]: ethers.utils.parseUnits("100"),

    // Goerli
    [USDC_ADDRESS[5]]: ethers.utils.parseUnits("100"),

    // Polygon
    [USDC_ADDRESS[137]]: ethers.utils.parseUnits("10"),

    // Arbitrum
    [USDC_ADDRESS[42161]]: ethers.utils.parseUnits("10"),

    // Avalanche
    [USDC_ADDRESS[43114]]: ethers.utils.parseUnits("10"),

    "0x7eF8059DB4d9696b261714989f05bf68173De1F0": ethers.utils.parseUnits("10", 18),
};

export const defaultOptions = {
    mode: "http",
    thirdwebApiKey: process.env.THIRDWEB_KEY,
    alchemyApiKey: process.env.ALCHEMY_KEY,
    infuraApiKey: process.env.INFURA_KEY,
} as const;
