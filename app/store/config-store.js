import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from "./root-reducer";
import rootWatchers from "./root-saga";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

export default function configureStore() {
    const persistConfig = {
        key: 'root',
        storage,
        whitelist: ['login']
    }
    const sagaMiddleware = createSagaMiddleware()
    const persistedReducer = persistReducer(persistConfig, rootReducer)
 

    const store = createStore(
        persistedReducer,
        applyMiddleware(sagaMiddleware)
    )
    store.runSaga = sagaMiddleware.run(rootWatchers);
    let persistor = persistStore(store)
    return {
        store, 
        persistor 
    }
}