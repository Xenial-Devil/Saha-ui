import "./App.css";
import Accordion from "./assets/components/Accordion";
import Alert from "./assets/components/Alert";
const items = [
  {
    title: "Title 1",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi ipsa dolor tempore eum, at excepturi! Nam itaque nostrum blanditiis, tempore obcaecati officiis molestias incidunt possimus omnis esse deserunt, officia consequatur?",
  },
  {
    title: "Title 2",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci illo deleniti recusandae doloribus enim, laboriosam quae eos iure iste asperiores cum neque vel. Laudantium laboriosam aliquam rem nam! Eligendi, ea.",
  },
  {
    title: "Title 3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur libero illo corporis aliquid iusto, voluptas earum perspiciatis corrupti hic nobis. Nam neque numquam, eligendi commodi placeat itaque sed ullam culpa!",
  },
];
function App() {
  return (
    <>
      {/* <Alert
        status={"danger"}
        variant={"subtle"}
        message={"this is success alert go to https://github.com/"}
        title={"Success"}
        closeable={true}
      /> */}
      <Accordion variant={"firstopen"} items={items} />
    </>
  );
}

export default App;
