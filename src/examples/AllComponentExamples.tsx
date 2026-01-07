// Simplified component showcase - Select and DragDrop examples only

// Form Components

// DragDrop Components
import DragDropAllExamples from "./DragDropAllExamples";
import VideoPlayerExample from "./VideoPlayerExample";
import { CalendarExample } from "./CalendarExample";
import DropdownExample from "./DropdownExample";
import SelectExample from "./SelectExample";
import { RatingExample } from "./RatingExample";
import CheckboxExample from "./CheckboxExample";
import CheckboxGroupExample from "./CheckboxGroupExample";

export const AllComponentExamples = () => {
  return (
    <div className="space-y-8">
      {/* Select Component */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">
          Dropdown Component
        </h2>
        <CheckboxGroupExample />
      </div>

      {/* DragDrop Component */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">
          Drag & Drop Component
        </h2>
        <CheckboxExample />
      </div>

      {/* Video Player Component */}
      {/* <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Video Player</h2>
        <VideoPlayerExample />
      </div> */}

      {/* Calendar Component */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Rating</h2>
        <RatingExample />
      </div>
    </div>
  );
};

export default AllComponentExamples;
