import React, { useState, useEffect } from "react";
import Progress from "../components/Progress";

const ProgressExample: React.FC = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Simulate file upload
  useEffect(() => {
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Simulate file download
  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-12 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          Progress Component
        </h2>
        <p className="text-muted-foreground mb-8">
          Display progress indicators with various styles, sizes, and
          animations.
        </p>
      </div>

      {/* Basic Progress */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          Basic Progress
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Default (0%)</p>
            <Progress value={0} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">25% Complete</p>
            <Progress value={25} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">50% Complete</p>
            <Progress value={50} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">75% Complete</p>
            <Progress value={75} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Complete (100%)
            </p>
            <Progress value={100} />
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Sizes</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Extra Small (xs)
            </p>
            <Progress value={60} size="xs" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Small (sm)</p>
            <Progress value={60} size="sm" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Medium (md)</p>
            <Progress value={60} size="md" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Large (lg)</p>
            <Progress value={60} size="lg" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Extra Large (xl)
            </p>
            <Progress value={60} size="xl" />
          </div>
        </div>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Variants</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Default</p>
            <Progress value={65} variant="default" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Primary</p>
            <Progress value={65} variant="primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Secondary</p>
            <Progress value={65} variant="secondary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Accent</p>
            <Progress value={65} variant="accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Success</p>
            <Progress value={65} variant="success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Warning</p>
            <Progress value={65} variant="warning" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Error</p>
            <Progress value={65} variant="error" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Info</p>
            <Progress value={65} variant="info" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Gradient</p>
            <Progress value={65} variant="gradient" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Striped</p>
            <Progress value={65} variant="striped" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Glass</p>
            <Progress value={65} variant="glass" />
          </div>
        </div>
      </section>

      {/* Shapes */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Shapes</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Rounded (default)
            </p>
            <Progress value={70} variant="primary" shape="rounded" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Pill</p>
            <Progress value={70} variant="primary" shape="pill" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Square</p>
            <Progress value={70} variant="primary" shape="square" />
          </div>
        </div>
      </section>

      {/* With Labels */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">With Labels</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Inside Label</p>
            <Progress value={55} variant="primary" size="lg" showValue />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Outside Label</p>
            <Progress
              value={55}
              variant="success"
              size="lg"
              showValue
              labelPosition="outside"
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Top Label</p>
            <Progress
              value={55}
              variant="gradient"
              size="md"
              showValue
              labelPosition="top"
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Custom Label</p>
            <Progress
              value={33}
              variant="primary"
              size="lg"
              label="1 of 3 tasks completed"
              showValue
              labelPosition="top"
            />
          </div>
        </div>
      </section>

      {/* Striped Patterns */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          Striped Patterns
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Static Stripes</p>
            <Progress value={75} variant="primary" size="lg" striped />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Animated Stripes
            </p>
            <Progress
              value={75}
              variant="success"
              size="lg"
              striped
              stripedAnimated
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Gradient with Animated Stripes
            </p>
            <Progress
              value={75}
              variant="gradient"
              size="lg"
              striped
              stripedAnimated
            />
          </div>
        </div>
      </section>

      {/* Glow Effect */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Glow Effect</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Primary with Glow
            </p>
            <Progress value={80} variant="primary" size="lg" glow />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Success with Glow
            </p>
            <Progress value={80} variant="success" size="lg" glow />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Gradient with Glow
            </p>
            <Progress value={80} variant="gradient" size="lg" glow />
          </div>
        </div>
      </section>

      {/* Indeterminate (Loading) */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          Indeterminate Loading
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Primary Loading
            </p>
            <Progress indeterminate variant="primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Gradient Loading
            </p>
            <Progress indeterminate variant="gradient" size="lg" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Success Loading with Stripes
            </p>
            <Progress indeterminate variant="success" striped stripedAnimated />
          </div>
        </div>
      </section>

      {/* Custom Colors */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Custom Colors</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Custom Purple</p>
            <Progress value={60} color="#9333ea" size="lg" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Custom Orange</p>
            <Progress value={60} color="#f97316" size="lg" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Custom Track Color
            </p>
            <Progress
              value={60}
              color="#10b981"
              trackColor="#dcfce7"
              size="lg"
            />
          </div>
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          Real-world Examples
        </h3>
        <div className="space-y-6">
          {/* File Upload */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">
                Uploading document.pdf
              </h4>
              <span className="text-sm text-muted-foreground">
                {uploadProgress}%
              </span>
            </div>
            <Progress
              value={uploadProgress}
              variant="primary"
              size="lg"
              striped
              stripedAnimated
            />
            <p className="text-xs text-muted-foreground mt-2">
              {uploadProgress < 100
                ? `${(uploadProgress * 2.5).toFixed(1)} MB / 250 MB`
                : "Upload complete!"}
            </p>
          </div>

          {/* File Download */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">
                Downloading video.mp4
              </h4>
              <span className="text-sm text-muted-foreground">
                {downloadProgress}%
              </span>
            </div>
            <Progress
              value={downloadProgress}
              variant="success"
              size="lg"
              glow
            />
            <p className="text-xs text-muted-foreground mt-2">
              {downloadProgress < 100
                ? `${(downloadProgress * 15).toFixed(0)} MB / 1500 MB`
                : "Download complete!"}
            </p>
          </div>

          {/* Skill Levels */}
          <div className="p-6 rounded-xl border border-border bg-card space-y-4">
            <h4 className="font-semibold text-foreground mb-4">Skill Levels</h4>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-foreground">
                  React
                </span>
                <span className="text-sm text-muted-foreground">90%</span>
              </div>
              <Progress value={90} variant="primary" size="md" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-foreground">
                  TypeScript
                </span>
                <span className="text-sm text-muted-foreground">85%</span>
              </div>
              <Progress value={85} variant="secondary" size="md" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-foreground">CSS</span>
                <span className="text-sm text-muted-foreground">95%</span>
              </div>
              <Progress value={95} variant="success" size="md" />
            </div>
          </div>

          {/* System Resources */}
          <div className="p-6 rounded-xl border border-border bg-card space-y-4">
            <h4 className="font-semibold text-foreground mb-4">
              System Resources
            </h4>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-foreground">
                  CPU Usage
                </span>
                <span className="text-sm text-muted-foreground">42%</span>
              </div>
              <Progress value={42} variant="primary" size="sm" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-foreground">
                  Memory
                </span>
                <span className="text-sm text-muted-foreground">68%</span>
              </div>
              <Progress value={68} variant="warning" size="sm" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-foreground">
                  Disk Space
                </span>
                <span className="text-sm text-muted-foreground">89%</span>
              </div>
              <Progress value={89} variant="error" size="sm" glow />
            </div>
          </div>

          {/* Project Progress */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-4">
              Project Progress
            </h4>
            <div className="space-y-3">
              <Progress
                value={100}
                variant="success"
                size="lg"
                label="Design Phase - Complete"
                showValue
                labelPosition="top"
              />
              <Progress
                value={75}
                variant="primary"
                size="lg"
                label="Development - In Progress"
                showValue
                labelPosition="top"
                striped
                stripedAnimated
              />
              <Progress
                value={30}
                variant="warning"
                size="lg"
                label="Testing - Started"
                showValue
                labelPosition="top"
              />
              <Progress
                value={0}
                variant="default"
                size="lg"
                label="Deployment - Not Started"
                showValue
                labelPosition="top"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgressExample;
