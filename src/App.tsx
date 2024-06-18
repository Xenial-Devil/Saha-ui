import "./App.css";
import Accordion from "./assets/components/Accordion";
import Alert from "./assets/components/Alert";
import Avatar from "./assets/components/Avatar";
import AvatarGroup from "./assets/components/AvatarGroup";
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

const avatars = [
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&usqp=CAU",
    alt: "Avatar 1",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&usqp=CAU",
    alt: "Avatar 2",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&usqp=CAU",
    alt: "Avatar 3",
  },
  // Add more avatars as needed
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
      <Accordion variant={"firstopen"} items={items} />
      /> 
      <Avatar
        src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
        alt="Avatar"
        size={100}
        shape={"rounded"}
      />
      */}
      <AvatarGroup avatars={avatars} max={3} size={50} overlap={0.2} gap={false} />
    </>
  );
}

export default App;
