import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentListItem: null,
        listItems : localStorage.getItem('listItems') ? localStorage.getItem('listItems').split(',') : ['https://www.youtube.com/watch?v=fbJQY5Yxo5s']
    },

    mutations: {
        addNewItem (state, value) {
            if (state.listItems.indexOf(value) === -1) {
                state.listItems.push(value);
                localStorage.setItem('listItems', state.listItems)
            }
        },

        deleteListItem (state, value) {
            state.listItems = state.listItems.filter((videoItem) => videoItem !== value )
            localStorage.setItem('listItems', state.listItems)
        },

        setCurrentItem (state, value) {
            state.currentListItem = value
        }
    },

    getters: {
        getCurrentItem: state => {
            return state.currentListItem
        },

        getNextItem: state => {
            let nextIndex

            if (state.currentListItem) {
                let currentIndex = state.listItems.indexOf(state.currentListItem)
                nextIndex = currentIndex + 1

                //check if index is last - then repeat playing from first video
                nextIndex === state.listItems.length ? nextIndex = 0 : nextIndex
            } 
            else nextIndex = 0
        
            return state.listItems[nextIndex]
        }
    }
})