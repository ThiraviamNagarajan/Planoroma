import axios from 'axios';

export function saga (){
    yield takeEvery( "FETCH_MOVIES", fetchMovies)
}

export async function* fetchMovies(){
   

    const options = {
      method: 'GET',
      url: 'https://movies-api14.p.rapidapi.com/shows',
      headers: {
        'x-rapidapi-key': '4ddb078362msh87003a644ab4a8cp1c4d3fjsned104496e064',
        'x-rapidapi-host': 'movies-api14.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        yield put({ type: "SET_MOVIES", payload: response});
    } catch (error) {
        yield put({ type: "SET_ERROR", payload: error.message});
        console.error(error);
    }
}