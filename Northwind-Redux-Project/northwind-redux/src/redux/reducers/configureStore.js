import {createStore,applyMiddleware} from "redux"
import reducers from "./index"
import thunk from "redux-thunk"
export default function configureStore () {
    return createStore(reducers,applyMiddleware(thunk) ) 
}


//Redux-Thunk dediğimiz olay iki reducers arasındaki olayları aracılık ederek çalışmasını sağlayan yapıdır. Bir kere buraya yazarız sonrasında devam olarak kendi çalışmaya devam eder.

