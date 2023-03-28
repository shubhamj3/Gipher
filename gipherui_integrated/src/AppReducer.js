const initialState ={
    isLoggedIn:false,
    render:true,
    loading:false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'LogInStatus': {
            console.log('reducer '+action.value.isLoggedIn);
            return {
                ...state,
                isLoggedIn:action.value.isLoggedIn
            };
        }

        case "RenderStatus": {
          return {
            ...state,
            render: action.value.render
          };
        }
    
        case "LoadingStatus": {
          return {
            ...state,
            loading: action.value.loading
          };
        }
       
        default: {
            return state;
        }
    }
}

export { initialState };
export default reducer;