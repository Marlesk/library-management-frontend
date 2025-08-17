import { useState } from "react";
import InputForm from "./InputForm";
import SearchForm from "./search/SearchForm";


const  AddBookPage = () => {
  const [activeTab, setActiveTab] = useState<"manual" | "google">("manual");

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-admin text-center">Add Book</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-500 mb-4">
        <button
          onClick={() => setActiveTab("manual")}
          className={`px-4 py-2 font-medium cursor-pointer ${
            activeTab === "manual"
              ? "border-b-2 border-cyan-600 text-cyan-600"
              : "text-gray-300 hover:text-gray-600"
          }`}
        >
          Manual Input
        </button>
        <button
          onClick={() => setActiveTab("google")}
          className={`px-4 py-2 font-medium cursor-pointer ${
            activeTab === "google"
              ? "border-b-2 border-cyan-600 text-cyan-600"
              : "text-gray-300 hover:text-gray-600"
          }`}
        >
          Google Books Search
        </button> 
      </div>

      {/* Manual Form */}
      {activeTab === "manual" && (
        <InputForm/>
      )}

      {/* Google Books Tab */}
      {activeTab === "google" && (
        <SearchForm/>
      )}
    </div>
  )
}

export default AddBookPage
