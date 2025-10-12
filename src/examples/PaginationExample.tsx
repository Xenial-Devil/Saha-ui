import React, { useState } from "react";
import { Pagination } from "../components/Pagination";
import { Card } from "../components/Card";

export const PaginationExample: React.FC = () => {
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(5);
  const [currentPage3, setCurrentPage3] = useState(25);
  const [currentPage4, setCurrentPage4] = useState(1);

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Pagination Component</h2>
        <p className="text-base-content/70 mb-8">
          A comprehensive pagination component with multiple variants, sizes,
          and customization options.
        </p>
      </div>

      {/* Variants */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Variants</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-3">Default</p>
            <Pagination totalPages={10} currentPage={1} />
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Primary</p>
            <Pagination variant="primary" totalPages={10} currentPage={3} />
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Secondary</p>
            <Pagination variant="secondary" totalPages={10} currentPage={5} />
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Outlined</p>
            <Pagination variant="outlined" totalPages={10} currentPage={7} />
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Minimal</p>
            <Pagination variant="minimal" totalPages={10} currentPage={2} />
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Sizes</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-3">Small</p>
            <Pagination size="sm" totalPages={10} currentPage={3} />
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Medium (Default)</p>
            <Pagination size="md" totalPages={10} currentPage={5} />
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Large</p>
            <Pagination size="lg" totalPages={10} currentPage={7} />
          </div>
        </div>
      </section>

      {/* Shapes */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Shapes</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-3">Rounded (Default)</p>
            <Pagination shape="rounded" totalPages={10} currentPage={3} />
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Square</p>
            <Pagination shape="square" totalPages={10} currentPage={5} />
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Pill</p>
            <Pagination shape="pill" totalPages={10} currentPage={7} />
          </div>
        </div>
      </section>

      {/* Interactive Example */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Interactive Pagination</h3>
        <Card className="p-6">
          <div className="mb-6">
            <p className="text-sm text-base-content/70 mb-2">
              Current Page:{" "}
              <span className="font-bold text-primary">{currentPage1}</span> of
              20
            </p>
            <Pagination
              variant="primary"
              totalPages={20}
              currentPage={currentPage1}
              onPageChange={setCurrentPage1}
            />
          </div>
        </Card>
      </section>

      {/* Large Page Count with Ellipsis */}
      <section>
        <h3 className="text-xl font-semibold mb-4">
          Large Page Count (Ellipsis)
        </h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-3">
              50 Pages - Current: {currentPage2}
            </p>
            <Pagination
              variant="primary"
              totalPages={50}
              currentPage={currentPage2}
              onPageChange={setCurrentPage2}
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-3">
              100 Pages - Current: {currentPage3}
            </p>
            <Pagination
              variant="secondary"
              totalPages={100}
              currentPage={currentPage3}
              onPageChange={setCurrentPage3}
              siblingCount={2}
            />
          </div>
        </div>
      </section>

      {/* Custom Labels */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Custom Labels</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-3">Text Labels</p>
            <Pagination
              totalPages={10}
              currentPage={5}
              previousLabel="← Prev"
              nextLabel="Next →"
              firstLabel="First"
              lastLabel="Last"
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Without First/Last</p>
            <Pagination
              variant="primary"
              totalPages={10}
              currentPage={5}
              showFirstLast={false}
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Only Page Numbers</p>
            <Pagination
              variant="outlined"
              totalPages={10}
              currentPage={5}
              showFirstLast={false}
              showPrevNext={false}
            />
          </div>
        </div>
      </section>

      {/* Disabled State */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Disabled State</h3>
        <Pagination
          variant="primary"
          totalPages={10}
          currentPage={5}
          disabled
        />
      </section>

      {/* Real-world Example */}
      <section>
        <h3 className="text-xl font-semibold mb-4">
          Real-world Example - Data Table
        </h3>
        <Card className="p-6">
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">User List</h4>
            <p className="text-sm text-base-content/70 mb-4">
              Showing {(currentPage4 - 1) * 10 + 1} -{" "}
              {Math.min(currentPage4 * 10, 100)} of 100 users
            </p>

            {/* Mock Data Table */}
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-left">
                <thead className="border-b border-base-300">
                  <tr>
                    <th className="pb-3 font-semibold">ID</th>
                    <th className="pb-3 font-semibold">Name</th>
                    <th className="pb-3 font-semibold">Email</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-200">
                  {Array.from({ length: 10 }, (_, i) => {
                    const id = (currentPage4 - 1) * 10 + i + 1;
                    return (
                      <tr key={id} className="hover:bg-base-200/50">
                        <td className="py-3">#{id}</td>
                        <td className="py-3">User {id}</td>
                        <td className="py-3">user{id}@example.com</td>
                        <td className="py-3">
                          <span className="px-2 py-1 text-xs rounded-full bg-success/10 text-success">
                            Active
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-base-content/70">
                Page {currentPage4} of 10
              </div>
              <Pagination
                variant="primary"
                size="sm"
                totalPages={10}
                currentPage={currentPage4}
                onPageChange={setCurrentPage4}
              />
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default PaginationExample;
