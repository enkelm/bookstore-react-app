import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ email: "", password: "", token: "" });
  const [booksCtx, setBooksCtx] = useState([]);
  const [bookId, setBookId] = useState(0);
  const [cartCxt, setCartCxt] = useState({
    count: 0,
  });

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        booksCtx,
        setBooksCtx,
        bookId,
        setBookId,
        cartCxt,
        setCartCxt,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
