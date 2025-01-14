import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../hooks/useUser";
import Spinner from "./Spinner";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { data: user, isPending } = useUser();

  useEffect(() => {
    if (!user && !isPending) {
      navigate("/login");
    }
  }, [user, isPending, navigate]);

  if (isPending) return <Spinner />;
  if (user) return children;
}

export default ProtectedRoute;
