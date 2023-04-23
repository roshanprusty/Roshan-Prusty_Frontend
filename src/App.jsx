import List from "./Component/List";

function App(){
  const names =[{text:"India"}, {text:"USA"}, {text:"Russia"}];
  return(<>
    <List items={names}/>
  </>)
}
export default App;