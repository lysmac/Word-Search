export default function Searchbar() {
  return (
    <form>
      <input
        className="border-2 border-emerald-950 rounded-md p-2 w-96"
        onChange={(e) => console.log(e.target.value)}
        placeholder={"Search for something"}
      />
    </form>
  );
}
