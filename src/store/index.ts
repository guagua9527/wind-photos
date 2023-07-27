import { defineStore } from 'pinia'

interface MainState {
    title: string,
    headerHeight: number,
}


export const useMainStore = defineStore('main', {
    state: (): MainState => ({
        title: '风是你',
        headerHeight: 150
    }),
    actions: {
    },
    getters: {
        
    },
})

export default useMainStore;
