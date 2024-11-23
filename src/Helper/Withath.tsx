import React, { useEffect, ComponentType } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface RootState {
  auth: {
    isAuthenticated: boolean;
  };
}

type WithAuthProps = Record<string, unknown>;

const WithAuth = <P extends WithAuthProps>(
  WrappedComponent: ComponentType<P>
) => {
  const AuthComponent: React.FC<P> = (props) => {
    const isAuthenticated = useSelector(
      (state: RootState) => state.auth.isAuthenticated
    );
    const navigate = useNavigate();

    useEffect(() => {
      console.log("isAuthenticated:", isAuthenticated);

      if (!isAuthenticated) {
        Swal.fire({
          icon: "warning",
          title: "Unauthorized",
          text: "You have to login first to access this page.",
        }).then(() => {
          console.log("Navigating to login");
          navigate("/login");
        });
      }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default WithAuth;
