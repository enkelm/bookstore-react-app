import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ email: "", password: "", token: "" });
  const [booksCtx, setBooksCtx] = useState([]);
  const [bookId, setBookId] = useState(0);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, booksCtx, setBooksCtx, bookId, setBookId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
