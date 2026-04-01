import { TimePickerExample } from "./TimePickerExample";
import { TypewriterTextExample } from "./TypewriterTextExample";

export const AllComponentExamples = () => {
  return (
    <div className="space-y-8">
      {/* TimePicker Component */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">
          TimePicker Component
        </h2>
        <TimePickerExample />
      </div>

      {/* TypewriterText Component */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-text">
          TypewriterText Component
        </h2>
        <TypewriterTextExample />
      </div>
    </div>
  );
};

export default AllComponentExamples;
