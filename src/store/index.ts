import { defineStore } from 'pinia'

interface MainState {
    title: string,
}


export const useMainStore = defineStore('system', {
    state: (): MainState => ({
        title: '风是你',
    }),
    actions: {
    },
    getters: {
        
    },
})

export default useMainStore;
