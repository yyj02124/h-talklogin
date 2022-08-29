import create from 'zustand'
import {devtools, persist} from 'zustand/middleware'

interface RootState {
  loginTime:number|null
  setLoginTime:(loginTime:number|null)=>void
}

export const useStore = create<RootState>()(devtools(
  persist(
    (set) => ({
     loginTime:0,
     setLoginTime: (loginTime:number|null)=>set({loginTime})
    }),
  )
))
