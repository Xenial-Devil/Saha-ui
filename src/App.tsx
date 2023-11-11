import "./App.css";
import Alert from "./assets/components/Alert/Alert";

function App() {
  return (
    <>
      <Alert
        status={"success"}
        variant={"outline"}
        message={"this is success alert go to https://github.com/"}
        title={"Success"}
        closeable={true}
      />
    </>
  );
}

export default App;
