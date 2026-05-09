function clickMe() {
  localStorage.setItem('value', 'Project opgeslagen!')
      console.log(localStorage.getItem("value"))
  }

export default function SaveButton() {
  return (
    <div>
      <button onClick={clickMe}>
        Opslaan
      </button>
    </div>
  );
}
