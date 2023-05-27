import { createContext, useState } from "react";
import { User } from "../types";

interface UserContextProps {
  children: React.ReactElement
}

interface UserContextValue {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {}
})

export function UserContextProvider ({children}:UserContextProps) {
  const [user, setUser] = useState<User|null>(null)

  const defaultValue: UserContextValue = {
    user,
    setUser
  }

  return <UserContext.Provider value={defaultValue}>
    {children}
  </UserContext.Provider>
}