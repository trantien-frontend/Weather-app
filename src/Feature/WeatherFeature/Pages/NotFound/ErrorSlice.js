import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	errorMessage: '',
};

const errorSlice = createSlice({
	name: 'notFound',
	initialState,

	reducers: {
		handleErrorsApis(state, action) {
			state.errorMessage = action.payload;
		},
	},
});

const { reducer, actions } = errorSlice;
export const { handleErrorsApis } = actions;
export default reducer;
