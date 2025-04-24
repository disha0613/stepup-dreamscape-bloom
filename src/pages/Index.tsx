
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redirect from index to dashboard
const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
};

export default Index;
