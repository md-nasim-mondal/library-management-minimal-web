import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon, HomeIcon, ArrowLeftIcon } from "@radix-ui/react-icons";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage = "An unexpected error occurred";
  let errorStatus = "";

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status.toString();
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-md w-full space-y-6 bg-card rounded-xl shadow-lg p-8 border">
        <div className="text-center space-y-2">
          <RocketIcon className="mx-auto h-12 w-12 text-destructive" />
          <h1 className="text-3xl font-bold tracking-tight">
            {errorStatus ? `Error ${errorStatus}` : "Oops!"}
          </h1>
          <p className="text-muted-foreground">
            Something went wrong while processing your request
          </p>
        </div>

        <Alert variant="destructive">
          <AlertTitle className="flex items-center gap-2">
            <span>Error Details</span>
          </AlertTitle>
          <AlertDescription className="mt-2">
            {errorMessage}
          </AlertDescription>
        </Alert>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Go Back
          </Button>
          <Button
            className="flex-1 gap-2"
            onClick={() => navigate("/", { replace: true })}
          >
            <HomeIcon className="h-4 w-4" />
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;