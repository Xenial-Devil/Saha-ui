import { useState } from "react";
import { CodeEditor } from "../components/CodeEditor";

// Example React JSX code with custom components
const reactExample = `import React, { useState, useEffect } from 'react';

function UserDashboard() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  return (
    <>
      <MyHeader title="Dashboard" />
      <UserList users={users} />
      <CustomButton onClick={handleRefresh}>
        Refresh
      </CustomButton>
    </>
  );
}`;

// Example Vue code with custom components
const vueExample = `<template>
  <div>
    <MyHeader :title="pageTitle" />
    <user-profile v-if="isLoggedIn" />
    <custom-button @click="handleClick">
      {{ buttonText }}
    </custom-button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const pageTitle = ref('Dashboard');
const isLoggedIn = computed(() => user.value !== null);
</script>`;

// Example Django template with custom components
const djangoExample = `{% extends "base.html" %}

{% block content %}
  <div>
    {% if user.is_authenticated %}
      <UserProfile user="{{ user }}" />
      <custom-widget data="{{ user.data|safe }}" />
      {{ user.name|title }}
    {% endif %}
  </div>
{% endblock %}`;

// Example Laravel Blade with custom components
const bladeExample = `@extends('layouts.app')

@section('content')
  <div>
    @if($user->isAdmin())
      <x-admin-panel />
      <UserDashboard :user="$user" />
    @endif
    
    @foreach($posts as $post)
      <x-post-card :post="$post">
        <x-slot name="title">
          {{ $post->title }}
        </x-slot>
      </x-post-card>
    @endforeach
  </div>
@endsection`;

export function CodeEditorFrameworkExamples() {
  const [activeTab, setActiveTab] = useState<
    "react" | "vue" | "django" | "blade"
  >("react");

  const examples = {
    react: { code: reactExample, language: "jsx" as const, label: "React JSX" },
    vue: { code: vueExample, language: "vue" as const, label: "Vue" },
    django: {
      code: djangoExample,
      language: "django" as const,
      label: "Django",
    },
    blade: {
      code: bladeExample,
      language: "blade" as const,
      label: "Laravel Blade",
    },
  };

  const current = examples[activeTab];

  return (
    <div className="space-y-4 p-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">CodeEditor Framework Support</h2>
        <p className="text-slate-600">
          Custom components are automatically highlighted with distinct colors
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-slate-200">
        {Object.entries(examples).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === key
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* CodeEditor Display */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{current.label} Example</h3>
          <span className="text-sm text-slate-500">
            Language:{" "}
            <code className="bg-slate-100 px-2 py-1 rounded">
              {current.language}
            </code>
          </span>
        </div>

        <CodeEditor
          language={current.language}
          theme="dark"
          defaultValue={current.code}
          minHeight="400px"
          maxHeight="600px"
          readOnly
        />

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">
            Highlighted Elements:
          </h4>
          <ul className="space-y-1 text-sm text-blue-800">
            {activeTab === "react" && (
              <>
                <li>
                  •{" "}
                  <span className="text-fuchsia-600 font-semibold">
                    useState, useEffect
                  </span>{" "}
                  - React Hooks (Fuchsia)
                </li>
                <li>
                  •{" "}
                  <span className="text-cyan-600 font-semibold">
                    MyHeader, UserList, CustomButton
                  </span>{" "}
                  - Custom Components (Cyan)
                </li>
                <li>
                  •{" "}
                  <span className="text-amber-600">title, onClick, users</span>{" "}
                  - Props (Amber)
                </li>
                <li>
                  • <span className="text-blue-600">Fragment &lt;&gt;</span> -
                  React Fragment (Cyan)
                </li>
              </>
            )}
            {activeTab === "vue" && (
              <>
                <li>
                  •{" "}
                  <span className="text-emerald-600 font-semibold">
                    v-if, @click
                  </span>{" "}
                  - Vue Directives (Emerald)
                </li>
                <li>
                  •{" "}
                  <span className="text-fuchsia-600 font-semibold">
                    ref, computed
                  </span>{" "}
                  - Composition API (Fuchsia)
                </li>
                <li>
                  •{" "}
                  <span className="text-cyan-600 font-semibold">MyHeader</span>{" "}
                  - Custom Component PascalCase (Cyan)
                </li>
                <li>
                  •{" "}
                  <span className="text-teal-600 font-semibold">
                    user-profile, custom-button
                  </span>{" "}
                  - Custom Component kebab-case (Teal)
                </li>
                <li>
                  •{" "}
                  <span className="text-yellow-600">{"{{ buttonText }}"}</span>{" "}
                  - Mustache Syntax (Yellow)
                </li>
              </>
            )}
            {activeTab === "django" && (
              <>
                <li>
                  •{" "}
                  <span className="text-fuchsia-600 font-semibold">
                    {"{% extends %}, {% if %}"}
                  </span>{" "}
                  - Template Tags (Fuchsia)
                </li>
                <li>
                  • <span className="text-yellow-600">{"{{ user }}"}</span> -
                  Template Variables (Yellow)
                </li>
                <li>
                  • <span className="text-cyan-600">|safe, |title</span> -
                  Template Filters (Cyan)
                </li>
                <li>
                  •{" "}
                  <span className="text-teal-600 font-semibold">
                    UserProfile, custom-widget
                  </span>{" "}
                  - Custom Components (Teal)
                </li>
              </>
            )}
            {activeTab === "blade" && (
              <>
                <li>
                  •{" "}
                  <span className="text-fuchsia-600 font-semibold">
                    @extends, @if, @foreach
                  </span>{" "}
                  - Blade Directives (Fuchsia)
                </li>
                <li>
                  •{" "}
                  <span className="text-cyan-600 font-semibold">
                    x-admin-panel, x-post-card
                  </span>{" "}
                  - Blade Components (Cyan)
                </li>
                <li>
                  •{" "}
                  <span className="text-teal-600 font-semibold">
                    UserDashboard
                  </span>{" "}
                  - Custom Component (Teal)
                </li>
                <li>
                  •{" "}
                  <span className="text-yellow-600">
                    {"{{ $post->title }}"}
                  </span>{" "}
                  - Blade Echo (Yellow)
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CodeEditorFrameworkExamples;
