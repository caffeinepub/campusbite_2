import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface CampusUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Student" | "Faculty";
  collegeId: string;
  password: string;
}

interface AuthContextType {
  currentUser: CampusUser | null;
  login: (
    email: string,
    password: string,
  ) => { success: boolean; error?: string };
  signup: (userData: Omit<CampusUser, "id">) => {
    success: boolean;
    error?: string;
  };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = "campusbite-users";
const CURRENT_USER_KEY = "campusbite-current-user";

function getUsers(): CampusUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: CampusUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CampusUser | null>(() => {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [currentUser]);

  const login = (email: string, password: string) => {
    const users = getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (!user)
      return { success: false, error: "No account found with this email." };
    if (user.password !== password)
      return { success: false, error: "Incorrect password." };
    setCurrentUser(user);
    return { success: true };
  };

  const signup = (userData: Omit<CampusUser, "id">) => {
    const users = getUsers();
    const exists = users.some(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase(),
    );
    if (exists)
      return {
        success: false,
        error: "An account with this email already exists.",
      };
    const newUser: CampusUser = { ...userData, id: crypto.randomUUID() };
    saveUsers([...users, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
