// Simplified component showcase - Select and DragDrop examples only

// Form Components
import { SelectExample } from "./SelectExample";

// DragDrop Components
import DragDropAllExamples from "./DragDropAllExamples";
import VideoPlayerExample from "./VideoPlayerExample";

export const AllComponentExamples = () => {
  return (
    <div className="space-y-8">
      {/* Select Component */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Select Component</h2>
        <SelectExample />
      </div>

      {/* DragDrop Component */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">
          Drag & Drop Component
        </h2>
        <DragDropAllExamples />
      </div>

      {/* Video Player Component */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">Video Player</h2>
        <VideoPlayerExample />
      </div>
    </div>
  );
};

export default AllComponentExamples;
