import { Kbd, KbdGroup, KbdKey, KbdDescription } from "../components/Kbd";
import { KEYBOARD_SYMBOLS } from "../components/Kbd/Kbd.types";

export default function KbdExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-4 shadow-lg shadow-blue-500/20">
            <span className="text-4xl font-mono">⌘</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            Kbd Component
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Beautiful keyboard key display with support for special characters,
            key combinations, and semantic variants
          </p>
        </div>

        {/* Basic Keys */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Basic Keys
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-4">
              <Kbd>A</Kbd>
              <Kbd>Enter</Kbd>
              <Kbd>Escape</Kbd>
              <Kbd>Space</Kbd>
              <Kbd>Tab</Kbd>
              <Kbd>Delete</Kbd>
              <Kbd>←</Kbd>
              <Kbd>→</Kbd>
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
            </div>
          </div>
        </section>

        {/* Special Characters */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Special Characters
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Command
                </div>
                <Kbd size="lg">{KEYBOARD_SYMBOLS.command}</Kbd>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Shift
                </div>
                <Kbd size="lg">{KEYBOARD_SYMBOLS.shift}</Kbd>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Option
                </div>
                <Kbd size="lg">{KEYBOARD_SYMBOLS.option}</Kbd>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Control
                </div>
                <Kbd size="lg">{KEYBOARD_SYMBOLS.control}</Kbd>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Enter
                </div>
                <Kbd size="lg">{KEYBOARD_SYMBOLS.enter}</Kbd>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Delete
                </div>
                <Kbd size="lg">{KEYBOARD_SYMBOLS.delete}</Kbd>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Escape
                </div>
                <Kbd size="lg">{KEYBOARD_SYMBOLS.escape}</Kbd>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Tab
                </div>
                <Kbd size="lg">{KEYBOARD_SYMBOLS.tab}</Kbd>
              </div>
            </div>
          </div>
        </section>

        {/* Key Combinations */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Key Combinations
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300">
                  Command Palette
                </span>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </KbdGroup>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300">
                  Save File
                </span>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>S</Kbd>
                </KbdGroup>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300">Copy</span>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>C</Kbd>
                </KbdGroup>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300">
                  Select All
                </span>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>A</Kbd>
                </KbdGroup>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300">
                  Multi-Modifier
                </span>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>⇧</Kbd>
                  <Kbd>⌥</Kbd>
                  <Kbd>P</Kbd>
                </KbdGroup>
              </div>
            </div>
          </div>
        </section>

        {/* Variants */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Variants
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
                Default
              </h3>
              <KbdGroup variant="default">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
                Bordered
              </h3>
              <KbdGroup variant="bordered">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
                Solid
              </h3>
              <KbdGroup variant="solid">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
                Flat
              </h3>
              <KbdGroup variant="flat">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
                Ghost
              </h3>
              <KbdGroup variant="ghost">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
          </div>
        </section>

        {/* Color Variants */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-rose-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Color Variants
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
                Primary
              </h3>
              <KbdGroup variant="primary">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
                Secondary
              </h3>
              <KbdGroup variant="secondary">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
                Accent
              </h3>
              <KbdGroup variant="accent">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
                Success
              </h3>
              <KbdGroup variant="success">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
                Warning
              </h3>
              <KbdGroup variant="warning">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
                Error
              </h3>
              <KbdGroup variant="error">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
                Info
              </h3>
              <KbdGroup variant="info">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Sizes
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-6">
              <div className="space-y-2">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Small
                </div>
                <KbdGroup size="sm">
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </KbdGroup>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Medium
                </div>
                <KbdGroup size="md">
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </KbdGroup>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Large
                </div>
                <KbdGroup size="lg">
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </KbdGroup>
              </div>
            </div>
          </div>
        </section>

        {/* Different Separators */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-orange-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Custom Separators
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <span className="text-gray-700 dark:text-gray-300">Plus (+)</span>
              <KbdGroup separator="+">
                <Kbd>Ctrl</Kbd>
                <Kbd>Alt</Kbd>
                <Kbd>Delete</Kbd>
              </KbdGroup>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <span className="text-gray-700 dark:text-gray-300">
                Then (then)
              </span>
              <KbdGroup separator="then">
                <Kbd>G</Kbd>
                <Kbd>G</Kbd>
              </KbdGroup>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <span className="text-gray-700 dark:text-gray-300">
                Slash (/)
              </span>
              <KbdGroup separator="/">
                <Kbd>?</Kbd>
              </KbdGroup>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <span className="text-gray-700 dark:text-gray-300">
                Arrow (→)
              </span>
              <KbdGroup separator="→">
                <Kbd>File</Kbd>
                <Kbd>Save</Kbd>
              </KbdGroup>
            </div>
          </div>
        </section>

        {/* Composition API */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Composition API
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-6">
              <Kbd variant="solid" size="lg">
                <KbdKey>⌘</KbdKey>
                <KbdDescription>Command</KbdDescription>
              </Kbd>
              <Kbd variant="primary" size="lg">
                <KbdKey>⇧</KbdKey>
                <KbdDescription>Shift</KbdDescription>
              </Kbd>
              <Kbd variant="secondary" size="lg">
                <KbdKey>⌥</KbdKey>
                <KbdDescription>Option</KbdDescription>
              </Kbd>
              <Kbd variant="success" size="lg">
                <KbdKey>⌃</KbdKey>
                <KbdDescription>Control</KbdDescription>
              </Kbd>
            </div>
          </div>
        </section>

        {/* States */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-rose-500 to-pink-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              States
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-6">
              <div className="space-y-2">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Normal
                </div>
                <Kbd variant="solid">⌘</Kbd>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Pressed
                </div>
                <Kbd variant="solid" pressed>
                  ⌘
                </Kbd>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Disabled
                </div>
                <Kbd variant="solid" disabled>
                  ⌘
                </Kbd>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Examples */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Real-World Examples
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    Quick Command
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Open command palette
                  </div>
                </div>
                <KbdGroup variant="primary">
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </KbdGroup>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    Vim Navigation
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Go to first line
                  </div>
                </div>
                <KbdGroup variant="success" separator="then">
                  <Kbd>G</Kbd>
                  <Kbd>G</Kbd>
                </KbdGroup>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    Force Quit
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    macOS force quit dialog
                  </div>
                </div>
                <KbdGroup variant="error">
                  <Kbd>⌘</Kbd>
                  <Kbd>⌥</Kbd>
                  <Kbd>⎋</Kbd>
                </KbdGroup>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
