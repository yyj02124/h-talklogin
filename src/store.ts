import create from 'zustand'
import {devtools, persist} from 'zustand/middleware'

interface RootState {
  certId:string|null
  setCertId:(certId:string|null)=>void
}

export const useStore = create<RootState>()(devtools(
  persist(
    (set) => ({
     certId:'',
     setCertId: (certId:string|null)=>set({certId})
    }),
    {
      name: 'app-storage',
      getStorage: () => localStorage,
    }
  )
))
