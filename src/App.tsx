import "./App.css";
import List from "./assets/components/List";
const unorderedItems = ["Item 1", "Item 2", "Item 3", "Item 4"];
const orderedItems = ["First", "Second", "Third", "Fourth"];
const customItems = ["Custom 1", "Custom 2", "Custom 3", "Custom 4"];
const circleItems = ["Circle 1", "Circle 2", "Circle 3", "Circle 4"];
const squareItems = ["Square 1", "Square 2", "Square 3", "Square 4"];
const lowerRomanItems = ["Roman i", "Roman ii", "Roman iii", "Roman iv"];
const upperAlphaItems = ["Alpha A", "Alpha B", "Alpha C", "Alpha D"];
function App() {
  return (
    <>
      <div>
        <h1>My Lists</h1>
        <h2>Unordered List (Disc)</h2>
        <List
          items={unorderedItems}
          listType="disc"
          itemClassName="list-item"
        />
        <h2>Ordered List (Decimal)</h2>
        <List
          items={orderedItems}
          listType="decimal"
          itemClassName="list-item"
        />
        <h2>Custom List</h2>
        <List
          items={customItems}
          listType="none"
          itemClassName="custom-list-item"
        />
        <h2>Circle List</h2>
        <List
          items={circleItems}
          listType="circle"
          itemClassName="list-item"
        />
        <h2>Square List</h2>
        <List
          items={squareItems}
          listType="square"
          itemClassName="list-item"
        />
        <h2>Lower Roman List</h2>
        <List
          items={lowerRomanItems}
          listType="lower-roman"
          itemClassName="list-item"
        />
        <h2>Upper Alpha List</h2>
        <List
          items={upperAlphaItems}
          listType="upper-alpha"
          itemClassName="list-item"
        />
      </div>
    </>
  );
}

export default App;
