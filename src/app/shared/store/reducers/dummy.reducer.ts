import { Action } from '@ngrx/store';
import * as dummyActions from '../actions/dummy.actions';

export interface DummyState {
	dummyEmployees: {
		loading: boolean;
		loaded: boolean;
		failed: boolean;
		response: object;
	};
}

export const initialState: DummyState = {
	dummyEmployees: {
		loading: false,
		loaded: false,
		failed: false,
		response: undefined,
	},
};

export function reducer(state = initialState, action: Action): DummyState {
	switch (action.type) {
		case dummyActions.DummyActionTypes.LoadDummyData: {
			return {
				...state,
				dummyEmployees: {
					...state.dummyEmployees,
					loading: true,
				},
			};
		}

		case dummyActions.DummyActionTypes.DummyDataSuccess: {
			return handleDummyDataSuccess(
				state,
				action as dummyActions.DummyDataSuccess
			);
		}

		case dummyActions.DummyActionTypes.DummyDataFail: {
			return {
				...state,
				dummyEmployees: {
					...state.dummyEmployees,
					loading: false,
					failed: true,
				},
			};
		}

		default:
			return state;
	}
}

function handleDummyDataSuccess(
	state: DummyState,
	action: dummyActions.DummyDataSuccess
): DummyState {
	return {
		...state,
		dummyEmployees: {
			...state.dummyEmployees,
			loaded: true,
			response: action.payload,
		},
	};
}

/**
 * This function gets Dummy API response from module state
 * @param state Dummy State
 * @returns response state
 */
export const dummyEmployeesSuccess = (state: DummyState) =>
	state.dummyEmployees.response;

/**
 * This function gets Dummy Employees API failed response
 * @param state Dummy State
 * @returns failed response
 */
export const dummyEmployeesFailed = (state: DummyState) =>
	state.dummyEmployees.failed;
