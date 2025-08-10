import { privacies } from "./topics"

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md mb-16">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Privacy Policy</h1>
      
      <div className="space-y-6">
        {privacies.map((topic,idx) => (
          <section key={idx} className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">{topic.title}</h2>
            <p className="text-gray-700 leading-relaxed">
              {topic.description}
              {topic.email && (
                <a href={`mailto:${topic.email}`} className="underline text-blue-600 ml-1">
                  {topic.email}
                </a>
              )}
            </p>
            </section>       
          ))}
      </div> 
    </div>
  )
}

export default PrivacyPolicyPage
