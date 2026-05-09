function clickMe() {
  return('Project opgeslagen!');
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
