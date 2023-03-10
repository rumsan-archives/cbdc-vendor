import AppReducer from '../../src/reducers/appReducer';
import APP_ACTIONS from '../../src/actions/appActions';
import 'regenerator-runtime/runtime';
import { getDefaultNetwork } from '../../src/constants/networks';
import { ethers } from 'ethers';
const initialState = {
	address: null,
	agency: null,
	network: null,
	wallet: null,
	profile: null,
	hasWallet: true,
	tokenBalance: 0,
	scannedEthAddress: '',
	scannedAmount: null
};

const data = {
	address: '0x189E22f7Abd56c46C7e00C01d08f1Da413778A7d',
	agency: {
		api: 'https://agency-nft.rahat.io/api/v1',
		address: '0xeddA7538FB64f60589605AFeFC90c510d2cAfA18',
		adminAddress: '0x9e38B973887aE2803e1Cc7bdeAe30F423eE3DBe7',
		network: 'https://testnetwork.esatya.io',
		tokenAddress: '0x04BD44185a2B38448c1d60a9fD7252228cFB4f75',
		nftAddress: '0x0Ac5a729E7085416184d5f8f912D9AFE30b10235',
		name: 'eSatya',
		email: 'esatya@gmail.com',
		isApproved: true
	},
	network: null,
	wallet: null,
	profile: null,
	hasWallet: true,
	tokenBalance: 0,
	scannedEthAddress: '',
	scannedAmount: null
};

describe('App Reducer Test', () => {
	it('Initializes Application', () => {
		const network = getDefaultNetwork();
		const state = initialState;
		const action = {
			type: APP_ACTIONS.INIT_APP,
			data: {
				...state,
				address: data.address,
				network: network,
				hasWallet: data.hasWallet,
				balance: data.tokenBalance,
				agency: data.agency
			}
		};

		const newState = AppReducer(state, action);
		expect(newState).toMatchObject({ ...data, network });
	});

	it('Sets Agency', () => {
		const state = initialState;
		const action = {
			type: APP_ACTIONS.SET_AGENCY,
			data: data.agency
		};

		const newState = AppReducer(state, action);
		expect(newState).toMatchObject({
			...state,
			agency: action.data
		});
	});
	it('Sets Network', () => {
		const state = initialState;
		const network = getDefaultNetwork();
		const action = {
			type: APP_ACTIONS.SET_NETWORK,
			data: network
		};

		const newState = AppReducer(state, action);
		expect(newState).toMatchObject({
			...state,
			network: action.data
		});
	});
	it('Sets Wallet', () => {
		const state = initialState;
		const wallet = ethers.Wallet.createRandom();
		const action = {
			type: APP_ACTIONS.SET_WALLET,
			data: wallet
		};

		const newState = AppReducer(state, action);
		expect(newState).toMatchObject({
			...state,
			wallet
		});
	});
	it('Sets Has Wallet', () => {
		const state = initialState;

		const action = {
			type: APP_ACTIONS.SET_HASWALLET,
			data: true
		};

		const newState = AppReducer(state, action);
		expect(newState).toMatchObject({
			...state,
			hasWallet: action.data
		});
	});
	it('Sets Balance', () => {
		const state = initialState;

		let action = {
			type: APP_ACTIONS.SET_BALANCE,
			data: 12
		};

		let newState = AppReducer(state, action);
		expect(newState).toMatchObject({
			...state,
			tokenBalance: action.data
		});

		action.data = null;
		newState = AppReducer(state, action);
		expect(newState).toMatchObject({
			...state,
			tokenBalance: 0
		});
	});
	it('Sets Recent transaction', () => {
		const state = initialState;

		let action = {
			type: APP_ACTIONS.ADD_RECENT_TX,
			data: [
				{
					amount: '1',
					from: '0x189E22f7Abd56c46C7e00C01d08f1Da413778A7d',
					hash: 'nft1637911105893',
					status: 'failed',
					timestamp: 1637911105893,
					to: '2222',
					type: 'nftRecieved'
				},
				{
					amount: '2',
					from: '0x189E22f7Abd56c46C7e00C01d08f1Da413778A73',
					hash: 'nft1637911105894',
					status: 'failed',
					timestamp: 1637911105894,
					to: '2222',
					type: 'nftRecieved'
				}
			]
		};

		let newState = AppReducer(state, action);
		expect(newState).toMatchObject({
			...state,
			recentTx: action.data
		});

		action.data = null;
		newState = AppReducer(state, action);
		expect(newState).toMatchObject({
			...state,
			recentTx: []
		});
	});
	it('Sets Scanned Data', () => {
		const state = initialState;

		let action = {
			type: APP_ACTIONS.SET_SCANNED_DATA,
			data: {
				address: 'adress123',
				amount: 12
			}
		};

		let newState = AppReducer(state, action);
		expect(newState).toMatchObject({
			...state,
			scannedEthAddress: action.data.address,
			scannedAmount: action.data.amount
		});

		action.data.amount = null;
		newState = AppReducer(state, action);
		expect(newState).toMatchObject({
			...state,
			scannedEthAddress: action.data.address,
			scannedAmount: action.data.amount
		});
	});
	it('Sets Sending Token Name', () => {
		const state = initialState;

		const action = {
			type: APP_ACTIONS.SET_SENDING_TOKEN_NAME,
			data: 'ETH'
		};

		const newState = AppReducer(state, action);
		expect(newState).toMatchObject({
			...state,
			sendingTokenName: action.data
		});
	});
	it('Handles default ', () => {
		const state = initialState;
		const action = {
			type: ''
		};
		const newState = AppReducer(state, action);
		expect(newState).toMatchObject(state);
	});
});
