import '/src/App.css';

function clickMe() {
  localStorage.setItem('value', 'Project opgeslagen!')
      console.log(localStorage.getItem("value"))
  }

export default function SaveButton() {
  return (
    <div>
      <button className="savebutton" onClick={clickMe}>
        Opslaan
      </button>
    </div>
  );
}
