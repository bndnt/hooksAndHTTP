export default function SearchForm({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const topic = form.elements.topic.value;
    if (form.elements.topic.value.trim() == "") {
      alert("Plese enter search term!");
      return;
    }
    onSearch(topic);
    form.reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="topic" placeholder="Search articles..." />
        <button>Search</button>
      </form>
    </div>
  );
}
