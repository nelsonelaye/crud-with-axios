import React, { ErrorInfo, ReactNode } from "react";

type MyProps = {
  children: ReactNode;
};
type States = {
  hasError: boolean;
};
class ErrorBoundary extends React.Component<MyProps, States> {
  constructor(props: MyProps) {
    super(props);
  }

  state: States = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): States {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    console.log("Error", error);
    console.log("Info", info);
  }
  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>;
          <p>It's not you but us, please hold on while we fix this</p>
          <button
            type="button"
            style={{
              padding: "20px",
              outline: "none",
              border: 0,
              borderRadius: "10px",
            }}
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
