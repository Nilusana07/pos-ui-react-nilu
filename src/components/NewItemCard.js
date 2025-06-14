import { BookmarkPlus } from "lucide-react";
// --- Start: New Item Card Component ---
// This new component displays an item in a card format.
// You can place this directly in App.js or in a separate file like src/components/NewItemCard.js
function NewItemCard () {
const NewItemCard = ({ item }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h3>
      {item.description && <p className="text-gray-600 text-sm mb-3">{item.description}</p>}
      <div className="flex justify-between items-center">
        <span className="text-orange-600 font-bold text-lg">${item.price.toFixed(2)}</span>
        <button className="text-gray-500 hover:text-orange-500 transition-colors duration-200 p-1 rounded-full" aria-label="Add to cart">
          <BookmarkPlus size={20} />
        </button>
      </div>
    </div>
  );
};
}
export default NewItemCard;